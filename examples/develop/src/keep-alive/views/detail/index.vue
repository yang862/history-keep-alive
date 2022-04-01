<template>
  <div class="bg page">
    <van-nav-bar
      title="详情"
      left-arrow
      @click-left="()=>$router.back()"
    />
    <div style="padding:20px;">
      <div class="card">
        <van-row justify="space-between">
          <van-col span="8" style="text-align:center;">
            <span @click="++count">
              <van-icon name="good-job" color="#3F93DC" size="30px" />
              <div>{{count}}</div>
            </span>
          </van-col>
          <van-col span="8" style="text-align:center;">
            <span @click="()=>$router.push({name:'home'})">
              <van-icon name="wap-home" color="#3F93DC" size="30px" />
              <div>跳转首页</div>
            </span>
          </van-col>
          <van-col span="8" style="text-align:center;">
            <span @click="()=>$router.push({name:'message'})">
              <van-icon name="chat" color="#3F93DC" size="30px" />
              <div>跳转消息</div>
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
  }
}
</script>