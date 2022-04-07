<template>
  <div>
    <div style="padding:20px;">
      <div class="card">
        <van-row justify="space-between">
          <van-col span="24" style="text-align:center;">
            <span @click="++count">
              <van-icon name="good-job" color="#3F93DC" size="30px" />
              <div>
                <span>{{isDetail?'详情':'消息'}}</span>
                count: {{count}}
              </div>
            </span>
          </van-col>
        </van-row>
        <van-row justify="space-between" style="padding-top:20px;">
          <van-col span="12" style="text-align:center;">
            <span v-if="isDetail" @click="()=>$router.push({name:'frame-message'})">
              <van-icon name="chat" color="#3F93DC" size="30px" />
              <div>跳转消息</div>
            </span>
            <span v-else @click="()=>$router.push({name:'frame-detail'})">
              <van-icon name="chat" color="#3F93DC" size="30px" />
              <div>跳转详情</div>
            </span>
          </van-col>
          <van-col span="12" style="text-align:center;">
            <span @click="()=>$router.push({name:'home'})">
              <van-icon name="chat" color="#3F93DC" size="30px" />
              <div>跳转首页</div>
            </span>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
  computed: {
    isDetail() {
      return this.$route.name === 'frame-detail';
    }
  },
}
</script>