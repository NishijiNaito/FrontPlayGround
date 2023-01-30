export default {
    setUser(state, payload) {
        state.token = payload.token
        state.username = payload.username
        state.role = payload.role
        state.name = payload.name
        state.web_group = payload.web_group
    },
    setActiveWG(state, payload) {
        state.active_wg = payload
    }
}