<template>
  <div>
    <transition
      enter-active-class="scale-in-hor-center"
      leave-active-class="scale-out-hor-center"
      mode="out-in"
    >
      <div v-if="roomStatus == 'REG'">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-5 col-md-8 col-sm-8 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    WELCOME, {{ gameRoom.playerName }}
                  </h1>
                  <h3 class="mb-2 text-center">
                    Waiting For Host Started Game
                  </h3>
                  <h3 class="mb-3 text-center">Game Name : {{ gameName }}</h3>
                  <button @click="leaveRoom" class="btn btn-danger w-100">
                    Leave Room
                  </button>

                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <guesstimate-play v-if="gameRoom.game == 'GTM'"></guesstimate-play>
        <WDWHPlay v-else-if="gameRoom.game == 'WDWH'"></WDWHPlay>
        <number-from-story-play
          v-else-if="gameRoom.game == 'NFS'"
        ></number-from-story-play>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GuesstimatePlay from "../components/Player/GuesstimatePlay.vue";
import NumberFromStoryPlay from "../components/Player/NumberFromStoryPlay.vue";
import WDWHPlay from "../components/Player/WDWHPlay.vue";

export default {
  components: { GuesstimatePlay, WDWHPlay, NumberFromStoryPlay },

  data() {
    return {
      roomStatus: "REG",
    };
  },
  computed: {
    ...mapGetters(["gameRoom", "gameName"]),
  },
  created() {
    // For Check RoomNow
    if (!this.gameRoom["roomId"]) {
      // no room id >
      // alert("noId");
      let roomNow = localStorage.getItem("gameRoomPlayerNow");

      // set store

      if (roomNow == null || roomNow == "") {
        this.$router.replace("/start");
      } else {
        roomNow = JSON.parse(roomNow);
        this.$store.commit("setPlayer", roomNow);
      }
      console.log(roomNow);
    }
    // Join Host For GetData
    this.$socket.emit("joinByPlayer", this.gameRoom);
  },
  mounted() {
    this.$socket.on("noRoom", () => {
      localStorage.clear("gameRoomPlayerNow");
      this.$store.commit("setPlayer", {
        roomId: "",
        mode: "",
        game: "",
        uuid: "",
        playerName: "",
      });
      this.$router.replace("/start");
    });
    this.$socket.on("playerRoomInfo", (data) => {
      this.roomStatus = data.roomStatus;
    });
    // ROOM START
    this.$socket.on("roomStart", () => {
      this.roomStatus = "INPLAY";
    });
    // ROOM END
    this.$socket.on("roomEnd", () => {
      this.roomStatus = "REG";
    });
  },
  unmounted() {
    this.$socket.off("noRoom");
    this.$socket.off("playerRoomInfo");
    this.$socket.off("roomStart");
    this.$socket.off("roomEnd");
  },
  methods: {
    leaveRoom() {
      this.$socket.emit("playerLeave", this.gameRoom);
    },
  },
};
</script>

<style scoped>
.page {
  display: flex !important;
  flex-direction: column !important;
  position: relative !important;
  min-height: 100vh !important;
}

.page-center {
  justify-content: center !important;
}
</style>