# history-keep-alive

[![npm](https://img.shields.io/npm/v/history-keep-alive.svg)](https://www.npmjs.com/package/history-keep-alive)
[![npm](https://img.shields.io/npm/l/history-keep-alive.svg)](https://www.npmjs.com/package/history-keep-alive)

> 需要 [vue](https://github.com/vuejs/vue) `2.x` 与 [vue-router](https://github.com/vuejs/vue-router) `3.x`。

### DEMO

[在线预览](https://yang862.github.io/history-default-page/)

[history-keep-alive](https://yang862.github.io/history-keep-alive-page/)

[history-transition](https://yang862.github.io/history-transition-page/)

## 是什么

像原生 app 一样缓存页面的 vue 插件，基于 vue 的缓存机制扩展功能，开发者可按自己的需求实现复杂的自定义缓存功能

## 为什么

1. 像原生 app 一样缓存页面
2. 流畅的 transition 效果
3. 简单易用，插拔式的 keep-alive 插件
4. 可嵌套，兼容多级路由下的使用
5. 提供底层的组件，可供不同需求下的自定义扩展

## 一、安装

[代码地址](https://github.com/yang862/history-keep-alive)

```bash
npm i history-keep-alive -S
```

或

```bash
yarn add history-keep-alive
```

## 二、使用

### 基础使用

index.js（项目入口文件）

```javascript
import Vue from "vue";
import router from "./router"; // vue-router 实例
import HistoryKeepAlive from "history-keep-alive";

Vue.use(HistoryKeepAlive, { router });
// 启动你的应用...
```

index.vue （任意一个使用`<router-view>`的页面）

```vue
<template>
  <div>
    <!-- 替换<router-view> -->
    <history-keep-alive />
  </div>
</template>
```

## 三、Options

| 参数            | 描述                                                                                                                                                           | 类型                                                          | 默认值    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | --------- |
| router          | 必传，vue-router 实例                                                                                                                                          | [VueRouter](https://v3.router.vuejs.org/zh/guide/#javascript) | 无        |
| immediate       | router.onReady 时是否记录路由历史（非必要不能修改）                                                                                                            | Boolean                                                       | true      |
| useTimestamp    | 是否使用 timestamp 判断前进后退。启用时，push 和 replace 动作会往页面地址中加入 timestamp 参数，若禁用，将无法判断当前路由动作。使用`Transition`组件时建议开启 | Boolean                                                       | true      |
| componentPrefix | history-keep-alive 组件注册时的前缀，例如传值'base'，使用时即`<base-keep-alive>`                                                                               | String                                                        | 'history' |

## 四、使用 Transition 组件

> 提供原生 app 般流畅的过渡效果

index.js

```javascript
import { Transition } from "history-keep-alive";
import router from "./router"; // vue-router 实例
import HistoryKeepAlive from "history-keep-alive";

Vue.use(HistoryKeepAlive, { router });
// 启动你的应用...
```

index.vue

```vue
<template>
  <div>
    <!-- 替换<router-view> -->
    <history-transition keep-alive />
  </div>
</template>
<script>
import { Transition } from  'history-keep-alive'
export default {
  components: {
    'history-transition': Transition,
  }
  ...
}
</script>
```

### history-keep-alive / Transition 组件 props

| props         | 描述                                                                       | 类型     | 默认值   |
| ------------- | -------------------------------------------------------------------------- | -------- | -------- |
| aliveRef      | 设置`<router-view>`的 ref 属性，详见[keepScroll](#keepScroll)              | String   | 无       |
| keepAlive     | 是否缓存页面                                                               | Boolean  | false    |
| max           | 缓存页面个数上限                                                           | Number   | 10       |
| keyFormatter  | 自定义 keep-alive 的 key 的处理器，详见[keyFormatter](#keyformatter)       | Function | () => {} |
| historyFilter | 自定义 keep-alive 的 history 的过滤器，详见[historyFilter](#historyfilter) | Function | null     |

## 五、高级用法

### <div id="keepScroll">keepScroll</div>

> **keep-scroll-plugin-target**：约定好的 id，要使用 keepScroll 功能就要给滚动元素设置这个 id

index.vue（父页面）

```vue
<template>
  <div>
    <history-keep-alive alive-ref="view" />
  </div>
</template>
```

index.vue（子页面）

```vue
<template>
  <div id="keep-scroll-plugin-target">...</div>
</template>
```

**注：body 滚动的页面无法使用，请自行实现**

### routes meta 参数

| 参数           | 描述                                                                                 | 类型    | 默认值  |
| -------------- | ------------------------------------------------------------------------------------ | ------- | ------- |
| aliveKey       | 嵌套使用`<the-keep-alive>`时，想要在不同页面复用相同的父级组件，就要设置一个唯一的值 | String  | 无      |
| nocache        | 是否禁用缓存                                                                         | Boolean | 无      |
| transitionName | 设置页面的 transition 效果，可选值`[slide, zoom, fade, fade-transform]`              | String  | 'slide' |

**更多功能参数，可通过 keyFormatter 和 keyFormatter 自行设置**

### <div id="keyformatter">keyFormatter</div>

> 自定义组件缓存时的 key，相同 key 的组件会共用缓存，适用于个别需要特殊处理缓存的页面或组件

### <div id="historyfilter">historyFilter</div>

> 根据路由历史过滤不需要缓存的页面

### keyFormatter/historyFilter 的使用

index.vue

```vue
<template>
  <div>
    <history-kee-alive
      :key-formatter="formatter"
      :history-filter="historyFilter"
    />
  </div>
</template>
<script>
export default {
  methods: {
    /**
     * @param {Route} route 路由历史地址匹配到的路由信息
     * @param {Number} depth 当前组件所在的层级
     */
    formatter(route, depth) {
      // return aliveKey you want
    }
    /**
     * @param {Route} route 路由历史地址匹配到的路由信息
     * @param {Number} depth 当前组件所在的层级
     * @return {Boolean} 希望被过滤的路由历史返回false，否则返回true
     */
    historyFilter(route, depth) {
      // return Boolean
    }
  }
  ...
}
</script>
```

### 底层 keep-alive 的使用

> 如果以上配置仍不能满足需求，可使用`<history-base-keep-alive>`组件（已由插件注册到 VueComponents 中）自行实现缓存的逻辑，详情可参考[history-keep-alive](https://github.com/yang862/history-keep-alive/blob/master/packages/components/the-keep-alive/index.js)

## 写在最后

> 这个插件产出于日常的需求，可能有考虑不周的地方，有任何问题欢迎与我交流，邮箱[barrier.yang@outlook.com](mailto:barrier.yang@outlook.com)，希望使用这个插件能够帮到有相同需求的同学。
