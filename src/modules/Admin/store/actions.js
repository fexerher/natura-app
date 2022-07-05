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

export const saveproducto = async ( {commit},  payload  ) => {
    
    
     try {
            const {  img, stock, descripcion , precio, idcategoria, nombre } = payload 

            const formData = new FormData()
            formData.append('archivo', img)
            formData.append('stock', stock)
            formData.append('descripcion', descripcion)
            formData.append('nombre', nombre)
            formData.append('idcategoria', idcategoria)
            formData.append('precio', precio)



    const resp =  await  apiServer.post('/productos', formData )
          
     console.log( resp );

    commit('saveproducto',  resp.data )
       
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


export const editarImagen = async ( {commit}  ,  payload ) => {

    
    try {
        
        const { imagen, id }  = payload

        const formData = new FormData()

        formData.append('archivo', imagen)

        
        const data =  await apiServer.put(`/uploads/productos/${id}`, formData)



       commit('updateImagen', data.data )
       
       return {ok: true }

   } catch (error) {
        return {ok: false }
   }

}

export const editarproducto = async ( {commit}, payload ) => {

    try {
        
        const resp = await  apiServer.put(`/productos/${payload.id}`, payload )
    

        commit('editarproducto', resp.data )

        return { ok: true }
    } catch (error) {
        return { ok: false }
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

export const ventasGet = async ({commit}) => {
    try {
        const { data } = await apiServer.get('/ventas')
        const { rows, count } = data

        commit('setventas', { rows, count } )
    } catch (error) {
        throw new Error( error )
    }
}