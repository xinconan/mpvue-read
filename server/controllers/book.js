const https = require('https')
const {mysql} = require('../qcloud')

module.exports = {
  top: async (ctx) => {
    // 访问最多的9条数据
    const top = await mysql('books')
                .select('id', 'title', 'image', 'count')
                .orderBy('count', 'desc')
                .limit(9)
    ctx.state.data = {
      list: top
    }
  },
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
    const {page, openid} = ctx.request.query
    const size = 10
    const bookSql = mysql('books')
                  .select('books.*', 'cSessionInfo.user_info')
                  .join('cSessionInfo', 'books.openId', 'cSessionInfo.open_id')
                  .orderBy('books.id', 'desc')
    // console.log(books)
    let books
    if (openid) {
      // 根据openid过滤
      books = await bookSql.where('books.openId', openid)
    } else {
      books = await bookSql.limit(size).offset(Number(page) * size)
    }
    ctx.state.data = {
      // list: books
      list: books.map(v => {
        delete v.openid   // remove openid
        const info = JSON.parse(v.user_info)
        return Object.assign({}, v, {
          user_info: {
            nickName: info.nickName
          }
        })
      })
    }
  },
  detail: async (ctx) => {
    const {id} = ctx.request.query
    if (!id) {
      ctx.state = {
        code: -1,
        data: {
          msg: '缺少必要参数'
        }
      }
      return
    }
    const detail = await mysql('books')
                    .select('books.*', 'cSessionInfo.user_info')
                    .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                    .where('id', id)
                    .first()
    const info = JSON.parse(detail.user_info)
    ctx.state.data = Object.assign({}, detail, {
      tags: detail.tags.split(','),
      summary: detail.summary.split('\n'),
      user_info: {
        name: info.nickName,
        image: info.avatarUrl
      }
    })
    // 每请求一次，统计一次
    await mysql('books')
          .where('id', id)
          .increment('count', 1)
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