<script>
import qcloud from 'wafer2-client-sdk'
import config from './config'
export default {
  created () {
    qcloud.setLoginUrl(config.loginUrl)
  }
}
</script>

<style lang="scss">
.flex{
  display: flex;
  align-items: center;

  &.between{
    justify-content: space-between;
  }
}

.flex-item{
  flex: 1;
}
.text-red{
  color: #F15A4A;
}
</style>
