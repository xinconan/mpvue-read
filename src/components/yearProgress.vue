<template>
  <div class="year-progress">
    <progress :percent="passCent" activeColor="#F15A4A" active />
    <div class="year-text">{{year}}年已经过去{{passDay}}天，{{passCent}}%</div>
  </div>
</template>

<script>
export default {
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
  }
}
</script>

<style lang="scss" scoped>
.year-progress{
  margin-top: 20rpx;

  .year-text{
    margin-top: 10rpx;
  }
}
</style>
