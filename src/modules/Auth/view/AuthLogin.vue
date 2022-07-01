<template>
    <v-main app>
          <v-container  >

            <v-card max-width="700px" style="margin: 0 auto" class="pa-5" >

             <h1>Login</h1>
             <v-form >
                <v-text-field v-model="form.email" label="email" >

                </v-text-field>
                <v-text-field type="password" v-model="form.password" label="password" >

                </v-text-field>
                <v-btn color="primary" @click.prevent="logIn"  >
                  Sign In
                </v-btn>
             </v-form>
            </v-card>
          </v-container>
      </v-main>
  
</template>

<script>
import { mapActions } from 'vuex';
export default {
    data(){
      return {
        form: { 
            "email": "",
            "password": ""
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