

export const signInUser = ( state, { access_token, role, user } ) => {

    if( access_token ){
        state.access_token = access_token
        localStorage.setItem('access_token', access_token )
    }
    if( role ){
        state.role = role
    }
    if( user ){
        state.user = user
        localStorage.setItem('user', user )
    }
    state.status = "authenticated"
}
