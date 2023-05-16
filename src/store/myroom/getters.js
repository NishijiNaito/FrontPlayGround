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
            case "WDWH":
                return "ใคร ทำอะไร ที่ไหน อย่างไร";
            case "NFS":
                return "เลข จาก เรื่อง";
            case "KTC":
                return "MCQ Keep The Chip";
            case "CC":
                return "Casino Confident";
            default:
                return "";
        }
    },
    gameRequired(state) {
        switch (state.game) {
            case "GTM":
                return 2;
            case "WDWH":
                return 2;
            case "NFS":
                return 2;
            case "KTC":
                return 1;
            case "CC":
                return 1;
            default:
                return 999;
        }
    }

}