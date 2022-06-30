

export const filterproductos = ( state ) => {
   return state.productos
}


export const filtercarrito = ( state ) => {
   return state.carrito
} 

export const Total = (state) => {

   return Object.values( state.carrito ).reduce(( acc , {cantidad, precio} )=> acc + cantidad * precio, 0)



}