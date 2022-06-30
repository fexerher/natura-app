<template>
  <div>
      <v-parallax
        height="800"
        src="@/assets/img/fondo-principal.jpg"
      >
      <v-row
          align="center"
          justify="center"
        >
          <v-col
            class="text-center"
            cols="12"
          >
            <h1 class="text-h2 font-weight-bold mb-4 text-capitalize">
              Elige Santa Natura
            </h1>
            <h4 class="text-h6 text-capitalize">
              "SOMOS LA TRADICIÓN DE NUESTROS ANTEPASADOS QUE MIRARON HACIA EL FUTURO”
            </h4>
          </v-col>
      </v-row>
    </v-parallax>
    <v-container v-if="productos">
        <div>
          <h1 class="text-center my-6">Productos</h1>
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
                  src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                ></v-img>

                <v-card-title class="text-capitalize">{{producto.nombre}}</v-card-title>

                <v-card-subtitle>
                  <div>{{producto.idcategoria}}</div>
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
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'main-menu',
  component: {
  },
  data(){
    return {
      dialog: false,
    }
  },
  computed: {
    ...mapGetters('main', ['filterproductos']),
    productos(){
      return this.filterproductos
    }
  },
  methods:{
    ...mapActions( 'main', ['obtenerproductos', 'addcart'] ),
     getProductos(){
      this.obtenerproductos()
    },
    addCart( producto ){
       this.addcart( producto )
      
    },
    goToCart(){
      this.dialog = false
      this.$router.push({name: 'carrito'})
    }
  },
  created(){
    this.getProductos()
  }
}
</script>

<style>

</style>