import adminRouter from '@/modules/Admin/router'
import autLogin from '@/modules/Auth/router'
import main from '@/modules/MainMenu/router'
import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    
    path: '/admin/home',
    beforeEnter: async( to, from, next ) => {
      const { ok, rol } = await store.dispatch('auth/checkAuthentication')
      if( ok && rol === 'ROL_ADMIN') {
        next()
      }else {
        next({ name: 'login'})
      } 
    },
    ...adminRouter,
  },
  {
    path: '/admin',
    beforeEnter: async( to, from, next ) => {
      const { ok } = await store.dispatch('auth/checkAuthentication')
      if( ok ) {
        next({name: 'dashboard'})
      }else {
        next()
      } 
    },
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
