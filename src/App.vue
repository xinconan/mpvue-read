<script>
import qcloud from 'wafer2-client-sdk'
import config from './config'
export default {
  created () {
    qcloud.setLoginUrl(config.loginUrl)
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
.flex{
  display: flex;
  align-items: center;
}
.flex-item{
  flex: 1;
}
</style>
