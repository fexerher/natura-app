

export const signInUser = ( state, { token , usuario   } ) => {

    if( token ){
        state.access_token = token
        localStorage.setItem('x-token', token )
    }
    if( usuario ){
        state.user = usuario
    }
    state.status = "authenticated"
}


export const logout = (state) => {
    state.access_token = null
    state.user = null
    localStorage.removeItem('x-token')
    state.status = "not-authenticated"
}
