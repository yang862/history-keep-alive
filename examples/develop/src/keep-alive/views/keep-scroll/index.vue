<template>
  <div id="keep-scroll-plugin-target" style="height:100vh;overflow-y:auto;" class="bg">
    <div style="height:200vh;">
      <van-nav-bar
        title="keep scroll"
        left-arrow
        fixed
        @click-left="()=>$router.back()"
      />
      <div style="padding-bottom:20px;"></div>
      <div style="padding:20px;padding-top:500px;">
        <div class="card">
          <van-row justify="space-between">
            <van-col span="24" style="text-align:center;">
              <span @click="()=>$router.push({name:'message'})">
                <van-icon name="browsing-history" color="#3F93DC" size="30px" />
                <div>跳转新页面再返回，查看keep scroll效果</div>
              </span>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>