import apiServer from "@/api/apiServer"



export const singInUser = async ( { commit } , payload ) => {

        try {
            const {  data   } = await apiServer.post('/auth/login', payload )

            const { access_token , role , user } = data.data

            commit('signInUser', { access_token , role , user } )

            return { ok : true }
            
        } catch (error) {

            return { ok: false }

        }


}

