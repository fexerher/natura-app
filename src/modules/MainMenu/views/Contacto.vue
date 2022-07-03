<template>
<div style="height: 715px" >

  <v-container class="mt-10" >

      <v-card style="margin: 0 auto" width="750px" height="100%" class="text-center pa-5" >
      <h1>Contáctanos</h1>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            
          >
          <v-container >
            <v-row>
              <v-col >
                <v-text-field
                  color="dark"
                  v-model="form.nombre"
                  :rules="nameRules"
                  label="Name"
                  required
                ></v-text-field>

              </v-col>
                <v-col>
                  <v-text-field
                    color="dark"
                    v-model="form.apellido"
                    :rules="apellidoRules"
                    label="Apellido"
                    required
                  ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                  <v-text-field
                  color="dark"
                    v-model="form.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                   <v-textarea
                     color="dark"
                    v-model="form.mensaje"
                    :rules="mensajeRules"
                    label="Escribenos algo"
                    required
                  ></v-textarea>
              </v-col>
            </v-row>
            <v-checkbox
            color="dark"
              v-model="checkbox"
              :rules="[v => !!v || 'Debes estar de acuerdo!']"
              label="Do you agree?"
              required
              class="mb-4"
            ></v-checkbox>

              <v-btn
                :disabled="!valid"
                block
                color="#000"
                class="mr-4 white--text"
                @click="validate"
              >
                Enviar
              </v-btn>
          </v-container>
          </v-form>
      </v-card>

  </v-container>
  </div>
</template>

<script>
export default {
  name: 'contacto-main',
    data: () => ({
      form: {
        nombre: '',
        apellido: '',
        mensaje: '',
        email:''
      },
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Nombre es obligatorio',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail es obligatorio',
        v => /.+@.+\..+/.test(v) || 'Debe ingresar un e-mail valido',
      ],
        apellidoRules: [
        v => !!v || 'Apellido es obligatorio',
      ],
      mensajeRules: [
        v => !!v || 'Mensaje es obligatorio',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
    },
}
</script>

<style>

</style>