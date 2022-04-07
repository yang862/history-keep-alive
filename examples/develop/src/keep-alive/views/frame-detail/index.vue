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
              <van-icon name="wap-home" color="#3F93DC" size="30px" />
              <div>跳转首页</div>
            </span>
          </van-col>
        </van-row>
      </div>
      <div v-if="!isDetail" class="card" style="margin-top:20px;">
        <van-row justify="space-between">
          <van-col span="24" style="text-align:center;">
            <span @click="destroyNested">
              <van-icon name="browsing-history" color="#3F93DC" size="30px" />
              <div>销毁嵌套路由的指定页面缓存</div>
              <div style="font-size:12px;">
                <div>调用this.$routerHistoryInstance.destroy方法</div>
                <div style="padding-top:10px;">
                  <span style="font-weight:bold;">注：</span>
                  单个
                  <span style="color:#3F93DC">history-keep-alive组件</span>
                  对自己的缓存独立进行管理，所以在子组件下调用destroy方法，只能销毁其所属的
                  <span style="color:#3F93DC">history-keep-alive组件</span>
                  的缓存
                </div>
              </div>
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
  methods: {
    destroyNested() {
      const res = this.$routerHistoryInstance.destroy({ path: '/frame/frame-detail' });
      res ? this.$toast.success('销毁详情页面成功！')
        : this.$toast.fail('销毁详情页面失败，未找到对应的缓存！');
    },
  }
}
</script>