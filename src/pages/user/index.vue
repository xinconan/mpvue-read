<template>
  <div>
    <div class="avatar-wrapper">
      <div class="avatar">
        <open-data type="userAvatarUrl"></open-data>
      </div>
      <open-data type="userNickName"></open-data>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      logs: []
    }
  },

  created () {
  }
}
</script>

<style lang="scss" scoped>
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
