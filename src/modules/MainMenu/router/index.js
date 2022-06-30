


const mainRouter = {
    redirect: 'inicio',
    component: () => import('../layouts/MainLayout.vue') ,
    children: [
        { 
            path: '/inicio' , 
            name: 'main', 
            component: () => import('../views/Main.vue') 
        },
        { 
            path: '/nosotros' , 
            name: 'nosotros', 
            component: () => import('../views/Nosotros.vue')
        },
        { 
            path: '/tienda' , 
            name: 'tienda', 
            component: () => import('../views/Tienda.vue')
        },
        { 
            path: '/contacto' , 
            name: 'contacto', 
            component: () => import('../views/Contacto.vue')
        },
        { 
            path: '/cart' , 
            name: 'carrito', 
            component: () => import('../views/Carrito.vue')
        },
    ]

}

export default mainRouter