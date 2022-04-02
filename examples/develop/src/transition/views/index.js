const Home = () => import('./home/index.vue')
const List = () => import('./home/list/index.vue')
const Cart = () => import('./home/cart/index.vue')

const Detail = () => import('./detail/index.vue')
const Message = () => import('./message/index.vue')

export default {
  Cart,
  Home,
  Detail,
  List,
  Message,
}