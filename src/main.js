import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/user/main', '^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '书知',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#333',
      selectedColor: '#F15A4A',
      list: [{
        pagePath: 'pages/index/main',
        iconPath: 'static/img/books.png',
        selectedIconPath: 'static/img/books-active.png',
        text: '图书'
      }, {
        pagePath: 'pages/comment/main',
        iconPath: 'static/img/shelf.png',
        selectedIconPath: 'static/img/shelf-active.png',
        text: '书架'
      }, {
        pagePath: 'pages/user/main',
        iconPath: 'static/img/me.png',
        selectedIconPath: 'static/img/me-active.png',
        text: '我'
      }]
    }
  }
}
