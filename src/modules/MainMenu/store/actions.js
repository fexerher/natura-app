import apiServer from "@/api/apiServer"



export const obtenerproductos = async ( {commit} ) => {


    try {

        const { data } = await apiServer.get('/productos')



        commit('setproductos', data)

    } catch (error) {
        throw new Error(error)
    }


}

export const addcart =  ({ commit, state }, payload) => {

        state.carrito.hasOwnProperty.call(payload.id) ? payload.cantidad = state.carrito[payload.id].cantidad + 1 : payload.cantidad = 1

        let carrito = {}
    
        carrito = JSON.parse( localStorage.getItem('xcstrd')) || {}
    
        carrito[payload.id] = { ...payload }
    
        localStorage.setItem( 'xcstrd', JSON.stringify(carrito))
    
        commit('addcart', payload )
     

}

export const loadcart = ({commit}) => {
    commit('loadcart')
}

export const pay = async (_ , carrito ) => {

    try {
        if(Object.keys(carrito).length === 0) return 
    
         const cart =  Object.values( carrito ).map((e) => {
            return { title: e.nombre, quantity: +e.cantidad , description: e.descripcion, unit_price: e.precio }
         })
         
         const productos = {
            productos:[
                ...cart
            ]
         }
       const {data} = await apiServer.post('/pay', productos )
       
       const { id } = data.response

       return { ok:true , id }
    } catch (error) {
        return { ok: false  }
    }


}


export const decrementcart =   ({commit}, id ) => {
    
    const carrito = JSON.parse( localStorage.getItem('xcstrd')) || {}
    
    delete carrito[id]

    localStorage.setItem( 'xcstrd', JSON.stringify(carrito))

    commit('decrementcart', id)

}

export const increment =   ({commit}, payload ) => {
    

    let carrito = {}

    carrito = JSON.parse( localStorage.getItem('xcstrd')) || {}

    carrito[payload.id] = { ...payload }

    localStorage.setItem( 'xcstrd', JSON.stringify(carrito))

    commit('increment', payload)

}


export const paymentStatus = async ( { commit } , id ) => {

    try {
          const  datos  = await apiServer.get(`/pay/notificacion/${id}`)
          const { status } = datos

          if( status === 200 ){
                commit('paymentStatus')

                return {ok:true, datos}
          }

    } catch (error) {

        return {ok: false}

    }
  


}
