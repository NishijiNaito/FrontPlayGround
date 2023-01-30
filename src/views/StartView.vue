<template>
  <div class="page page-center">
    <div class="row align-items-center">
      <div class="col-lg-5 col-md-8 col-sm-8 mx-auto">
        <div class="card">
          <div class="card-body">
            <h1 class="card-title mb-4 text-center h1">PlayGround</h1>
            <form @submit.prevent="submitStart">
              <div class="mb-3 text-center">
                <label class="form-label">Join As [{{ mode }}]</label>
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
                    <span class="form-selectgroup-label"
                      ><!-- Download SVG icon from http://tabler-icons.io/i/user -->
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
                    <span class="form-selectgroup-label"
                      ><!-- Download SVG icon from http://tabler-icons.io/i/circle -->
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
                    <span class="form-selectgroup-label"
                      ><!-- Download SVG icon from http://tabler-icons.io/i/square -->
                      <i class="fas fa-tv"></i> Spectator
                    </span>
                  </label>
                </div>
              </div>

              <div v-if="mode == 'player'">
                <div class="input-icon mb-3">
                  <span class="input-icon-addon">
                    <!-- Download SVG icon from http://tabler-icons.io/i/user -->
                    <i class="fas fa-door-open"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="room_id"
                    placeholder="Room ID"
                    required
                  />
                </div>
                <div class="input-icon mb-3">
                  <span class="input-icon-addon">
                    <!-- Download SVG icon from http://tabler-icons.io/i/user -->
                    <i class="fas fa-user"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="player_name"
                    placeholder="Player Name"
                    required
                  />
                </div>
              </div>
              <div v-if="mode == 'co-host'">
                <div class="input-icon mb-3">
                  <span class="input-icon-addon">
                    <!-- Download SVG icon from http://tabler-icons.io/i/user -->
                    <i class="fas fa-door-open"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    v-model="room_id"
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
                    v-model="passcode"
                    placeholder="Passcode"
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
                    v-model="room_id"
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
export default {
  data() {
    return {
      mode: "player",
      player_name: "",
      game: "GTM",
      room_id: "",
      passcode: "",
    };
  },
  mounted() {
    // this.$socket.on("foralert", () => {
    //   alert("sock_connected");
    // });
    this.$socket.on("boi", (data) => {
      alert("Boi " + data.name);
    });
    this.$socket.on("startHostComplete", (data) => {
      console.log(data);
      alert("Create Complete");
      this.$router.replace("/host");
    });
  },
  computed: {
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
        player_name: this.player_name,
        game: this.game,
        room_id: this.room_id,
        passcode: this.passcode,
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