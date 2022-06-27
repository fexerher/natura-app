import adminRouter from '@/modules/Admin/router'
import autLogin from '@/modules/Auth/router'
import main from '@/modules/MainMenu/router'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin/home',
    ...adminRouter,
  },
  {
    path: '/admin',
    ...autLogin
  },
  {
    path: '/',
    ...main
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
