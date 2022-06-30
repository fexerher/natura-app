<template>
  <v-container>
    <div class="contenedor-imagenes">

        <v-img justify="center" src="@/assets/img/foto-2-nosotros.png"   height="800px">

        </v-img>
        <v-img justify="center" src="@/assets/img/foto-nosotros.png"  height="800px">

        </v-img>
      
    </div>
    
  </v-container>
</template>

<script>
export default {
    name: 'nosotros-main'
}
</script>

<style scoped>
  .contenedor-imagenes{
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 20px;
  }
  @media screen and (max-width: 956px) {
    .contenedor-imagenes{
      display: grid;
      grid-template-columns: 100% ;
    }
  }
  @media (min-width: 1904px){
    .container {
        max-width: 1185px; 
    }
  }
</style>