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
      let res = this.tops || []
      // 最多只显示9条数据
      if (res.length > 9) {
        res = res.slice(0, 9)
      }
      return this.chunk(res, 3)
    }
  },
  methods: {
    goDetail (img) {
      wx.navigateTo({
        url: `/pages/detail/main?id=${img.id}`
      })
    },
    // lodash chunk
    chunk(array, size) {
      size = Math.max(size, 0)
      const length = array == null ? 0 : array.length
      if (!length || size < 1) {
        return []
      }
      let index = 0
      let resIndex = 0
      const result = new Array(Math.ceil(length / size))

      while (index < length) {
        result[resIndex++] = this.slice(array, index, (index += size))
      }
      return result
    },
    slice(array, start, end) {
      let length = array == null ? 0 : array.length
      if (!length) {
        return []
      }
      start = start == null ? 0 : start
      end = end === undefined ? length : end

      if (start < 0) {
        start = -start > length ? 0 : (length + start)
      }
      end = end > length ? length : end
      if (end < 0) {
        end += length
      }
      length = start > end ? 0 : ((end - start) >>> 0)
      start >>>= 0

      let index = -1
      const result = new Array(length)
      while (++index < length) {
        result[index] = array[index + start]
      }
      return result
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
