export default {
    uuid(state) {
        return state.uuid
    },
    game(state) {
        return state.game
    },
    playerName(state) {
        return state.playerName
    },
    mode(state) {
        return state.mode
    },
    passCode(state) {
        return state.passCode
    },
    roomId(state) {
        return state.roomId
    },
    gameRoom(state) {
        return state
    },
    gameName(state) {
        switch (state.game) {
            case "GTM":
                return "Guesstimate";

            default:
                return "";
        }
    }

}