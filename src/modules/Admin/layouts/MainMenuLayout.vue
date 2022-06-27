<template>
<div>
       
      <SideBar />
      <v-main app>
          <v-container>
                <router-view></router-view>
          </v-container>
      </v-main>


</div>
    

</template>

<script>
import SideBar from '../components/SideBar.vue'
export default {
    components: {
        SideBar
    },
}
</script>

<style>

</style>