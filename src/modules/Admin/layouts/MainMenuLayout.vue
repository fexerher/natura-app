<template>
<div>
       
      <SideBar />
      <v-main app>
          <v-container  >
                <router-view ></router-view>
          </v-container>
      </v-main>


</div>
    

</template>

<script>
import SideBar from '../components/SideBar.vue'
import { mapActions } from 'vuex';
export default {
    components: {
        SideBar
    },
    methods:{
        ...mapActions('auth', ['checkAuthentication'])
    },
    created( ){
        this.checkAuthentication()
    },
}
</script>

<style>

</style>