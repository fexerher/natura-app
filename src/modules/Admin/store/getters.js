import moment  from "moment"

export const filterCategorias = ( state ) => {

    const categorias = state.categorias.map(( e ) => {

        const fecha = moment(e.createdAt).format('DD-MM-YYYY')

        return { nombre: e.nombre, id: e.id , creado: fecha }


    })

    return categorias


}