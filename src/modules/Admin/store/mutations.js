
export const setCategorias = (state, { rows, count }) => {
    state.cantCategorias = count
    
    state.categorias = rows


}



export const savecategoria = (state, payload) => {

    state.categorias = [ payload, ...state.categorias]


}

export const editarcategoria = (state, payload) => {
   
    const idx = state.categorias.map( cat => cat.id ).indexOf(payload.id)
    state.categorias[idx] = payload 
}


export const setproductos = (state, { rows, count }) => {
    
    state.cantProductos = count
    state.productos = rows
}

export const saveproducto = (state, payload) => {
    
    state.productos = [ payload, ...state.productos]
    
    
}


export const setusuarios = (state, { rows}) => {
    
    state.usuarios = rows
}


export const saveusuarios = (state, payload) => {
    
    state.usuarios = [ payload, ...state.usuarios]
    
    
}
export const editarusuario = (state, payload) => {
   
    const idx = state.usuarios.map( cat => cat.id ).indexOf(payload.id)
    state.usuarios[idx] = payload 
}

export const deleteusuario = (state, payload) => {
   
    state.usuarios = state.usuarios.find(( e )=> e.id != payload.id )
}

export const updateImagen  = ( state, producto  ) => {
    const idx = state.productos.map( cat => cat.id ).indexOf( producto.id )
    
    state.productos[idx] = producto
    
}
export const deleteproducto = (state, payload) => {
   
    state.productos =  state.productos.filter( ( e ) =>  e.id !== payload.id )

}