<template>
<div style="min-height: 90vh">
  <v-container v-if="productos">
        <div>
              <h1 class="text-center my-6">Tienda</h1>
            </div>
            <div class="productos"  >
              <v-row  >
                <v-col cols="12" xl="3" lg="4" md="4" sm="4" 
                    v-for="producto in productos"
                    :key="(producto.id)">

                <v-card
                  
                    class="mx-auto my-5"
                    max-width="340"
                  >
                    <template slot="progress">
                      <v-progress-linear
                        color="deep-purple"
                        height="10"
                        indeterminate
                      ></v-progress-linear>
                    </template>

                  

                    <v-img
                      height="250"
                      :src="producto.img"
                    ></v-img>

                    <v-card-title class="text-capitalize">{{producto.nombre}}</v-card-title>

                    <v-card-subtitle>
                      <div  class="text-capitalize">{{producto.descripcion}}</div>
                      <div class="subtitle-1">S/.{{producto.precio}}</div>
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-btn
                        color="deep-purple  lighten-2"
                        text
                        @click="addCart(producto)"
                      >
                        Añadir al Carrito
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </div>
        </v-container>  
         <v-dialog
            v-model="dialog"
            persistent
            max-width="400"
          >
          
            <v-card>
              <v-card-title class="text-h5">
                Producto añadido al carrito
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                >
                  Seguir Comprando
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="goToCart"
                >
                  Ir al Carrito
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
    </div>
</template>

<script>
import { mapActions , mapGetters} from 'vuex'
export default {
    name: 'tienda-main',
    data(){
      return {
        dialog: false,
      }
    },
    computed:{
      ...mapGetters('main', ['filterproductos']),
      productos(){
        return this.filterproductos
      }
    },
    methods:{
      ...mapActions( 'main', ['obtenerproductos', 'addcart'] ),
       addCart( producto ){
        this.addcart( producto )
        this.dialog = true
      },
      goToCart(){
        this.dialog = false
        this.$router.push({name: 'carrito'})
      }
    },
    created(){
      this.obtenerproductos()
    },
   
}
</script>

<style>

</style>