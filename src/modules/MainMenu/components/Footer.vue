<template>
 <v-footer
    color="green"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
        <v-btn
          v-for="(icon, index) in icons"
          :key="index"
          color="white"
          text
          rounded
          class="my-2"
          :href="icon.link"
          target="_blank"
        >
          <v-icon left>
            {{ icon.name }}
          </v-icon>
          {{icon.contacto}}
        </v-btn>
      <v-col
        class="green py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
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
            { name: 'Inicio', to: 'main'},
            { name: 'Nosotros', to: 'nosotros'},
            { name: 'Contacto', to: 'contacto'}
        ],
        icons: [
          { name: 'mdi-whatsapp', contacto: '995985287'},
          {name: 'mdi-facebook', contacto: '' , link: 'https://www.facebook.com/SantaNaturaHuaycan/'},
      ],
      }
  }
}   
</script>