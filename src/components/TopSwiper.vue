<template>
  <div class="swiper">
    <swiper
      :indicator-dots='true'
      indicator-color="#F15A4A"
      :autoplay='true'
      :circular='true'
      :duration='1000'
    >
      <div :key="idx" v-for="(top, idx) in imgUrls">
        <swiper-item>
          <img :src="img.image"
            v-for="img in top"
            class="slide-img"
            :key="img.id"
            mode="aspectFit"
            @click="goDetail(img)"
            alt="">
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>
<script>
export default {
  props: ['tops'],
  computed: {
    imgUrls () {
      const res = this.tops
      return [res.slice(0,3), res.slice(3,6), res.slice(6)]
    }
  },
  methods: {
    goDetail (img) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${img.id}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper{
  margin-top: 5px;
  .slide-img{
    width: 33%;
    height: 250rpx;
  }
}
</style>
