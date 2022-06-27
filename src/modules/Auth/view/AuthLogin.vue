<template>
    <v-main app>
          <v-container>
             <h1>Login</h1>
             <v-form >
                <v-text-field v-model="form.username" >

                </v-text-field>
                <v-text-field type="password" v-model="form.password" >

                </v-text-field>
                <v-btn color="primary" @click.prevent="logIn"  >
                  Sign In
                </v-btn>
             </v-form>
          </v-container>
      </v-main>
  
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
      return {
        form: {
          username: 'admin',
          password: 'secret'
        }
      }
    },
    methods:{
      ...mapActions( 'auth',  ['singInUser'] ),
      async logIn(  ){
         const {ok} = await this.singInUser(this.form);
         if(!ok) return
         this.$router.push({ name: 'dashboard'})
      }
    }
}
</script>

<style>

</style>