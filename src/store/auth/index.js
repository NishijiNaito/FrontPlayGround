import mutations from './mutations';
import actions from './actions';
import getters from './getters';
export default {
    state() {
        return {
            username: null,
            token: null,
            role: null,
            name: null,
            web_group: null, // Webgroup Can Join
            active_wg: null, // Active Webgroup
            axios_url: ["https://student.psu.ac.th/sdamaster/api/"]
        }
    },
    mutations,
    actions,
    getters
}