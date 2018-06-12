const https = require('https')
const {mysql} = require('../qcloud')

module.exports = {
  add: async (ctx) => {
    console.log(ctx.request.body)
    const {isbn, openId} = ctx.request.body
    if (isbn && openId) {
      const findRes = await mysql('books').select().where('isbn', isbn)
      if (findRes.length) {
        ctx.state = {
          code: -1,
          data: {
            msg: '图书已存在'
          }
        }
        return
      }

      let dbUrl = `https://api.douban.com/v2/book/isbn/${isbn}`
      const bookInfo = await getJSON(dbUrl)
      const rate = bookInfo.rating.average
      const {title, image, alt, publisher, summary, price} = bookInfo
      const tags = bookInfo.tags.map(v => {
        return `${v.title} ${v.count}`
      }).join(',')
      const author = bookInfo.author.join(',')

      try {
        await mysql('books').insert({
          isbn,
          openid: openId,
          rate,
          title,
          image,
          publisher,
          alt,
          summary,
          price,
          author,
          tags
        })
        ctx.state.data = {
          title,
          msg: 'success'
        }
      } catch (error) {
        ctx.state = {
          code: -1,
          data: {
            msg: `新增失败:${error.sqlMessage}`
          }
        }
      }
    } else {
      ctx.state = {
        code: -1,
        data: {
          msg: '缺少必要的参数'
        }
      }
    }
  },
  list: async (ctx) => {
    // const {page} = ctx.request.query
    const size = 10
    const books = await mysql('books')
                  .select('books.*', 'cSessionInfo.user_info')
                  .join('cSessionInfo', 'books.openId', 'cSessionInfo.open_id')
                  .limit(size)
                  // .offset()
                  .orderBy('books.id', 'desc')
    console.log(books)
    ctx.state.data = {
      // list: books
      list: books.map(v => {
        const info = JSON.parse(v.user_info)
        return Object.assign({}, v, {
          user_info: {
            nickName: info.nickName
          }
        })
      })
    }
  }
}

// 获取豆瓣数据
function getJSON (url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let urlData = ''
      res.on('data', data => {
        urlData += data
      })
      res.on('end', data => {
        const bookInfo = JSON.parse(urlData)
        if (bookInfo.title) {
          resolve(bookInfo)
        }
        reject(bookInfo)
      })
    })
  })
}