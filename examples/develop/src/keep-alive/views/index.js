const Home = () => import('./home/index.vue')
const List = () => import('./home/list/index.vue')
const Cart = () => import('./home/cart/index.vue')

const Detail = () => import('./detail/index.vue')
const Message = () => import('./message/index.vue')
const KeepScroll = () => import('./keep-scroll/index.vue')
const Destroy = () => import('./destroy/index.vue')
const Frame = () => import('./frame/index.vue')
const FrameDetail = () => import('./frame-detail/index.vue')

export default {
  Cart,
  Home,
  Detail,
  List,
  Message,
  KeepScroll,
  Destroy,
  Frame,
  FrameDetail,
}