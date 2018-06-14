<template>
  <div class="book-info">
    <div class="thumb">
      <img :src="info.image" alt="" class="back" mode="aspectFill">
      <img :src="info.image" alt="" class="img" mode="aspectFit">
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="author">{{info.author}}</div>
        <Star :value="info.rate"/> {{info.rate}}分
      </div>
    </div>
    <div class="tags">
      <div v-for="tag in info.tags" :key="tag" class="badge">{{tag}}</div>
    </div>
    <div class="summary">
      <p v-for="(sum,i) in info.summary" :key="i">{{sum}}</p>
    </div>
  </div>
</template>
<script>
import Star from '@/components/Star.vue'
export default {
  components: {
    Star
  },
  props: ['info']
}
</script>
<style lang="scss">
.book-info{
  font-size: 14px;

  .thumb{
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;

    .back{
      filter: blur(10px);
      width: 100%;
    }
    .img{
      position: absolute;
      top: 30rpx;
      width: 100%;
      height: 300rpx;
      left: 0;
    }
    .info{
      position: absolute;
      left: 0;
      color: white;
      width: 100%;
      top: 340rpx;
      text-align: center;

      .title{
        font-size: 20px;
      }
      .star{
        color: #F15A4A;
      }
    }
  }

  .tags{
    .badge{
      display: inline-block;
      border: 1px solid #F15A4A;
      border-radius: 10px;
      margin: 5px;
      padding: 5px;
      color: #F15A4A;
    }
  }
  .summary{
    padding: 0 15px;
    margin-top: 10px;
    p{
      text-indent: 2em;
      font-size: 14px;
    }
  }
}
</style>
