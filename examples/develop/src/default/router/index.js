import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/index.vue'

Vue.use(VueRouter)

const constantRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

const createRouter = () => new VueRouter({
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

export default router
