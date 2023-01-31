import mutations from './mutations';
import actions from './actions';
import getters from './getters';
export default {
    state() {
        return {
            game: "",
            uuid: "",
            playerName: "",
            mode: "",
            passCode: "",
            roomId: ""
        }
    },
    mutations,
    actions,
    getters
}