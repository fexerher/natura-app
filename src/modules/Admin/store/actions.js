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
        console.log(data);
        const { rows, count } = data

       commit('setproductos', { rows , count })
        
    } catch (error) {
        throw new Error(error)
    }


}

export const saveproducto = async ( { commit },  payload  ) => {
    
    try {
       const { data } = await apiServer.post('/productos', payload )


      commit('saveproducto', data )
       
       return {ok: true }

   } catch (error) {
       console.log(error);
       return {ok: false}
   }

}

export const getusuarios = async ({commit}  ) => {
    try {
        const { data } = await apiServer.get('/usuarios')
        console.log(data);
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