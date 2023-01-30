export default {
    username(state) {
        return state.username
    },
    token(state) {
        return state.token
    },
    role(state) {
        return state.role
    },
    name(state) {
        return state.name
    },
    isadmin(state) {
        return state.role == "HEAD"
    },
    axios_url(state) {
        return state.axios_url
    },
    web_group(state) {
        return state.web_group
    },
    active_wg(state) {
        return state.active_wg
    }

}