<template>
  <div class="container">
    <Card v-for="item in [1,2,3]" :key="item"></Card>
  </div>
</template>

<script>
import Card from "@/components/card.vue"
export default {
  data () {
    return {
      userInfo: {}
    }
  },

  components: {
    Card
  },

  methods: {
  },

  created () {
    // 调用应用实例的方法获取全局数据
  }
}
</script>

<style scoped>

</style>
