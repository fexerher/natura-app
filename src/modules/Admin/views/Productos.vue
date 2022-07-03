<template>
  <div>
    <v-data-table
      item-key="name"
      :headers="headers"
      :items="desserts"
      :search="search"
      locale="es-pe"
      class="elevation-2"
      style="max-width: 1200px; margin: 0 auto"
    >    
     <template v-slot:[`item.img`]="{ item }"  >

      <v-img v-if="pictureModal" alt="..." width="50" 
      :src="this.pictureModal">
      </v-img>
      <v-img v-else :src="item.img"  width="50" >

      </v-img>
      </template>
        <template v-slot:top>
            <v-toolbar
              flat
            >
              <h3  class="pr-1 text-start text-capitalize"  >{{$route.name}}</h3>
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
                <v-card-title>
                  <span class="text-h5">{{formTitle}}</span>
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
                          label="Nombre"
                          
                        ></v-text-field>
                      </v-col>
                     
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.precio"
                          label="Precio"
                          
                        ></v-text-field>
                      </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.stock"
                            label="Stock"
                            
                          ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                        >
                          <v-text-field
                            v-model="editedItem.idcategoria"
                            label="Categoria"
                            
                          ></v-text-field>
                        </v-col>
                          <v-col
                          cols="12"
                          sm="6"
                          md="8"
                        >
                          <v-file-input
                             @change="onFileSelected"
                            v-model="editedItem.imagen"
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="Pick an avatar"
                            prepend-icon="mdi-camera"
                            label="Imagen Producto"
                          ></v-file-input>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="12"
                          >
                            <v-textarea
                              outlined
                              v-model="editedItem.descripcion"
                              label="Descripción"
                              
                            ></v-textarea>
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
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">Está seguro de eliminar este producto?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" @click="closeDelete" text >Cancel</v-btn>
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
          <v-icon
            medium
            color="red"
            class="mr-2"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'productos-main',
    data(){
      return {
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
            {
              text: 'Descripcion',
              align: 'start',
              value: 'descripcion',
            },
            {
              text: 'Precio',
              align: 'start',
              value: 'precio',
            },
            {
              text: 'Stock',
              align: 'start',
              value: 'stock',
            },
            {
              text: 'Categoria',
              align: 'start',
              value: 'idcategoria',
            },
            {
              text: 'Imagen',
              align: 'start',
              value: 'img',
            },
            { text: 'Actions', value: 'actions'},
          ],
          editedIndex: -1,
          editedItem: {
            nombre: '',
            descripcion: '',
            precio: '',
            stock: '',
            idcategoria: '',
            imagen: [],
            id: ''
          },
          defaultItem: {
            nombre: '',
          },
          pictureModal: null,
          selectedFile: null,
      }
    },
    computed:{
      ...mapGetters('admin', ['filterProductos']),
      desserts(){
        return this.filterProductos
      },
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Producto' : 'Editar Producto'
      },
    },
    watch:{
      dialog( val ){
        val || this.close()
      },
      dialogDelete( val ){
        val || this.closeDelete()
      }
    },
    methods:{
      getProductos(){
        this.getproductos()
      },
      onFileSelected() {
        this.selectedFile = this.file;

        if (!this.file) {
          return;
        }
        const fr = new FileReader();
        fr.onload = () => (this.pictureModal = fr.result);
        fr.readAsDataURL(this.selectedFile);
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
        this.deleteproducto( this.editedItem.id )
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
        
          const { ok } =  await this.editarImagen(this.editedItem )

          if(!ok){
            console.log('error');
          }else{
            console.log('registrado correctamente ');
           Object.assign(this.desserts[this.editedIndex], this.editedItem)

          }
        } else {

          const {ok} = await this.saveproducto( this.editedItem )
          if(!ok){
            console.log('error');
          }else{
            console.log('registrado');

          }
        }
        this.close()
      },
      ...mapActions('admin',['getproductos', 'saveproducto' , 'editarImagen', 'deleteproducto']),
    },
    created(){
      this.getProductos()
    }
}
</script>

<style>

</style>