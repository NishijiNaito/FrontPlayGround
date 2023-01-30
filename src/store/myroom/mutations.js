export default {
    setUser(state, payload) {
        state.token = payload.token
        state.username = payload.username
        state.role = payload.role
        state.name = payload.name
        state.web_group = payload.web_group
    },
    setHost(state, payload) {
        state.game = payload.game
        state.id = payload.id
        state.mode = payload.mode
        state.passCode = payload.passCode
        state.roomId = payload.roomId
    }
}