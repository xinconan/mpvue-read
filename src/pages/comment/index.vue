<template>
  <div class="comment-wrapper">
    <div v-if="userInfo.openId">
      <div class="title">我添加的图书</div>
      <Card v-for="item in books" :key="item.id" :book="item"></Card>
    </div>
  </div>
</template>

<script>
import utils from '@/utils/index'
import Card from '@/components/card.vue'
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

<style>

</style>
