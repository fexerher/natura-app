import apiServer from "@/api/apiServer";

export const loadNotifications = async ( {commit} ) => {

    try {
        const { data } = await apiServer.get('notifications/list')

        

        commit('loadNotifications', data)
        
    } catch (error) {
        throw new Error(error)
    }


}