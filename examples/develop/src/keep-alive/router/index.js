import Vue from 'vue'
import VueRouter from 'vue-router'
import mainRoutes from './main'

Vue.use(VueRouter)

const routes = [ ...mainRoutes ]

const createRouter = () => new VueRouter({
  base: 'keep-alive',
  mode: 'history',
  routes: routes
})

const router = createRouter()

export default router
