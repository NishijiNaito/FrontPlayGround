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
                  <h3 class="mb-0 text-center">Game Name : {{ gameName }}</h3>

                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else></div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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