<template>
<div >
 
  <v-data-table
  
    :headers="headers"
    :items="desserts"
    :search="search"
    locale="es-pe"
    class="elevation-2"
    style="max-width: 1200px; margin: 0 auto"
  >          
                
  <!-- <template v-slot:[`item.image`]="{ item }">
            <div class="p-2">
              <v-img :src="item.image" :alt="item.name" height="100px"></v-img>
            </div>
    </template> -->
    <template v-slot:top>
      <v-toolbar
        flat
      >
       <h3 class="text-start text-capitalize">{{$route.name}}</h3>
        <v-spacer></v-spacer>

         <v-text-field
         class="mx-2"
         color="secondary"
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
            clearable
          ></v-text-field>
          <v-divider
          class="mx-1"
          inset
          vertical
        ></v-divider>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="blue"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Registrar
            </v-btn>
          </template>
          <v-card>
            <v-form  v-model="valid"  @submit.prevent="save" ref="form" >
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.nombre"
                      label="nombre"
                      :rules="categoriaRules"
                    ></v-text-field>
                  </v-col>
                 
                 
                 
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                :disabled="!valid "
              >
                Save
              </v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Está seguro de eliminar este producto?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        medium
        color="orange"
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'categoria-admin',
    data: () => ({
      valid: false,
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Id',
          align: 'start',
          value: 'id',
        },
        {
          text: 'Nombre',
          align: 'start',
          value: 'nombre',
        },
        {
          text: 'Creado',
          align: 'start',
          value: 'creado',
        },
        { text: 'Actions', value: 'actions'},
      ],
      editedIndex: -1,
      editedItem: {
        nombre: '',
      },
      defaultItem: {
        nombre: '',
      },
      categoriaRules:[
         v => !!v || 'Categoria is obligatorio',
         v => /^[A-Za-z]+$/.test(v) || 'Carecteres incorrectos',
      ]
    }),

    computed: {
      ...mapGetters('admin', [ 'filterCategorias' ] ),
      formTitle () {
        return this.editedIndex === -1 ? 'Nueva Categoría' : 'Editar Categoría'
      },
      desserts(){
        return this.filterCategorias
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      ...mapActions( 'admin', ['getcategorias', 'savecategoria', 'editarcategoria'] ),
       getColor (calories) {
        if (calories > 400) return 'red'
        else if (calories > 200) return 'orange'
        else return 'green'
      },
      initialize () {
        this.getcategorias()
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        if (this.editedIndex > -1) {
          const data = {
            id: this.editedItem.id,
            nombre: this.editedItem.nombre
          }
          const { ok } = await this.editarcategoria( data )
          if(!ok) return
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          const { ok } = await this.savecategoria( this.editedItem.nombre )
          if( ok ){
            
            console.log('registrado correctament');
          }else{
            console.log('no registrado');
          }

        }
        this.close()
      },
    },
  }
</script>

<style>

</style>