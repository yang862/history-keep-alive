<template>
  <div class="bg page">
    <van-nav-bar
      title="destroy"
      left-arrow
      @click-left="()=>$router.back()"
    />
    <div style="padding:20px;">
      <div class="card">
        <van-row justify="space-between">
          <van-col span="24" style="text-align:center;">
            <span @click="destroy">
              <van-icon name="browsing-history" color="#3F93DC" size="30px" />
              <div>通过path销毁指定页面缓存</div>
              <div style="font-size:12px;">调用this.$routerHistory.destroy方法</div>
            </span>
          </van-col>
        </van-row>
        <van-row justify="space-between" style="padding-top:20px;">
          <van-col span="24" style="text-align:center;">
            <span @click="destroyByCacheKey">
              <van-icon name="browsing-history" color="#3F93DC" size="30px" />
              <div>通过cacheKey销毁指定页面缓存</div>
              <div style="font-size:12px;">调用this.$routerHistory.destroy方法</div>
            </span>
          </van-col>
        </van-row>
        <van-row justify="space-between" style="padding-top:20px;">
          <van-col span="24" style="text-align:center;">
            <span @click="destroyAll">
              <van-icon name="browsing-history" color="#3F93DC" size="30px" />
              <div>销毁所有页面缓存</div>
              <div style="font-size:12px;">调用this.$routerHistory.destroyAll方法</div>
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
      count: 0
    }
  },
  methods: {
    destroy() {
      const res = this.$routerHistory.destroy({ path: '/home/list' });
      res ? this.$toast.success('销毁首页成功！')
        : this.$toast.fail('销毁首页失败，未找到对应的缓存！');
    },
    destroyByCacheKey() {
      const routeHistory = history.state.routeHistory || [];
      const key = routeHistory.slice(-2)[0].cacheKey; // 从路由历史中获取对应页面的cacheKey
      const res = this.$routerHistory.destroy({ key });
      res ? this.$toast.success('销毁首页成功！')
        : this.$toast.fail('销毁首页失败，未找到对应的缓存！');
    },
    destroyAll() {
      this.$routerHistory.destroyAll();
      this.$toast.success('销毁所有页面完成！');
    }
  }
}
</script>