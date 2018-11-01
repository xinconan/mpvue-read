<template>
  <div class="comment-wrapper">
    <div v-if="userInfo.openId">
      <div class="title">我添加的图书</div>
      <Card v-for="item in books" :key="item.id" :book="item"></Card>
    </div>
    <div class="empty-wrapper" v-if="!userInfo.openId">
      <p>登录可以添加图书到书架哦</p>
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">登录</button>
      <div class="blank-h"></div>
    </div>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import utils from '@/utils/index'
import Card from '@/components/card.vue'
import config from '../../config'
export default {
  computed: {
  },
  components: {
    Card
  },
  data() {
    return {
      userInfo: {},
      books: []
    }
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getBooks () {
      const books = await utils.get('/weapp/book/list', {
        openid: this.userInfo.openId
      })
      this.books = books.list
    },
    onGotUserInfo (e) {
      const mp = e.mp.detail
      console.log(mp)
      // const userInfo = mp.userInfo
      // 查看是否授权
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            // 检查登录是否过期
            // wx.checkSession({
            //   success: () => {
            //     // 登录态未过期
            //     this.userInfo = userInfo
            //     this.logged = true
            //     // that.setData({
            //     //   userInfo: userInfo,
            //     //   logged: true
            //     // })
            //   },

            //   fail: () => {
            //     qcloud.clearSession()
            //     // 登录态已过期，需重新登录
            //     const options = {
            //       encryptedData: mp.encryptedData,
            //       iv: mp.iv,
            //       userInfo: userInfo
            //     }
            //     this.doLogin(options)
            //   }
            // })
            // const options = {
            //   encryptedData: mp.encryptedData,
            //   iv: mp.iv,
            //   userInfo: userInfo
            // }
            // this.doLogin(options)
            this.login()
            // qcloud.login({
            //   success: res => {
            //     console.log(res)
            //     this.userInfo = res
            //     this.logged = true
            //     utils.showSuccess('登录成功')
            //   },
            //   fail: err => {
            //     console.error(err)
            //   }
            // })
          } else {
            utils.showModal('用户未授权', JSON.stringify(mp.errMsg))
          }
        }
      })
    },
    // 老的获取用户信息接口
    login () {
      let user = wx.getStorageSync('userInfo')
      if (!user) {
        qcloud.login({
          success: (userInfo) => {
            console.log(userInfo)
            qcloud.request({
              url: config.userUrl,
              login: true,
              success: (res) => {
                console.log(res)
                wx.setStorageSync('userInfo', res.data.data)
                this.userInfo = userInfo
                this.init() // 登录之后请求一次
              }
            })
          },
          fail: (err) => {
            utils.showModal('登录失败', JSON.stringify(err))
          }
        })
      }
    }
  },
  onShow() {
    if (!this.userInfo.openId) {
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
        this.init()
      }
    }
  }
}
</script>

<style lang="scss">
.empty-wrapper{
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .blank-h{
    width: 100%;
    height: 50px;
  }

  button{
    width: 500rpx;
    margin-top: 30px;
  }
}
</style>
