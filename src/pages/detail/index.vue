<template>
  <div class="book-detail">
    <BookInfo :info="info"></BookInfo>

  </div>
</template>

<script>
import BookInfo from '@/components/BookInfo.vue'
import utils from '@/utils/index'
export default {
  components: {
    BookInfo
  },
  data () {
    return {
      bookid: '',
      info: {}
    }
  },
  methods: {
    async getDetail() {
      const info = await utils.get('/weapp/book/detail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
    }
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id
    this.getDetail();
  }
}
</script>
<style lang="scss" scoped>

</style>
