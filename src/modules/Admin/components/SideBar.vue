<template>
    <div>
         <v-app-bar dense  app elevation="0" height="70px" color="green" >
           <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="$vuetify.breakpoint.xs" ></v-app-bar-nav-icon>
           <v-spacer></v-spacer>
           <v-menu
                style="z-index: 201"
                left
                bottom
            >
                <template v-slot:activator="{ on, attrs }">
                    
                      <v-btn 
                          icon  
                          v-bind="attrs"
                          v-on="on" 
                      >
                      <v-badge 
                         dot
                         overlap
                         color="#d54338"
                         :value="isBadgeActive"
                        >
                          <v-icon>
                            mdi-bell
                          </v-icon>
                      
                      </v-badge>
                    </v-btn>
                </template>

              <v-list three-line width="450px"  class="scroll">
                  <v-subheader
                  style="font-size: 1.3rem; font-weight: 600"
                    >Notificaciones</v-subheader>
                    <v-divider class="my-1"></v-divider>
                    <v-card-title class="py-1" v-if="notification.length === 0">
                          <span class="text-center subtitle text--secondary">Usted no tiene notificaciones</span>
                    </v-card-title>
                  <template v-for="(item, index) in notification" >
                    <v-list-item 
                      :key="index"
                    >
                      <v-list-item-avatar height="50px" width="50px">
                        <v-img  max-height="125"  :src="item.avatar" ></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-html="item.title" style="color: grey" class="font-weight-bold" ></v-list-item-title>
                        <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                     
                  </template>
                  <v-divider class="my-1"></v-divider>
                   <v-card-text  v-if="notification.length > 0" >
                       <v-btn
                        color="#60d950"
                        deep
                        large
                        width="100%"
                        class="text-white"
                        height="35px"
                       >Ver todo</v-btn>
                        
                      </v-card-text>
                </v-list>
            </v-menu>
        </v-app-bar>

        <v-navigation-drawer
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
                  nav
                  dense
                >
                  <v-list-item link v-for="(item , index ) in listItem" :key="index" :to="{name: item.nameRouter}">
                    <v-list-item-icon>
                      <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{item.name}}</v-list-item-title>
                  </v-list-item>
                </v-list>
                  <template v-slot:append>
                    <div class="pa-2">
                      <v-btn block>
                        Logout
                      </v-btn>
                    </div>
                  </template>
        </v-navigation-drawer>
  </div>
</template>


<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    data(){
      return {
        isBadgeActive: true,
        drawer: false,
        listItem: [
          { name: 'Dashboard', icon: 'mdi-folder', nameRouter: 'dashboard' },
          { name: 'Categorias', icon: 'mdi-folder', nameRouter: 'categorias' },
          { name: 'Productos', icon: 'mdi-folder', nameRouter: 'productos' },
          { name: 'Usuarios', icon: 'mdi-folder', nameRouter: 'usuarios' },

        ],
        items: [
        
        ],
      }
    },
    computed:{
        ...mapState('admin', ['notifications']),
        ...mapGetters('admin', ['getNotifications']),
        mini: {
          get(){
            return !this.$vuetify.breakpoint.xs ? true : false
          },
          set( value ){
            return value 
          }
        },
        notification(){
          return this.getNotifications
        }
    },
    methods:{
       ...mapActions('admin', ['loadNotifications']),
      async getData(){

           await this.loadNotifications()
          //  const noti =
          // this.items = noti.map( ( noti ) => {
          //   return { 'avatar': noti.photo , 'title': noti.title , 'subtitle': noti.body}
          // })
      }
    },
    mounted(){
        this.getData()
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