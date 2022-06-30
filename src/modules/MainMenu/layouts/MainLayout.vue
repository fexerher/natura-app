
<template>
  <div>
    <Navbar />
    <v-main app>
          <router-view></router-view>
    </v-main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
export default {
    name: 'main-layout',
    components: {
        Navbar,
        Footer
    },
}
</script>

<style>

</style>