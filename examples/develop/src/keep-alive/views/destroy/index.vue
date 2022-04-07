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
              <div style="font-size:12px;">
                <div>调用this.$routerHistoryInstance.destroy方法</div>
                <div>
                  <span style="font-weight:bold;">注：</span>
                  请避免销毁当前页面的缓存，以免引起页面渲染问题
                </div>
              </div>
            </span>
          </van-col>
        </van-row>
        <van-row justify="space-between" style="padding-top:20px;">
          <van-col span="24" style="text-align:center;">
            <span @click="destroyAll">
              <van-icon name="browsing-history" color="#3F93DC" size="30px" />
              <div>销毁所有页面缓存</div>
              <div style="font-size:12px;">
                <div>调用this.$routerHistoryInstance.destroyAll方法</div>
                <div>
                  <span style="font-weight:bold;">注：</span>
                  destroyAll方法不会销毁当前页面的缓存
                </div>
              </div>
            </span>
          </van-col>
        </van-row>
        <van-row justify="space-between" style="padding-top:20px;">
          <van-col span="24" style="text-align:center;">
            <span @click="()=>$router.push({name:'home'})">
              <van-icon name="wap-home" color="#3F93DC" size="30px" />
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
      count: 0
    }
  },
  methods: {
    destroy() {
      const res = this.$routerHistoryInstance.destroy({ path: '/home/list' });
      res ? this.$toast.success('销毁首页成功！')
        : this.$toast.fail('销毁首页失败，未找到对应的缓存！');
    },
    destroyAll() {
      this.$routerHistoryInstance.destroyAll();
      this.$toast.success('销毁所有页面完成！');
    },
  }
}
</script>