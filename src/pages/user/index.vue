<template>
  <div class="user-container">
    <div class="avatar-wrapper" v-if="logged">
      <div class="avatar">
        <img :src="userInfo.avatarUrl" alt="">
      </div>
      <p>{{userInfo.nickName}}</p>
    </div>

    <!-- <button v-if="!logged" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">登录</button> -->
    <button v-if="!logged"  @click="login">登录</button>

    <YearProgress></YearProgress>

    <button v-if="logged" type="primary" @click="scan">扫码添加图书</button>
  </div>
</template>

<script>
import YearProgress from '@/components/yearProgress.vue'
import qcloud from 'wafer2-client-sdk'
import utils from '@/utils/index'
import config from '../../config';
export default {
  components: {
    YearProgress
  },

  data () {
    return {
      userInfo: {},
      logged: false
    }
  },
  methods: {
    // 扫码添加图书
    scan () {
      wx.scanCode({
        scanType: ['qrCode'],
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    },
    async addBook (isbn) {
      try {
        const res = await utils.post('/weapp/book/add', {
          isbn,
          openId: this.userInfo.openId
        })
        utils.showModal('添加成功', `${res.title}添加成功`)
      } catch (e) {
        console.log(e)
        // utils.showModal('添加失败', e.data.msg || '网络错误')
      }
    },
    // login () {}
    onGotUserInfo (e) {
      const mp = e.mp.detail
      console.log(mp)
      const userInfo = mp.userInfo
      // 查看是否授权
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            // 检查登录是否过期
            wx.checkSession({
              success: () => {
                // 登录态未过期
                this.userInfo = userInfo
                this.logged = true
                // that.setData({
                //   userInfo: userInfo,
                //   logged: true
                // })
              },

              fail: () => {
                qcloud.clearSession()
                // 登录态已过期，需重新登录
                const options = {
                  encryptedData: mp.encryptedData,
                  iv: mp.iv,
                  userInfo: userInfo
                }
                this.doLogin(options)
              }
            })
          } else {
            utils.showModal('用户未授权', JSON.stringify(mp.errMsg))
          }
        }
      })
    },
    doLogin (options) {
      wx.login({
        success: (loginResult) => {
          const loginParams = {
            code: loginResult.code,
            encryptedData: options.encryptedData,
            iv: options.iv
          }
          qcloud.requestLogin({
            loginParams,
            success () {
              utils.showSuccess('登录成功')
              this.userInfo = options.userInfo
              this.logged = true
            }
          })
        },
        fail: (err) => {
          utils.showModal('登录失败', JSON.stringify(err))
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
                this.logged = true
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

  created () {
    // utils.get('/user').then((res) => {
    //   console.log(res)
    // })
  },
  onShow () {
    console.log('hh')
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userInfo = userInfo
      this.logged = true
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container{
  text-align: center;
  padding: 50rpx 30rpx;

  button{
    margin-top: 30rpx;
  }
}
.avatar-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;

  text{
    font-size: 14rpx;
  }
}
.avatar img{
  width: 240rpx;
  height: 240rpx;
}

</style>
