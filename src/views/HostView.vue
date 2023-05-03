<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-11">
        <div class="row justify-content-center text-center row-gap-3 mt-4">
          <div class="col-md-3">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Room ID | Co-Host PassCode</h4>
              </div>
              <div class="card-body">
                <h1 class="card-text">
                  {{ gameRoom.roomId }} | {{ gameRoom.passCode }}
                </h1>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Room Game</h4>
              </div>
              <div class="card-body">
                <h1 class="card-text">{{ gameName }}</h1>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Players</h4>
              </div>
              <div class="card-body">
                <h1 class="card-text">{{ playersOnline.length }}</h1>
              </div>
            </div>
          </div>
        </div>
        <transition
          enter-active-class="scale-in-hor-center"
          leave-active-class="scale-out-hor-center"
          mode="out-in"
        >
          <button
            class="w-100 btn btn-success mt-3"
            v-if="roomStatus == 'REG' && playersOnline.length > 0"
            @click="roomStart"
          >
            Start Game
          </button>
          <button
            class="w-100 btn btn-danger mt-3"
            v-else-if="roomStatus == 'INPLAY'"
            @click="roomEnd"
          >
            End Game
          </button>
          <div v-else></div>
        </transition>
        <transition
          enter-active-class="scale-in-hor-center"
          leave-active-class="scale-out-hor-center"
          mode="out-in"
        >
          <div
            class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center text-center mt-3 row-gap-3"
            v-if="roomStatus == 'REG'"
          >
            <div class="col" v-for="pl in playersOnline" :key="pl.id">
              <div class="card scale-in-hor-center">
                <div class="card-body">
                  <h1 class="card-text">{{ pl.playerName }}</h1>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="roomStatus == 'INPLAY'" class="mt-4">
            <guesstimate-console v-if="game == 'GTM'"></guesstimate-console>
            <WDWHConsole v-if="game == 'WDWH'"></WDWHConsole>
          </div>
          <div v-else></div>
        </transition>
        <!-- {{ gameRoom }} -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GuesstimateConsole from "../components/Host/GuesstimateConsole.vue";
import WDWHConsole from "../components/Host/WDWHConsole.vue";

export default {
  components: { GuesstimateConsole, WDWHConsole },
  data() {
    return {
      playersOnline: [],
      roomStatus: "REG",
    };
  },
  computed: {
    ...mapGetters(["gameRoom", "gameName", "game"]),
  },
  created() {
    // For Check RoomNow
    if (!this.gameRoom["roomId"]) {
      // no room id >
      // alert("noId");
      let roomNow = localStorage.getItem("gameRoomHostNow");

      // set store

      if (roomNow == null || roomNow == "") {
        this.$router.replace("/start");
      } else {
        roomNow = JSON.parse(roomNow);
        this.$store.commit("setHost", roomNow);
      }
      console.log(roomNow);
    }
    // Join Host For GetData
    this.$socket.emit("joinByHost", this.gameRoom);
  },
  mounted() {
    // NO ROOM
    this.$socket.on("noRoom", () => {
      localStorage.clear("gameRoomHostNow");
      this.$router.replace("/start");
    });
    // GET INFO
    this.$socket.on("hostRoomInfo", (data) => {
      this.playersOnline = data.playersOnline;
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
    this.$socket.off("hostRoomInfo");
    this.$socket.off("roomStart");
    this.$socket.off("roomEnd");
  },
  methods: {
    roomStart() {
      this.$socket.emit("roomStart", this.gameRoom);
    },
    roomEnd() {
      this.$socket.emit("roomEnd", this.gameRoom);
    },
  },
};
</script>

<style>
.scale-in-hor-center {
  -webkit-animation: scale-in-hor-center 0.5s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation: scale-in-hor-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
.scale-out-hor-center {
  -webkit-animation: scale-in-hor-center 0.5s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both reverse;
  animation: scale-in-hor-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both
    reverse;
}
@-webkit-keyframes scale-in-hor-center {
  0% {
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    opacity: 1;
  }
}
@keyframes scale-in-hor-center {
  0% {
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    opacity: 1;
  }
}

.pre-formatted {
  white-space: pre;
}
</style>