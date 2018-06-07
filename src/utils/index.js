import config from '../config'

const showModal = (title, content) => {
  wx.hideToast()
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

// 显示成功提示
const showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 请求接口
const request = (url, method, data, header = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      header,
      url: config.host + url,
      success: (res) => {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

function get (url, data) {
  return request(url, 'GET', data)
}
function post (url, data) {
  return request(url, 'POST', data)
}

export default {
  showModal,
  showSuccess,
  get,
  post
}
