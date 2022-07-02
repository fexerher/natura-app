<template>
<div>

    <v-container v-if="!successCheckout">
        
        <h1 class="text-center my-8">CARRITO DE COMPRAS</h1>
        <v-simple-table height="593px" v-show="Object.keys(carrito).length" >
            <template v-slot:default >
            <thead>
                <tr>
                <th class="text-left">

                </th>
                <th class="text-left">

                </th>
                <th class="text-left">
                    Producto
                </th>
                <th class="text-left">
                    Precio
                </th>
                 <th class="text-left">
                    Cantidad
                </th>
                <th class="text-left">
                    SubTotal
                </th>
                </tr>
            </thead>
            <tbody >
                <tr
                
                style="padding: 30px 0 !important"
                v-for="(item) in carrito"
                :key="item.id"
                >
                <td><v-btn @click="decrementCart(item.id)" icon><v-icon>mdi-close-circle-outline</v-icon></v-btn></td>
                <td ><v-img width="80px" :src="item.img"></v-img></td>
                <td>{{ item.nombre }}</td>
                <td>S/.{{ item.precio }}</td>
                <td><v-text-field type="number" :rules="rules" min="1" max="10" v-model="item.cantidad" @change="validateCantidad(item)" ></v-text-field></td>
                <td>S/.{{item.precio * item.cantidad}}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total: {{Total}} </td>
                    <td><div  class="cho-container" ></div></td>
                </tr>
            </tbody>
           
            </template>
        </v-simple-table>
            <v-card v-if="!Object.keys(carrito).length" class="text-center" elevation="0"  min-height="63.4vh" color="transparent">
                <v-card-text>
                    <div class="text-h5">Carrito Vacio</div>
                </v-card-text>
            </v-card>
    </v-container>
        <v-card v-if="successCheckout" class="elevation-0" color="transparent" height="90vh" >
                  <v-row justify="center" class="text-center pt-10" >
                      <v-icon color="green" size="200">
                          mdi-check-circle-outline
                      </v-icon>
                      <v-card-text class="text-h4 text-success">
                        Gracias!
                      </v-card-text>
                      <v-card-text class="text-h6">
                        Tu compra ha sido realizada con exito.
                      </v-card-text>
                      <v-btn color="#000000" class="white--text" @click="$router.push({name:'main'})" >
                        Ir a Inicio
                      </v-btn>
                  </v-row>
     </v-card>
</div>
</template>

<script>
import {  mapActions, mapGetters, mapState } from 'vuex';
export default {
    name: 'carrito-main',
    data(){
        return {
            desserts: [
            {
                name: 'Frozen Yogurt',
                cantidad: 159,
                precio: 120
            },
            {
                name: 'Ice cream sandwich',
                cantidad: 237,
                precio: 120
            },
            {
                name: 'Eclair',
                cantidad: 262,
                precio: 120
            },
            ],
            cantidad: 0,
            rules:[
                value => (value <= 10) || 'Max 10'
            ],
            idPreference: '',
            successCheckout: false
        }
    },
    methods:{
        ...mapActions('main', ['pay','decrementcart', 'increment', 'paymentStatus']),
        async validateCantidad( item ){
           if(item.cantidad <= 10){
                this.increment(item)
                window.location.reload()
           } 
        },
        async payAction( ){
            
            const { id } = await this.pay( this.carrito )

            this.idPreference = id
            
        },
        setLoaded(){

           const mp =  new window.MercadoPago('TEST-0e1908d5-9c20-4ebd-86a3-424e06229574',{
                locale: "es-PE",
           })

           const checkout = mp.checkout({
                preference: {
                    id: `${this.idPreference}`,
                },
            })


           checkout.render({
            container: ".cho-container",
            label: "Pagar",
           });
            
        },
        createScriptMercadoPago(){
            const script = document.createElement("script")
            script.src = "https://sdk.mercadopago.com/js/v2"
            script.addEventListener("load", this.setLoaded)
            document.body.appendChild( script )
        },
        decrementCart( id ){

            this.decrementcart( id )
            window.location.reload()
        },
        async checkPayment( status, payment_id ){

            if(!status && !payment_id) return 
            
            if(status === 'approved'){

               const { ok } = await this.paymentStatus( payment_id )

                if(!ok) return 
                this.$router.push({name: 'carrito'}) 
            }
        }

    },
    computed:{
        ...mapState('main', ['carrito']),
        ...mapGetters('main', ['filtercarrito', 'Total']),
        carrito(){
            return this.filtercarrito
        },
        cart(){
            return this.carrito
        }
        
    },
    async created(){
        await  this.payAction()

        this.createScriptMercadoPago()

        this.checkPayment( this.$route.query.status, this.$route.query.payment_id )
    },

}
</script>

<style scoped>
</style>


