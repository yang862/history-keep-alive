<template>
  <div class="page">
    <van-nav-bar
      title="列表"
      left-arrow
      right-text="消息"
      @click-left="()=>$router.back()"
      @click-right="()=>$router.push({name:'message'})"
    />
    <div style="padding:20px;">
      <div class="card">
        <van-row justify="space-between">
          <van-col span="12" style="text-align:center;">
            <span @click="++count">
              <van-icon name="good-job" color="#3F93DC" size="30px" />
              <div>{{count}}</div>
            </span>
          </van-col>
          <van-col span="12" style="text-align:center;">
            <span @click="()=>$router.push({name:'detail'})">
              <van-icon name="browsing-history" color="#3F93DC" size="30px" />
              <div>跳转详情</div>
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