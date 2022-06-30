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