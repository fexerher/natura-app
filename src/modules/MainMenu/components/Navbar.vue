<template>
    <v-app-bar
      absolute
      color="white"
      app
      height="100px"
      elevation="0"
    >

      <v-app-bar-nav-icon v-show="$vuetify.breakpoint.xs" ></v-app-bar-nav-icon>

      <v-toolbar-title style="cursor: pointer" @click="$router.push({name:'main'}).catch(()=> {})" >
            <h2  style="color: #349f06">Santa Natura <span class="subtitle-1 font-weight-bold" >Huaycan</span> </h2 >
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn :to="{ name: link.to }"  elevation="0" color="success" text  class="mr-1" v-for="(link, index) in links" :key="index" >
        {{link.name}}
      </v-btn>

      <v-btn icon class="mx-5" :to="{name: 'carrito'}" >
        <v-badge :content="Object.keys(carrito).length || '0'"  color="orange">
         <v-icon >
            mdi-cart  
         </v-icon>
        </v-badge>
      </v-btn>
 
    </v-app-bar>
</template>

<script>
import { mapActions,  mapGetters } from 'vuex'
export default {
    name: 'nav-bar',
    data(){
        return{
            links: [
              { name: 'Inicio', to: 'main' },
              { name: 'Tienda', to: 'tienda' },
              { name: 'Nosotros', to: 'nosotros' },
              { name: 'Contacto', to: 'contacto' },
            ],
        }
    },
    computed:{
      ...mapGetters('main',['filtercarrito']),
      carrito(){
        return this.filtercarrito
      }
    },
    methods:{
      ...mapActions('main', ['loadcart'])
    },
    created(){
      this.loadcart()
    }
}
</script>

<style scoped>



</style>