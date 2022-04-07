<template>
  <div class="page">
    <van-nav-bar
      title="列表"
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
            <span @click="()=>$router.push({name:'slide'})">
              <van-icon name="browsing-history" color="#3F93DC" size="30px" />
              <div>slide效果</div>
            </span>
          </van-col>
          <van-col span="12" style="text-align:center;">
            <span @click="()=>$router.push({name:'zoom'})">
              <van-icon name="browsing-history" color="#3F93DC" size="30px" />
              <div>zoom效果</div>
            </span>
          </van-col>
        </van-row>
        <van-row justify="space-between" style="padding-top:20px;">
          <van-col span="12" style="text-align:center;">
            <span @click="()=>$router.push({name:'fade'})">
              <van-icon name="browsing-history" color="#3F93DC" size="30px" />
              <div>fade效果</div>
            </span>
          </van-col>
          <van-col span="12" style="text-align:center;">
            <span @click="()=>$router.push({name:'fade-transform'})">
              <van-icon name="browsing-history" color="#3F93DC" size="30px" />
              <div>fade-transform效果</div>
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