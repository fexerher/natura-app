import apiServer from "@/api/apiServer";

export const getcategorias = async ({commit}  ) => {
    try {
        const { data } = await apiServer.get('/categorias')

        const { rows, count } = data

       commit('setCategorias', { rows , count })
        
    } catch (error) {
        throw new Error(error)
    }


}
export const savecategoria = async ( {commit}, nombre  ) => {
   
     try {
        const { data } = await apiServer.post('/categorias', { nombre })


        commit('savecategoria', data )
        
        return {ok: true }

    } catch (error) {
        console.log(error);
        return {ok: false}
    }

}

export const editarcategoria = async ( {commit}, {id, nombre} ) => {
   
    try {
       const { data } = await apiServer.put(`/categorias/${id}`, {nombre} )

       
       commit('editarcategoria', data )
       
       return {ok: true }

   } catch (error) {
       console.log(error);
       return {ok: false}
   }

}


/******************* Productos *********************************/
export const getproductos = async ({commit}  ) => {
    try {
        const { data } = await apiServer.get('/productos')
        
        const { rows, count } = data

       commit('setproductos', { rows , count })
        
    } catch (error) {
        throw new Error(error)
    }


}

export const saveproducto = async ( {commit},  { idcategoria, descripcion , nombre, imagen, precio , stock  }  ) => {
    
    const producto = { idcategoria, descripcion , nombre,  precio , stock  }
    

    try {

        const formData = new FormData()
        formData.append('archivo', imagen )


       const { data } =  await  apiServer.post('/productos', producto )
          
        
       const  resp  = await  apiServer.put(`/uploads/productos/${data.id}`, formData)
        
       const { img }  = resp.data 

      const payload = {
        ...data,
        img
      }


      commit('saveproducto', payload )
       
       return {ok: true }

   } catch (error) {
       console.log(error);
       return {ok: false}
   }

}

export const getusuarios = async ({commit}  ) => {
    try {
        const { data } = await apiServer.get('/usuarios')
      
        const { rows, count } = data

       commit('setusuarios', { rows , count })
        
    } catch (error) {
        throw new Error(error)
    }


}

export const saveusuarios = async ( { commit },  payload  ) => {
    
    try {
       const { data } = await apiServer.post('/usuarios', payload )


      commit('saveusuarios', data )
       
       return {ok: true }

   } catch (error) {
       console.log(error);
       return {ok: false}
   }

}


export const editarusuario = async ( {commit}, payload ) => {
    try {
        console.log(payload);
       const { data } = await apiServer.put(`/usuarios/${payload.id}`, payload )

       
       commit('editarusuario', data )
       
       return {ok: true }

   } catch (error) {
       console.log(error);
       return {ok: false}
   }

}

export const deleteusuario = async ( {commit}, payload ) => {
    try {
       const { data } = await apiServer.delete(`/usuarios/${payload.id}`)

       
       commit('deleteusuario', data )
       
       return {ok: true }

   } catch (error) {
       console.log(error);
       return {ok: false}
   }

}


export const editarImagen = async ( {commit},  payload ) => {

    const { imagen, id }  = payload
    console.log( payload );
    if(!imagen) return 
    
    try {

        const formData = new FormData()
        formData.append('archivo', imagen)
       
        
        const promiseArr = [
            apiServer.put(`/uploads/productos/${id}`, formData),
            apiServer.put(`/productos/${id}`, payload )
         ]

        const [ respuestas, respuestas2 ] = await Promise.all( promiseArr )
       const producto = {
         ...respuestas.data,
         ...respuestas2.data,
       }
       console.log( producto );

       commit('updateImagen', producto )
       
       return {ok: true }

   } catch (error) {
        return {ok: false }
   }

}



export const deleteproducto = async ( {commit}, id ) => {
    try {
       const resp = await apiServer.delete(`/productos/${id}`)

       const { producto } = resp.data

       commit('deleteproducto', producto.id)
       
       return {ok: true }

   } catch (error) {
       console.log(error);
       return {ok: false}
   }

}