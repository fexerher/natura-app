


export const getNotifications = ( state ) => {

    const notifications = state.notifications.map( ( noti ) => {
        return { 'avatar': noti.photo , 'title': noti.title , 'subtitle': noti.body}
    })

    if(!notifications) return 

    return notifications

}