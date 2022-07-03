<template>
  <div>
     <v-simple-table >
       <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Buscar"
          class="mx-4"
        ></v-text-field>
      </template>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Nombre
          </th>
           <th class="text-left">
            Precio
          </th>
           <th class="text-left">
            Stock
          </th>
          <th class="text-left">
            Descripcion
          </th>
           <th class="text-left">
            Imagen
          </th>
          <th class="text-left">
            Categoria
          </th>
          <th class="text-left">
            Aciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          style="cursor: pointer"
          v-for="item in productos"
          :key="item.id"
        >
          <td>{{ item.id }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.precio }}</td>
          <td>{{ item.stock }}</td>
          <td>{{ item.descripcion }}</td>
          <td> <v-img width="50px" :src="item.img"></v-img></td>
          <td>{{ item.idcategoria }}</td>
          <td>
            <v-menu
              bottom
              left
              transition="scale-transition"
            >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>

            <!--Modal-->
        <!--ListActions-->
            <v-list>
              <v-list-item
                v-for="(opt, index) in opciones"
                :key="index"
                link
                @click="option({ id:item.id , nombre:opt.name})"
              >
                <v-list-item-title class="py-0"  >{{ opt.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          
          <v-dialog @click:outside="onCancel" v-model="modalImage" max-width="490">
                <v-card class="p-2">
                  <div class="d-flex flex-column justify-center align-center pt-5">
                    <v-avatar size="140">
                      <v-img v-if="pictureModal"  alt="..." :src="pictureModal">
                      </v-img>
                      <v-img 
                      v-else alt="..." :src="item.img"> </v-img> 
                    </v-avatar>
                  </div>

                  <template>
                    <v-file-input
                      label="Buscar Imagen"
                      v-model="file"
                      type="file"
                      @change="onFileSelected"
                      class="px-1"
                      prepend-icon="mdi-camera"
                      accept="image/*"
                    ></v-file-input>
                  </template>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="red darken-1" outlined @click="onCancel">
                      Cancelar
                    </v-btn>

                    <v-btn
                      color="success"
                      outlined
                      @click="save"
                    >
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          </td>

        </tr>
      </tbody>
    </template>



  </v-simple-table>




  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'ComprasMain',
    data(){
        return {
           selectedFile: null,
           file:null,
           modalImage: false,
           pictureModal: null,
           mostrar: null,
           dialog: true,
           search: '',
           opciones: [
              {name: 'Eliminar'},
              {name: 'Editar'},
              {name: 'Registrar'},
           ],
          editedItem:{ 
            
          },
          editedIndex: -1
        }
    },
    computed:{
      ...mapGetters('admin', ['filterProductos']),
      productos(){
        return this.filterProductos
      },
      formTitle(){
        return this.editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro'
      }
    },
    methods:{
      ...mapActions( 'admin', ['getproductos', 'saveproducto' , 'editarImagen', 'deleteproducto'] ),
      close(){
        this.dialog = false
      },
      save(){
        console.log('guardar', this.file);
       
      },
      async getProductos(){
        await this.getproductos()
      },
      option(  ){
        this.modalImage = true
      },
      editarImg() {
        this.mostrar = !this.mostrar;
      },
        onCancel() {
          this.pictureModal = null;
          this.modalImage = false;
          this.file = null;
        },
        onFileSelected() {
        this.selectedFile = this.file;

        if (!this.file) {
          return;
        }
        const fr = new FileReader();
        fr.onload = () => (this.pictureModal = fr.result);
        fr.readAsDataURL(this.selectedFile);
        console.log(this.selectedFile);
      },
      onUpload() {
        if (this.selectedFile != null) {

          const fd = new FormData();
          fd.append("user-photo", this.selectedFile, this.selectedFile.name);

        }
      }
    },
    created(){
      this.getProductos()
    }
}
</script>

<style scoped>

  .header{
    display: grid;
    grid-template-columns: repeat( 3 , 1fr );
  }
  .body{
    display: grid;
    grid-template-columns: repeat( 3 , 1fr );
  }

</style>