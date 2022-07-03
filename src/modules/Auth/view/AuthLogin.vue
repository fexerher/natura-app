<template>
    <v-main  class="fondo" app>

          <v-container class="mt-10" >
            <v-card color="transparent" elevation="0" max-width="500px" class="mx-auto" >
               <v-card-text  class="pb-0 font-weight-medium text-h2 success--text text-center">Bienvenido!</v-card-text>
               <v-card-text  class="pt-0 text-h6 success--text text-center">Santa Natura <span class="subtitle-1" >Huaycan</span> </v-card-text>
            </v-card >
            <v-card  max-width="500px"  elevation="10" class="pa-10 mx-auto"  >
              <div class="text-center">
                <v-icon  size="100" color="success"  >mdi-account</v-icon>
              </div>

             <v-form v-model="valid" @submit.prevent="logIn"  ref="form" >
                <v-text-field 
                  color="dark" 
                  :rules="emailRules" 
                  @focus="isMensaje = false"  
                  v-model="form.email" 
                  label="email" 
                  outlined  
                  required
                >
                </v-text-field>
                <v-text-field 
                  color="dark" 
                  :rules="nameRules" 
                  @focus="isMensaje = false"  
                  type="password" 
                  v-model="form.password" 
                  label="password" 
                  required 
                  outlined >
                </v-text-field>
                 <v-alert
                    v-if="isMensaje"
                    color="red"
                    elevation="2"
                    type="error"
                  > {{mensaje}} </v-alert>
                <v-btn type="submit" :loading="loading"  :disabled="!valid || loading" class="white--text" color="black" block elevation="0" >
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
        loading: false,
        isMensaje: false,
        mensaje: 'Error en el mensaje',
        form: { 
            "email": "",
            "password": ""
        },
        valid: false,
         nameRules: [
          v => !!v || 'Password is obligatorio',
          v => v.length >= 6 || 'Name must be more than 6 characters',
        ],
        emailRules: [
          v => !!v || 'E-mail es obligatorio',
          v => /.+@.+\..+/.test(v) || 'E-mail debe de ser valido',
        ],
      }
    },
    methods:{
      ...mapActions( 'auth',  ['singInUser'] ),
      async logIn(  ){
         this.loading = true

         const { ok } = await this.singInUser(this.form);
         if( !ok ) {
          this.loading = false
          this.isMensaje = true
          this.mensaje = 'Usuario / Password incorrectos'
          return
         }
         this.isMensaje = false
         this.mensaje = ''
         this.$router.push({ name: 'dashboard'})
         this.loading = false

      },
      validate () {
         this.$refs.form.validate()
      },

    }
}
</script>

<style scoped>

  .fondo{
    background: #e9edf2;
  }
  .fondo::-webkit-scrollbar {
    display: none;
    }
</style>