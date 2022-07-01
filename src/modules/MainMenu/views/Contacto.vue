<template>
  <v-container style="height: 729px" >

      <h1>Contactanos</h1>
      <v-card>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
          <v-container>
            <v-row>
              <v-col cols="12" sm="3" >
                <v-text-field
                  v-model="name"
                  :rules="nameRules"
                  label="Name"
                  required
                ></v-text-field>

              </v-col>
                <v-col cols="12" sm="3" >
               
                  <v-text-field
                    v-model="apellido"
                    :rules="apellidoRules"
                    label="Apellido"
                    required
                  ></v-text-field>

              </v-col>
            </v-row>
            <v-row >
              <v-col cols="12" sm="6" >
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
              </v-col>

            </v-row>


            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="Do you agree?"
              required
            ></v-checkbox>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Validate
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
              @click="reset"
            >
              Reset Form
            </v-btn>

            <v-btn
              color="warning"
              @click="resetValidation"
            >
              Reset Validation
            </v-btn>
          </v-container>
          </v-form>
      </v-card>

  </v-container>
</template>

<script>
export default {
    name: 'contacto-main',
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
        apellidoRules: [
        v => !!v || 'Apellido is required',
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
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
}
</script>

<style>

</style>