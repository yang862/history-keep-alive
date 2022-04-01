import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@keepAlive/style/index.less'

import HistoryKeepAlive from '@/packages/'
Vue.use(HistoryKeepAlive, { router })

// import {
//   Tabbar,
//   TabbarItem,
// } from 'vant'

// Vue.use(Tabbar)
// Vue.use(TabbarItem)

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')