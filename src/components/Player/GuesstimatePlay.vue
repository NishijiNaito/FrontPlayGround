<template>
  <div>
    <transition
      enter-active-class="scale-in-hor-center"
      leave-active-class="scale-out-hor-center"
      mode="out-in"
    >
      <div v-if="gameData.inGameStage == 0">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} Points
                  </h1>
                  <h3 class="mb-2 text-center">Waiting For Question</h3>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="gameData.inGameStage == 1 && myPlayerData.lockDown == false"
      >
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12 mx-auto mb-3">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameData["quiz"].question }}
                  </h1>

                  <h2 class="text-center">
                    {{ gameData.quiz.questionExplain }}
                  </h2>
                </div>
              </div>

              <div class="card mt-3">
                <div class="card-body">
                  <form @submit.prevent="submitAnswer">
                    <h2
                      class="text-center"
                      v-if="gameData.quiz.questionType == 'E'"
                    >
                      <div class="input-group mb-2">
                        <span
                          v-if="gameData.quiz.answerPrefix"
                          class="input-group-text"
                        >
                          {{ gameData.quiz.answerPrefix }}
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          pattern="-?\d*\.?\d*"
                          placeholder="Answer"
                          v-model="myPlayerData.ans"
                          autocomplete="off"
                          inputmode="numeric"
                          required
                        />
                        <span
                          v-if="gameData.quiz.answerSuffix"
                          class="input-group-text"
                        >
                          {{ gameData.quiz.answerSuffix }}
                        </span>
                      </div>
                    </h2>

                    <h2
                      class="text-center"
                      v-else-if="gameData.quiz.questionType == 'R1'"
                    >
                      <div class="input-group mb-2">
                        <span
                          v-if="gameData.quiz.answerPrefix"
                          class="input-group-text"
                        >
                          {{ gameData.quiz.answerPrefix }}
                        </span>
                        <input
                          type="text"
                          class="form-control"
                          pattern="-?\d*\.?\d*"
                          placeholder="Minimum"
                          v-model="myPlayerData.min"
                          autocomplete="off"
                          inputmode="numeric"
                          required
                        />
                        <span class="input-group-text"> - </span>
                        <input
                          type="text"
                          class="form-control"
                          pattern="-?\d*\.?\d*"
                          placeholder="Maximum"
                          v-model="myPlayerData.max"
                          autocomplete="off"
                          inputmode="numeric"
                          required
                        />
                        <span
                          v-if="gameData.quiz.answerSuffix"
                          class="input-group-text"
                        >
                          {{ gameData.quiz.answerSuffix }}
                        </span>
                      </div>
                    </h2>
                    <button type="submit" class="w-100 btn btn-info mt-1">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div
              class="col-lg-6 col-md-6 col-sm-12"
              v-if="gameData.quiz.questionPic"
            >
              <div class="card">
                <div class="card-body">
                  <img style="width: 100%" :src="gameData.quiz.questionPic" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="gameData.inGameStage == 1 && myPlayerData.lockDown == true"
      >
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameData["quiz"].question }}
                  </h1>

                  <h2 class="text-center">
                    {{ gameData.quiz.questionExplain }}
                  </h2>
                </div>
              </div>
              <div class="card mt-3">
                <div class="card-body" v-if="gameData.quiz.questionType == 'E'">
                  <h2 class="text-center">
                    Your Answer <br />
                    {{ gameData.quiz.answerPrefix }}
                    {{ myPlayerData.ans }}
                    {{ gameData.quiz.answerSuffix }}
                  </h2>
                </div>
                <div
                  class="card-body"
                  v-if="gameData.quiz.questionType == 'R1'"
                >
                  <h2 class="text-center">
                    Your Answer <br />
                    {{ gameData.quiz.answerPrefix }}
                    {{ myPlayerData.min }} - {{ myPlayerData.max }}
                    {{ gameData.quiz.answerSuffix }}
                  </h2>
                </div>
              </div>
            </div>

            <div
              class="col-lg-6 col-md-6 col-sm-12"
              v-if="gameData.quiz.questionPic"
            >
              <div class="card">
                <div class="card-body">
                  <img style="width: 100%" :src="gameData.quiz.questionPic" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.inGameStage == 2">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameData["quiz"].question }}
                  </h1>

                  <h2 class="text-center">
                    {{ gameData.quiz.questionExplain }}
                  </h2>
                </div>
              </div>
              <div class="card mt-3">
                <div class="card-body">
                  <h2
                    class="text-center"
                    v-if="gameData.quiz.questionType == 'E'"
                  >
                    คำตอบของคุณ <br />
                    {{ gameData.quiz.answerPrefix }}
                    {{ myPlayerData.ans }}
                    {{ gameData.quiz.answerSuffix }}
                  </h2>
                  <h2
                    class="text-center"
                    v-if="gameData.quiz.questionType == 'R1'"
                  >
                    คำตอบของคุณ <br />
                    {{ gameData.quiz.answerPrefix }}
                    {{ myPlayerData.min }} - {{ myPlayerData.max }}
                    {{ gameData.quiz.answerSuffix }}
                  </h2>

                  <h2 class="text-center mb-3">ผู้เล่นคนอื่นๆ</h2>
                  <div
                    class="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-gap-2 justify-content-center"
                  >
                    <div class="col" v-for="pl in dataExeptMe" :key="pl.uuid">
                      <div class="card">
                        <div class="card-body fo-text">
                          {{ pl.playerName }} <br />
                          <div
                            class="text-center"
                            v-if="gameData.quiz.questionType == 'E'"
                          >
                            {{ gameData.quiz.answerPrefix }}
                            {{ pl.ans }}
                            {{ gameData.quiz.answerSuffix }}
                          </div>
                          <div
                            class="text-center"
                            v-if="gameData.quiz.questionType == 'R1'"
                          >
                            {{ gameData.quiz.answerPrefix }}
                            {{ pl.min }} - {{ pl.max }}
                            {{ gameData.quiz.answerSuffix }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="col-lg-6 col-md-6 col-sm-12"
              v-if="gameData.quiz.questionPic"
            >
              <div class="card">
                <div class="card-body">
                  <img style="width: 100%" :src="gameData.quiz.questionPic" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.inGameStage == 3">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameData["quiz"].question }}
                  </h1>

                  <h2 class="text-center">
                    {{ gameData.quiz.questionExplain }}
                  </h2>
                </div>
              </div>
              <div class="card mt-3">
                <div
                  class="card-body"
                  v-if="
                    gameData.quiz.questionType == 'E' &&
                    myPlayerData.lockDown == true
                  "
                >
                  <h2 class="text-center">
                    Your Answer <br />
                    {{ gameData.quiz.answerPrefix }}
                    {{ myPlayerData.ans }}
                    {{ gameData.quiz.answerSuffix }}
                  </h2>
                </div>
                <div
                  class="card-body"
                  v-else-if="
                    gameData.quiz.questionType == 'R1' &&
                    myPlayerData.lockDown == true
                  "
                >
                  <h2 class="text-center">
                    Your Answer <br />
                    {{ gameData.quiz.answerPrefix }}
                    {{ myPlayerData.min }} - {{ myPlayerData.max }}
                    {{ gameData.quiz.answerSuffix }}
                  </h2>
                </div>
                <div class="card-body" v-else>
                  <h2 class="text-center">Your Don't Answer</h2>
                </div>
              </div>
              <div class="card mt-3">
                <div class="card-body">
                  <h2 class="text-center">
                    The Answer is <br />
                    {{ gameData.quiz.answerPrefix }}
                    {{ gameData.answer.answer }}
                    {{ gameData.quiz.answerSuffix }}
                  </h2>
                  <h2
                    class="text-center"
                    v-if="gameData.quiz.questionType == 'E'"
                  >
                    You Got {{ myPlayerData.answerStatus || 0 }} Points
                  </h2>
                  <h2
                    class="text-center"
                    v-if="gameData.quiz.questionType == 'R1'"
                  >
                    <div v-if="myPlayerData.answerStatus == 'correct_smallest'">
                      You Got 3 Points from smallest size
                    </div>
                    <div v-else-if="myPlayerData.answerStatus == 'correct'">
                      You Got 1 Points
                    </div>
                    <div
                      v-else-if="myPlayerData.answerStatus == 'correct_largest'"
                    >
                      You Got 0 Points from largest size
                    </div>
                    <div v-else>You Got 0 Points</div>
                  </h2>
                </div>
              </div>
            </div>

            <div
              class="col-lg-6 col-md-6 col-sm-12"
              v-if="gameData.quiz.questionPic"
            >
              <div class="card">
                <div class="card-body">
                  <img style="width: 100%" :src="gameData.quiz.questionPic" />
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
      myPlayerData: {},
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
      if (data.playerData) {
        this.playerData = data.playerData; // get all playerdata
        let idx = data.playerData.findIndex((e) => {
          return e.uuid == this.gameRoom.uuid;
        });
        this.myPlayerData = data.playerData[idx];
      }
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
    submitAnswer() {
      // get gameRoom Data
      let dat = {
        roomId: this.gameRoom.roomId,
        playerName: this.gameRoom.playerName,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      // set myplayerData
      this.myPlayerData.lockDown = true;
      // put myplayerData in dat
      dat.myPlayerData = this.myPlayerData;
      this.$socket.emit("playerGameUpdate", dat);
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
.pre-format {
  white-space: pre;
}
</style>