<template>
  <div class="container">
    <Card v-for="item in books" :key="item.id" :book="item"></Card>
    <p class="no-data" v-if="!hasNext">亲，就这么多了</p>
  </div>
</template>

<script>
import utils from '@/utils/index'
import Card from "@/components/card.vue"
export default {
  data () {
    return {
      books: [],
      page: 0,
      hasNext: true // 是否有下一页
    }
  },

  components: {
    Card
  },

  methods: {
    async getList (init) {
      if (init) {
        this.page = 0
        this.hasNext = true
      }
      wx.showNavigationBarLoading();
      const books = await utils.get('/weapp/book/list', {page: this.page})
      if (books.list.length < 10 && this.page > 0) {
        this.hasNext = false
      }
      if (init) {
        this.books = books.list
        wx.stopPullDownRefresh()
      } else{
        // 下拉刷新
        this.books = this.books.concat(books.list)
      }
      wx.hideNavigationBarLoading();
    }
  },
  onPullDownRefresh() {
    this.getList(true)
  },
  onReachBottom() {
    if (!this.hasNext) {
      // 没有更多了
      return;
    }
    this.page += 1
    this.getList()
  },

  mounted () {
    this.getList(true)
  }
}
</script>

<style scoped>
.no-data{
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}
</style>
