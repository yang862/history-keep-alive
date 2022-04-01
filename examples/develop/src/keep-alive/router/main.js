
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
        component: Views.Cart,
        meta: {
          title: '购物车'
        }
      },
      {
        path: 'usercenter',
        name: 'usercenter',
        component: Views.Usercenter,
        meta: {
          title: '我的'
        }
      }
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
]