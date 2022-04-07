<template>
  <div class="page">
    <van-nav-bar
      title="首页"
      left-arrow
      @click-left="()=>$router.back()"
    />
    <div style="padding:20px;">
      <div class="card">
        <van-row justify="space-between">
          <van-col span="24" style="text-align:center;">
            <span @click="++count">
              <van-icon name="good-job" color="#3F93DC" size="30px" />
              <div>{{count}}</div>
              <div style="font-size:14px;">尝试点击记录count，再切换路由查看缓存效果</div>
            </span>
          </van-col>
        </van-row>
        <van-row justify="space-between" style="padding-top:20px;">
          <van-col span="12" style="text-align:center;">
            <span @click="()=>$router.push({name:'frame-detail'})">
              <van-icon name="browsing-history" color="#3F93DC" size="30px" />
              <div>嵌套路由页面demo</div>
            </span>
          </van-col>
          <van-col span="12" style="text-align:center;">
            <span @click="()=>$router.push({name:'keep-scroll'})">
              <van-icon name="browsing-history" color="#3F93DC" size="30px" />
              <div>keep-scroll demo</div>
            </span>
          </van-col>
        </van-row>
        <van-row justify="space-between" style="padding-top:20px;">
          <van-col span="12" style="text-align:center;">
            <span @click="()=>$router.push({name:'destroy'})">
              <van-icon name="browsing-history" color="#3F93DC" size="30px" />
              <div>destroy demo</div>
            </span>
          </van-col>
          <van-col span="12" style="text-align:center;">
            <span @click="()=>$router.push({name:'no-cache'})">
              <van-icon name="browsing-history" color="#3F93DC" size="30px" />
              <div>no-cache demo</div>
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