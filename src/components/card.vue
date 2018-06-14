<template>
  <a :href="detailUrl">
    <div class="book-card flex">
      <img :src="book.image" alt="" mode="aspectFit">
      <div class="flex-item">
        <div class="flex between">
          <div class="text-red flex-item">{{book.title}}</div>
          <div class="rate">
            <Star :value="book.rate"/> {{book.rate}}
          </div>
        </div>
        <div class="flex between">
          <div class="text-author">{{book.author}}</div>
          <div class="text-red">浏览：{{book.count}}</div>
        </div>
        <div class="flex between">
          <div>{{book.publisher}}</div>
          <div>{{book.user_info.nickName}}</div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import Star from './Star.vue'
export default {
  components: {
    Star
  },
  props: ['book'],
  computed: {
    detailUrl () {
      return `/pages/detail/main?id=${this.book.id}`
    }
  }
}
</script>

<style lang="scss">
.book-card {
  font-size: 16px;
  padding: 15rpx;

  img{
    width: 150rpx;
    height: 150rpx;
    margin-right: 15rpx;
  }

  .rate{
    .star{
      color: #F15A4A;
    }
  }
}
</style>
