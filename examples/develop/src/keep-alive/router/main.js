
import Views from '../views'
export default [
  {
    path: '/',
    redirect: '/home/list',
  },
  {
    path: '/home',
    name: 'home',
    component: Views.Home,
    redirect: '/home/list',
    meta: {
      title: '首页',
      aliveKey: 'home'
    },
    children: [
      {
        path: 'list',
        name: 'list',
        component: Views.List,
      },
      {
        path: 'cart',
        name: 'cart',
        component: Views.Cart
      },
    ]
  },
  {
    path: '/detail',
    name: 'detail',
    component: Views.Detail,
  },
  {
    path: '/message',
    name: 'message',
    component: Views.Message,
  },
  {
    path: '/keep-scroll',
    name: 'keep-scroll',
    component: Views.KeepScroll,
    meta: {
      keepScroll: true
    }
  },
  {
    path: '/destroy',
    name: 'destroy',
    component: Views.Destroy,
    meta: {
      keepScroll: true
    }
  },
  {
    path: '/no-cache',
    name: 'no-cache',
    component: Views.Detail,
    meta: {
      nocache: true
    }
  },
  {
    path: '/frame',
    name: 'frame',
    component: Views.Frame,
    children: [
      {
        path: 'frame-detail',
        name: 'frame-detail',
        component: Views.FrameDetail,
        meta: {
          title: '这是详情页面'
        },
      },
      {
        path: 'frame-message',
        name: 'frame-message',
        component: Views.FrameDetail,
        meta: {
          title: '切换到了消息页面'
        },
      },
    ],
    meta: {
      title: 'frame',
      aliveKey: 'frame',
    }
  },
]