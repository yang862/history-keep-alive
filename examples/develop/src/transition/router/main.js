
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
      }
    ]
  },
  {
    path: '/slide',
    name: 'slide',
    component: Views.Detail,
    meta: {
      transitionName: 'slide'
    }
  },
  {
    path: '/zoom',
    name: 'zoom',
    component: Views.Message,
    meta: {
      transitionName: 'zoom'
    }
  },
  {
    path: '/fade',
    name: 'fade',
    component: Views.Detail,
    meta: {
      transitionName: 'fade'
    }
  },
  {
    path: '/fade-transform',
    name: 'fade-transform',
    component: Views.Detail,
    meta: {
      transitionName: 'fade-transform'
    }
  },
]