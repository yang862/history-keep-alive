
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
]