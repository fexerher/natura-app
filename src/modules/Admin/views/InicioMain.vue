<template>
  <div>
        <v-row>
          <v-col cols="12" md="3" sm="4">
            <v-card height="100%" width="400px" class="ma-4 pa-5 white--text" color="red" >
                <v-row  class="pa-5">
                  <v-col class="text-center" >
                    <v-icon  size="80" color="white" >mdi-account</v-icon>
                  </v-col>
                  <v-col>
                    <div class="text-h5 text-center">Usuarios</div>
                    <div class="text-h4 text-center">{{users}}</div>
                  </v-col>
                </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" md="3"  sm="4">
            <v-card height="100%" width="400px" class="ma-4 pa-5 white--text" color="blue" >
                <v-row  class="pa-5">
                  <v-col class="text-center" >
                    <v-icon  size="80" color="white" >mdi-cart</v-icon>
                  </v-col>
                  <v-col>
                    <div class="text-h5 text-center"  >Ventas</div>
                    <div class="text-h4 text-center" >{{ventas}}</div>
                  </v-col>
                </v-row>
            </v-card>
          </v-col>
            <v-col cols="12" md="3"  sm="4">
            <v-card height="100%" width="400px" class="ma-4 pa-5 white--text" color="success" >
                <v-row  class="pa-5">
                  <v-col class="text-center" >
                    <v-icon  size="80" color="white" >mdi-shopping</v-icon>
                  </v-col>
                  <v-col>
                    <div class="text-h5 text-center">Total</div>
                    <div class="text-h4 text-center">{{total}}</div>
                  </v-col>
                </v-row>
            </v-card>
          </v-col>
        </v-row>
        
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'DashboardMain',
    computed:{
      ...mapGetters('admin', ['getUsers', 'getVentas','getTotal']),
      users(){
        return this.getUsers
      },
      ventas(){
        return this.getVentas
      },
      total(){
        return this.getTotal
      },
    },
    methods:{
      ...mapActions('admin', ['ventasGet' , 'getusuarios', 'getcategorias']),
      getData(){
        this.ventasGet(),
        this.getusuarios(),
        this.getcategorias()
      }
    },
    created(){
      this.getData()
    }
}
</script>

<style>

</style>