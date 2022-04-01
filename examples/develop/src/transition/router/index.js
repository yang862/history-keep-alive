import Vue from 'vue'
import VueRouter from 'vue-router'
import mainRoutes from '@keepAlive/router/main'

Vue.use(VueRouter)

const routes = [ ...mainRoutes ]

const createRouter = () => new VueRouter({
  base: 'transition',
  mode: 'history',
  routes: routes
})

const router = createRouter()

export default router
