<template>
  <div class="page page-center">
    <div class="row align-items-center">
      <div class="col-lg-5 col-md-8 col-sm-8 mx-auto">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title mb-4 text-center h1">PlayGround</h1>
            <!-- <div>{{ gameRoom }}</div> -->
            <form @submit.prevent="submitStart">
              <div class="mb-3 text-center">
                <label class="form-label">Join As</label>
                <div class="form-selectgroup">
                  <label class="form-selectgroup-item">
                    <input
                      type="radio"
                      name="icons"
                      value="player"
                      class="form-selectgroup-input"
                      v-model="mode"
                    />
                    <span class="form-selectgroup-label">
                      <i class="fas fa-gamepad-alt"></i>
                      Player
                    </span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input
                      type="radio"
                      name="icons"
                      value="host"
                      v-model="mode"
                      class="form-selectgroup-input"
                    />
                    <span class="form-selectgroup-label">
                      <i class="fas fa-user-crown"></i> Host
                    </span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input
                      type="radio"
                      name="icons"
                      value="co-host"
                      v-model="mode"
                      class="form-selectgroup-input"
                    />
                    <span class="form-selectgroup-label">
                      <i class="fas fa-users-crown"></i>
                      Co-host
                    </span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input
                      type="radio"
                      name="icons"
                      value="spectator"
                      v-model="mode"
                      class="form-selectgroup-input"
                    />
                    <span class="form-selectgroup-label">
                      <i class="fas fa-tv"></i> Spectator
                    </span>
                  </label>
                </div>
              </div>

              <div v-if="mode == 'player'">
                <div class="input-icon mb-3">
                  <span class="input-icon-addon">
                    <i class="fas fa-door-open"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="roomId"
                    placeholder="Room ID"
                    required
                  />
                </div>
                <div class="input-icon mb-3">
                  <span class="input-icon-addon">
                    <i class="fas fa-user"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="playerName"
                    placeholder="Player Name"
                    required
                  />
                </div>
              </div>
              <div v-if="mode == 'co-host'">
                <div class="input-icon mb-3">
                  <span class="input-icon-addon">
                    <i class="fas fa-door-open"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="roomId"
                    placeholder="Room ID"
                    required
                  />
                </div>
                <div class="input-icon mb-3">
                  <span class="input-icon-addon">
                    <i class="fas fa-key"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="passCode"
                    placeholder="passCode"
                    required
                  />
                </div>
              </div>
              <div v-if="mode == 'spectator'">
                <div class="input-icon mb-3">
                  <span class="input-icon-addon">
                    <i class="fas fa-door-open"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="roomId"
                    placeholder="Room ID"
                    required
                  />
                </div>
              </div>

              <div class="form-group mb-2" v-if="mode == 'host'">
                <label class="mb-2" for="game_mode">Game</label>
                <div class="input-icon mb-3">
                  <span class="input-icon-addon">
                    <i class="fas fa-puzzle-piece"></i>
                  </span>
                  <select class="form-control" :v-model="game" id="game_mode">
                    <option value="GTM">Guesstimate</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="btn btn-primary w-100">
                {{ subButton }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      mode: "player",
      playerName: "",
      game: "GTM",
      roomId: "",
      passCode: "",
    };
  },
  mounted() {
    this.$socket.on("startHostComplete", (data) => {
      console.log(data);
      // alert("Create Complete");
      this.$store.commit("setHost", data);
      let grl = localStorage.getItem("gameRoomList");
      console.log(grl);
      localStorage.setItem("gameRoomHostNow", JSON.stringify(data));
      if (grl == null || grl == "") {
        localStorage.setItem("gameRoomList", JSON.stringify([data]));
      } else {
        let grla = JSON.parse(grl);
        grla.push(data);
        localStorage.setItem("gameRoomList", JSON.stringify(grla));
      }
      this.$router.replace("/host");
    });
    this.$socket.on("notFound", () => {
      alert("ไม่พบห้องที่ค้นหา");
    });
    this.$socket.on("roomRunning", () => {
      alert("ห้องกำลังเล่นอยู่");
    });
    this.$socket.on("startJoinComplete", (data) => {
      console.log(data);
      this.$store.commit("setPlayer", data);
      let grl = localStorage.getItem("gameRoomList");
      console.log(grl);
      localStorage.setItem("gameRoomPlayerNow", JSON.stringify(data));
      if (grl == null || grl == "") {
        localStorage.setItem("gameRoomList", JSON.stringify([data]));
      } else {
        let grla = JSON.parse(grl);
        grla.push(data);
        localStorage.setItem("gameRoomList", JSON.stringify(grla));
      }
      this.$router.replace("/play");
    });
  },
  computed: {
    ...mapGetters(["gameRoom"]),
    subButton() {
      if (this.mode == "host") {
        return "Create Room";
      } else {
        return "Join";
      }
    },
  },
  methods: {
    sendboi() {
      this.$socket.emit("hehe");
    },
    submitStart() {
      this.$socket.emit("submitStart", {
        mode: this.mode,
        playerName: this.playerName,
        game: this.game,
        roomId: this.roomId,
        passCode: this.passCode,
      });
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