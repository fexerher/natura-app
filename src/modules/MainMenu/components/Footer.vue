<template>
     <v-footer
          class="mt-5"
          color="#2c9f32"
          padless
        >
          <v-row
            justify="center"
            no-gutters
          >
            <v-btn
              v-for="(link, index) in links"
              :key="index"
              color="white"
              text
              rounded
              class="my-2"
            >
              {{ link.name }}
            </v-btn>
            <v-col
              class="py-4 text-center white--text"
              cols="12"
            >
              {{ new Date().getFullYear() }} — <strong>Santa Natura</strong>
            </v-col>
          </v-row>
        </v-footer>
</template>

<script>
export default {
    name: 'main-footer',
    data(){
      return {
        links: [
            { name: 'Home', to: ''},
            { name: 'About Us', to: ''},
            { name: 'Contact Us', to: ''}
        ],
      }
  }
}   
</script>