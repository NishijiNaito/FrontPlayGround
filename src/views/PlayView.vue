<template>
  <div>
    {{ roomStatus }}
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

<style>
</style>