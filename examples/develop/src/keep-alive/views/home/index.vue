<template>
  <div class="bg">
    <keep-alive>
      <router-view />
    </keep-alive>
    <van-tabbar
      v-model="active"
      placeholder
      fixed
    >
      <van-tabbar-item
        :name="tabNames[0]"
        icon="apps-o"
        :to="{name:tabNames[0]}"
        replace
      >
        首页
      </van-tabbar-item>
      <van-tabbar-item
        :name="tabNames[1]"
        icon="apps-o"
        :to="{name:tabNames[1]}"
        replace
      >
        购物车
      </van-tabbar-item>
      <van-tabbar-item
        :name="tabNames[2]"
        icon="apps-o"
        :to="{name:tabNames[2]}"
        replace
      >
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 'list',
      tabNames: [ 'list', 'cart', 'usercenter' ],
    }
  },
  created() {
    this.active = this.$route.name
  },
}
</script>