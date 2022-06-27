


const mainMenuRouter = {
    redirect: '/admin/dashboard',
    component: () => import('../layouts/MainMenuLayout.vue'),
    children: [
        { 
            path: '/admin/dashboard' , 
            name: 'dashboard', 
            component: () => import('../views/InicioMain.vue') 
        },
        { 
            path: '/admin/categorias' , 
            name: 'categorias', 
            component: () => import('../views/Categorias.vue')
        },
        { 
            path: '/admin/productos' , 
            name: 'productos', 
            component: () => import('../views/Productos.vue') 
        },
        { 
            path: '/admin/usuarios' , 
            name: 'usuarios', 
            component: () => import('../views/Usuarios.vue') 
        },
    ]
}

export default mainMenuRouter