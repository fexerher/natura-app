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

        const fecha = moment(e.createdAt).format('DD-MM-YYYY')

        return { nombre: e.nombre, id: e.id , creado: fecha, ...e }


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