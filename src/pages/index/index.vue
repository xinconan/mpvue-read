<template>
  <div class="container">
    <Card v-for="item in books" :key="item.id" :book="item"></Card>
  </div>
</template>

<script>
import utils from '@/utils/index'
import Card from "@/components/card.vue"
export default {
  data () {
    return {
      books: [],
      page: 0
    }
  },

  components: {
    Card
  },

  methods: {
    async getList (init) {
      wx.showNavigationBarLoading();
      const books = await utils.get('/weapp/book/list', {page: this.page})
      this.books = books.list
      wx.hideNavigationBarLoading();
    }
  },

  mounted () {
    this.getList()
  }
}
</script>

<style scoped>

</style>
