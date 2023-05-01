<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-11">
        <div class="row justify-content-center text-center mt-4">
          <div class="col-md-3">
            <div class="card">
              <div class="card-header">
                <h4 class="card-title">Room ID</h4>
              </div>
              <div class="card-body">
                <h1 class="card-text">
                  {{ roomId }}
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
          <div v-if="roomStatus == 'REG'">
            <div
              class="row row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center text-center mt-4"
            >
              <div class="col-auto" v-for="pl in playersOnline" :key="pl.id">
                <div class="card scale-in-hor-center">
                  <div class="card-body">
                    <h1 class="card-text">{{ pl.playerName }}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-content-center text-center mt-4">
              <div class="col-md-6">
                <div class="card">
                  <div class="card-body">
                    <h1 class="card-text">Waiting For Other Players...</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="roomStatus == 'INPLAY'" class="mt-4">
            <guesstimate-spec
              v-if="game == 'GTM'"
              :roomId="roomId"
            ></guesstimate-spec>
          </div>
          <div v-else></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import GuesstimateSpec from "../components/Spectator/GuesstimateSpec.vue";

export default {
  components: { GuesstimateSpec },
  props: ["roomId"],
  data() {
    return {
      playersOnline: [],
      roomStatus: "REG",
      game: "",
    };
  },
  created() {
    // Join Host For GetData
    this.$socket.emit("joinBySpectator", this.roomId);
  },
  mounted() {
    // NO ROOM
    this.$socket.on("noRoom", () => {
      this.$router.replace("/start");
    });
    // GET INFO
    this.$socket.on("spectatorRoomInfo", (data) => {
      this.playersOnline = data.playersOnline;
      this.roomStatus = data.roomStatus;
      this.game = data.game;
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
  computed: {
    gameName() {
      switch (this.game) {
        case "GTM":
          return "Guesstimate";

        default:
          return "";
      }
    },
  },
};
</script>

<style>
</style>