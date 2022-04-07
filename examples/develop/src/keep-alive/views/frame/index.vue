<template>
  <div class="bg page">
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      fixed
      @click-left="()=>$router.back()"
    />
    <div style="padding-bottom:48px;"></div>
    <div style="padding:20px;">
      <div class="card">
        <van-row justify="space-between">
          <van-col span="24" style="text-align:center;">
            <span @click="++count">
              <van-icon name="good-job" color="#3F93DC" size="30px" />
              <div>frame count: {{count}}</div>
              <div style="font-size:12px;">切换页面时缓存父组件，count保持不变</div>
            </span>
          </van-col>
        </van-row>
      </div>
    </div>
    <history-keep-alive />
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
    };
  }
}
</script>