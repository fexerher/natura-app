import apiServer from "@/api/apiServer"



export const singInUser = async ( { commit }, payload ) => {

        try {
            const {  data   } = await apiServer.post('/auth/login', payload )

            const { token , usuario } = data

            // const { access_token , rol , user } = data.data

            commit('signInUser', { token , usuario } )

            return { ok : true }
            
        } catch (error) {

            return { ok: false }

        }


}

export const checkAuthentication = async ({commit}) => {
    
    const token =  localStorage.getItem('x-token')
    if(!token){
        commit('logout')
        return {ok : false , message: 'no hay token'}
    }
    
    try {
        const {  data   } = await apiServer.post('/auth/lookup', {token})
        const { usuario } = data
        
        const { rol } = usuario
        
        commit('signInUser', { token , usuario } )

        return { ok: true, rol }
        
    } catch (error) {
        commit('logout')
        return {ok:false}
        
    }

} 
