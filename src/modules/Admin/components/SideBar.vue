<template>
    <div>
         <v-app-bar dense  app elevation="0" height="70px" color="#f3f4f9" >

           <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="$vuetify.breakpoint.xs" ></v-app-bar-nav-icon>
           <v-spacer></v-spacer>
           <v-menu
              left
              bottom
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(option, index) in options"
                  :key="index"
                  @click="option.action( index )"
                >
                  <v-list-item-title :to="{ name: option.link }" >{{ option.nombre }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
        </v-app-bar>

        <v-navigation-drawer
              dark
              color="#000849"
              v-model="drawer"
              app
              :expand-on-hover="!$vuetify.breakpoint.xs"
              :permanent="!$vuetify.breakpoint.xs"
              :mini-variant.sync="mini" 
            >
              <v-list>
                <v-list-item class="px-2">
                    <v-list-item-avatar>
                      <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                    </v-list-item-avatar>
                    <v-list-item link>
                    <v-list-item-content>
                      <v-list-item-title class="text-h6">
                        Sandra Adams
                        </v-list-item-title>
                        <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                </v-list-item>
              </v-list>
                <v-list
                 style="color: white"
                  nav
                  dense
                >
                  <v-list-item   color="#35b1ff" link v-for="(item , index ) in listItem" :key="index" :to="{name: item.nameRouter}">
                    <v-list-item-icon>
                      <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title >{{item.name}}</v-list-item-title>
                  </v-list-item>
                </v-list>
        </v-navigation-drawer>
  </div>
</template>


<script>
import { mapActions,  mapState } from 'vuex'
export default {
    data(){
      return {
        isBadgeActive: true,
        drawer: false,
        listItem: [
          { name: 'Dashboard', icon: 'mdi-view-dashboard', nameRouter: 'dashboard' },
          { name: 'Categorias', icon: 'mdi-folder', nameRouter: 'categorias' },
          { name: 'Productos', icon: 'mdi-cube-outline', nameRouter: 'productos' },
          { name: 'Usuarios', icon: 'mdi-account', nameRouter: 'usuarios' },
          { name: 'Ventas', icon: 'mdi-cart', nameRouter: 'compras' },

        ],
        items: [
        
        ],
        options:[
          { link: 'login', nombre: 'Salir', action: this.logOut }
        ]
      }
    },
    computed:{
        ...mapState('admin', ['notifications']),
        mini: {
          get(){
            return !this.$vuetify.breakpoint.xs ? true : false
          },
          set( value ){
            return value 
          }
        },
    },
    methods:{
       ...mapActions('admin', ['loadNotifications']),
      logOut(){
        this.$store.commit( 'auth/logout' )
        this.$router.push({name:'login'})
      }
    },
    mounted(){
    }
}
</script>

<style scoped lang="scss">


  .scroll{
      height: 100%;
      max-height: 310px;
      overflow-y: scroll ;
      &::-webkit-scrollbar{
        display: none;
      }
  }
</style>