
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
