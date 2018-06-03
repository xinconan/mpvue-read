<template>
  <div class="user-container">
    <div class="avatar-wrapper">
      <div class="avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <open-data type="userNickName"></open-data>
    </div>

    <div class="year-progress">
      <div class="year-text">{{year}}年已经过去{{passDay}}天，{{passCent}}%</div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
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
  computed: {
    year () {
      return new Date().getFullYear()
    },
    passDay () {
      const day = new Date()
      const year = day.getFullYear()
      const startDay = new Date(year, 0, 1)
      let rest = day.getTime() - startDay.getTime()
      rest = Math.ceil(rest / (3600 * 24000))
      return rest
    },
    passCent () {
      let fullDay = this.isLeapYear(this.year) ? 366 : 365
      return (this.passDay / fullDay * 100).toFixed(1)
    }
  },
  methods: {
    isLeapYear (year) {
      // ①能被4整除，但不能被100整除，②能被400整除
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    }
  },

  created () {
  }
}
</script>

<style lang="scss" scoped>
.user-container{
  text-align: center;
}
.avatar-wrapper{
  padding-top: 50rpx;
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
