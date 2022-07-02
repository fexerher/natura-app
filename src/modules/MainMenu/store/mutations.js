
export const setproductos = ( state , { rows, count }) => {
    state.cantidad = count
    state.productos = rows
    
}


export const addcart = ( state , payload ) => {
    const productos = Object.assign({}, state.carrito)
    productos[payload.id] = {...payload}
    state.carrito = productos
}

export const loadcart = ( state ) => {


    state.carrito = JSON.parse(localStorage.getItem('xcstrd')) || {}


}

export const decrementcart = (state, id ) => {
    const users = Object.assign({}, state.carrito);
    delete users[id];
    state.carrito = users
}


export const increment = (state, { cantidad , id }) => {

    const users = Object.assign({}, state.carrito);

    users[id].cantidad = cantidad

    state.carrito = users


}

export const paymentStatus = ( state ) => {

    localStorage.removeItem('xcstrd')
    state.carrito = {}

}