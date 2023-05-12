<template>
  <div>
    <transition
      enter-active-class="scale-in-hor-center"
      leave-active-class="scale-out-hor-center"
      mode="out-in"
    >
      <div v-if="gameData.phase == 0">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }}
                  </h1>
                  <h3 class="mb-2 text-center">Waiting For Config</h3>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 1">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }} |
                    {{ myPlayerData.chip_remain }} Chips
                  </h1>
                  <h3 class="mb-2 text-center">Waiting For Question</h3>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 2">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameData["quiz"].quiz_question }}
                  </h1>
                </div>
              </div>
            </div>

            <div
              class="col-lg-6 col-md-6 col-sm-12"
              v-if="gameData.quiz.quiz_picLink"
            >
              <div class="card">
                <div class="card-body">
                  <img style="width: 100%" :src="gameData.quiz.quiz_picLink" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 3">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameData["quiz"].quiz_question }}
                  </h1>
                </div>
              </div>
              <div class="card mt-3" v-if="gameData.quiz.quiz_picLink">
                <div class="card-body">
                  <img style="width: 100%" :src="gameData.quiz.quiz_picLink" />
                </div>
              </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="card">
                <div class="card-body">
                  <h1 class="card-text text-center inline w-100">
                    Unassigned Chip : {{ myPlayerData.chip_unchoose }}
                  </h1>
                  <div
                    class="row row-cols-4 justify-content-center row-gap-3 mb-1"
                  >
                    <div class="col">
                      <button
                        class="btn btn-danger w-100"
                        :disabled="
                          selectChoice == null ||
                          myPlayerData.chip_choice[selectChoice] < 5
                        "
                        @click="chipplace(-5)"
                      >
                        -5
                      </button>
                    </div>
                    <div class="col">
                      <button
                        class="btn btn-danger w-100"
                        :disabled="
                          selectChoice == null ||
                          myPlayerData.chip_choice[selectChoice] < 1
                        "
                        @click="chipplace(-1)"
                      >
                        -1
                      </button>
                    </div>
                    <div class="col">
                      <button
                        class="btn btn-success w-100"
                        :disabled="
                          selectChoice == null || myPlayerData.chip_unchoose < 1
                        "
                        @click="chipplace(1)"
                      >
                        +1
                      </button>
                    </div>
                    <div class="col">
                      <button
                        class="btn btn-success w-100"
                        :disabled="
                          selectChoice == null || myPlayerData.chip_unchoose < 5
                        "
                        @click="chipplace(5)"
                      >
                        +5
                      </button>
                    </div>
                  </div>

                  <div class="row row-cols-2 justify-content-center row-gap-3">
                    <div class="col">
                      <button
                        class="btn btn-danger w-100"
                        :disabled="
                          selectChoice == null ||
                          myPlayerData.chip_choice[selectChoice] < 1
                        "
                        @click="chipclear"
                      >
                        Clear Chip
                      </button>
                    </div>
                    <div class="col">
                      <button
                        class="btn btn-success w-100"
                        :disabled="
                          selectChoice == null || myPlayerData.chip_unchoose < 1
                        "
                        @click="chipall"
                      >
                        All In
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card mt-3">
                <div class="card-body">
                  <div
                    class="row row-cols-1 row-cols-lg-2 justify-content-center row-gap-3"
                  >
                    <div
                      class="col"
                      v-for="(q, idx) in gameData.quiz.quiz_choice"
                      :key="idx"
                      @click="selectChoice = idx"
                    >
                      <div
                        class="card"
                        :class="{ 'card-active': idx == selectChoice }"
                        style="cursor: pointer"
                      >
                        <div class="card-body text-center">{{ q }}</div>
                        <div class="card-footer h-100">
                          <h1 class="card-text text-center inline w-100">
                            {{ myPlayerData.chip_choice[idx] }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 4 || gameData.phase == 5">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameData["quiz"].quiz_question }}
                  </h1>
                </div>
              </div>
              <div class="card mt-3" v-if="gameData.quiz.quiz_picLink">
                <div class="card-body">
                  <img style="width: 100%" :src="gameData.quiz.quiz_picLink" />
                </div>
              </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="card mt-3">
                <div class="card-body">
                  <div
                    class="row row-cols-1 row-cols-lg-2 justify-content-center row-gap-3"
                  >
                    <div
                      class="col"
                      v-for="(q, idx) in gameData.quiz.quiz_choice"
                      :key="idx"
                    >
                      <div
                        class="card"
                        :class="{ 'card-active': idx == selectChoice }"
                      >
                        <div class="card-body text-center">{{ q }}</div>
                        <div class="card-footer h-100">
                          <h1 class="card-text text-center inline w-100">
                            {{ myPlayerData.chip_choice[idx] }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 6">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameData["quiz"].quiz_question }}
                  </h1>
                </div>
              </div>
              <div class="card mt-3" v-if="gameData.quiz.quiz_picLink">
                <div class="card-body">
                  <img style="width: 100%" :src="gameData.quiz.quiz_picLink" />
                </div>
              </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="card mt-3">
                <div class="card-body">
                  <div
                    class="row row-cols-1 row-cols-lg-2 justify-content-center row-gap-3"
                  >
                    <div
                      class="col"
                      v-for="(q, idx) in gameData.quiz.quiz_choice"
                      :key="idx"
                    >
                      <div
                        class="card text-white"
                        :class="{
                          'bg-danger': q != gameData.answer.answer,
                          'bg-success': q == gameData.answer.answer,
                        }"
                      >
                        <div class="card-body text-center">{{ q }}</div>
                        <div
                          class="card-footer h-100"
                          :class="{
                            'bg-danger': q != gameData.answer.answer,
                            'bg-success': q == gameData.answer.answer,
                          }"
                        >
                          <h1 class="card-text text-center inline w-100">
                            {{ myPlayerData.chip_choice[idx] }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 7">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }}
                  </h1>
                  <h3 class="mb-2 text-center">
                    คุณเหลืออีก {{ myPlayerData.chip_remain }} Chip
                  </h3>
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
      gameData: {},
      playerData: [],
      timerData: {},
      myPlayerData: {},
      selectChoice: null,
    };
  },
  computed: {
    ...mapGetters(["gameRoom", "gameName"]),
    dataExeptMe() {
      return this.playerData.filter((e) => e.uuid != this.gameRoom.uuid);
    },
  },
  created() {
    // alert("New Gamme");
    this.$socket.emit("playerGameInfo", this.gameRoom);
  },
  mounted() {
    //GET GAME INFO UPDATE
    this.$socket.on("playerGameInfo", (data) => {
      if (data.gameData) this.gameData = data.gameData;
      if (data.timerData) this.timerData = data.timerData;
      if (data.playerData) {
        this.playerData = data.playerData; // get all playerdata
        let idx = data.playerData.findIndex((e) => {
          return e.uuid == this.gameRoom.uuid;
        });
        this.myPlayerData = data.playerData[idx];
      }
      if (data.gameData.phase == 4) this.selectChoice = null;
    });
    this.$socket.on("connect", () => {
      this.$router.go(0);
    });
  },
  unmounted() {
    this.$socket.off("playerGameInfo");
    this.$socket.off("connect");
  },
  methods: {
    chipplace(chip) {
      this.myPlayerData.chip_unchoose -= chip;
      this.myPlayerData.chip_choice[this.selectChoice] += chip;

      let dat = {
        roomId: this.gameRoom.roomId,
        playerName: this.gameRoom.playerName,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      // put myplayerData in dat
      dat.myPlayerData = this.myPlayerData;
      this.$socket.emit("playerGameUpdate", dat);
    },
    chipclear() {
      this.myPlayerData.chip_unchoose +=
        this.myPlayerData.chip_choice[this.selectChoice];
      this.myPlayerData.chip_choice[this.selectChoice] = 0;

      let dat = {
        roomId: this.gameRoom.roomId,
        playerName: this.gameRoom.playerName,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      // put myplayerData in dat
      dat.myPlayerData = this.myPlayerData;
      this.$socket.emit("playerGameUpdate", dat);
    },
    chipall() {
      this.myPlayerData.chip_choice[this.selectChoice] +=
        this.myPlayerData.chip_unchoose;
      this.myPlayerData.chip_unchoose = 0;

      let dat = {
        roomId: this.gameRoom.roomId,
        playerName: this.gameRoom.playerName,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      // put myplayerData in dat
      dat.myPlayerData = this.myPlayerData;
      this.$socket.emit("playerGameUpdate", dat);
    },
  },
};
</script>

<style>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
}
</style>