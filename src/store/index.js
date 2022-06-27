import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/modules/Auth/store'
import admin from '@/modules/Admin/store'
Vue.use(Vuex)

export default new Vuex.Store({
  
  modules:{
      admin,
      auth
  }
})
