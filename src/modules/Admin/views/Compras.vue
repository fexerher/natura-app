<template>
  <div>
    <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="desserts"
          :search="search"
        ></v-data-table>
      </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'ComprasMain',
    data(){
        return {
          search: '',
          headers: [
            { text: 'Id', value: 'id' },
            { text: 'Email', value: 'email' },
            { text: 'Monto', value: 'monto' },
            { text: 'Fecha', value: 'creado' },
            { text: 'Orden', value: 'orden' },
          ]
        }
    },
    methods:{
      ...mapActions('admin', ['ventasGet']),
      getVentas(){
          this.ventasGet()
      }
    },
    computed:{
       ...mapGetters('admin', ['filterVentas']),
      desserts(){
        return this.filterVentas
      }
    },
    created(){
      this.getVentas()
    }
}
</script>

<style scoped>



</style>