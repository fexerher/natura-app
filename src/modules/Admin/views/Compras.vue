<template>
  <div>
     <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Monto
          </th>
           <th class="text-left">
            Creado
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          style="cursor: pointer"
          v-for="item in 10"
          :key="item"
        >
          <td>{{ item }}</td>
          <td>{{ item }}</td>
          <td>{{ item }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>

<script>
export default {
    name: 'ComprasMain',
    data(){
        return {
           
        }
    },
    methods:{
      
    }
}
</script>

<style scoped>

  .header{
    display: grid;
    grid-template-columns: repeat( 3 , 1fr );
  }
  .body{
    display: grid;
    grid-template-columns: repeat( 3 , 1fr );
  }

</style>