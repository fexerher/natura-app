
export const loadNotifications = (state, payload) => {
    state.notifications = [...state.notifications, ...payload]
}
