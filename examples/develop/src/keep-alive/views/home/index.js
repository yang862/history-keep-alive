const Cart = () => import('./home/cart/index.vue')
const Home = () => import('./home/index.vue')
const Usercenter = () => import('./home/usercenter/index.vue')

const Detail = () => import('./home/detail/index.vue')
const List = () => import('./home/list/index.vue')
const Message = () => import('./home/message/index.vue')

export default {
  Cart,
  Home,
  Usercenter,
  Detail,
  List,
  Message,
}