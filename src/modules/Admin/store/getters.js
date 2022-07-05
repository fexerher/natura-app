import moment  from "moment"

export const filterCategorias = ( state ) => {

    const categorias = state.categorias.map(( e ) => {

        const fecha = moment(e.createdAt).format('DD-MM-YYYY')

        return { nombre: e.nombre, id: e.id , creado: fecha }


    })

    return categorias


}

export const filterProductos = ( state ) => {
    if(!state.productos)return

    const productos = state.productos.map(( e ) => {

        const file = new File(['img'],  e.img )
        
        const formCat = state.categorias.find( ( cat ) => cat.id === e.idcategoria )


        const fecha = moment(e.createdAt).format('DD-MM-YYYY')
        
        return { 
            nombre: e.nombre,
            img: file, id: e.id ,
            creado: fecha, 
            descripcion : e.descripcion ,
            precio: e.precio, 
            stock: e.stock,
            idcategoria: e.idcategoria, 
            nombreCat: formCat?.nombre, 
            imagen: e.img }
    })

    return productos


}


export const filterUsuarios = ( state ) => {

    const usuarios = state.usuarios.map(( e ) => {

        const fecha = moment(e.createdAt).format('DD-MM-YYYY')

        return { nombre: e.nombre, id: e.id , creado: fecha, ...e }


    })

    return usuarios


}

export const categoriasSelect = ( state ) => {
    const categorias = state.categorias.map(( e ) => {
        return { nombre: e.nombre, id: e.id  }
    })
    return categorias
}


export const filterVentas = ( state ) => {

    const ventas = state.ventas.map(( e ) => {

        const fecha = moment(e.createdAt).format('DD-MM-YYYY')

        return {  id: e.id , creado: fecha, monto: e.monto, orden: e.orden, email: e.email }


    })

    return ventas


}

export const getUsers = ( state ) => {
    
    return state.cantUsuarios


}


export const getVentas = ( state ) => {
    
    return state.cantVentas


}

export const getTotal = ( state ) => {

    
    return state.ventas.reduce(( acc , { monto } ) => acc + monto , 0)

}