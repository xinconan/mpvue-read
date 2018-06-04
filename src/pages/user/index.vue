<template>
  <div class="user-container">
    <div class="avatar-wrapper">
      <div class="avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <open-data type="userNickName"></open-data>
    </div>

    <YearProgress></YearProgress>

    <button type="primary" @click="scan">扫码添加图书</button>
  </div>
</template>

<script>
import YearProgress from '@/components/yearProgress.vue'
export default {
  components: {
    YearProgress
  },

  data () {
    // const day = new Date()
    // const year = day.getFullYear()
    // const startDay = new Date(year, 0, 1)
    // let rest = day.getTime() - startDay.getTime()
    // rest = Math.ceil(rest / (3600 * 24000))
    // let fullDay = this.isLeapYear(year) ? 366 : 365
    // let passCent = Math.toFixed(rest / fullDay * 100)
    // return {
    //   year,
    //   passDay: rest,
    //   passCent
    // }
  },
  methods: {
    scan () {
      wx.scanCode({
        scanType: ['qrCode'],
        success: (res) => {
          console.log(res)
          wx.showModal({
            showCancel: false,
            content: res.result
          })
        }
      })
    }
  },

  created () {
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
.avatar{
  width: 240rpx;
  height: 240rpx;
}

</style>
