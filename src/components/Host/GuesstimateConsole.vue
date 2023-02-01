<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card" v-if="gameData.inGameStage == 0">
          <div class="card-body">
            <div>
              <button @click="guessPrice" class="btn btn-warning me-3">
                Guess Price
              </button>
              <button @click="guessPrice" class="btn btn-warning me-3">
                Guess Price
              </button>
            </div>
            <form @submit.prevent="startQuiz">
              <div class="row justify-content-center">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="quiztype" class="form-label">Quiz Type</label>
                    <select
                      class="form-select form-select-md"
                      v-model="gameData.quiz.questionType"
                      id="quiztype"
                      required
                    >
                      <option value="" hidden>Choose</option>
                      <option value="E">One Answer</option>
                      <option value="R1">Answer Range</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="question" class="form-label">Question</label>
                    <textarea
                      class="form-control"
                      v-model="gameData['quiz'].question"
                      id="question"
                      rows="1"
                      required
                    ></textarea>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="questione" class="form-label"
                      >Question Explain</label
                    >
                    <textarea
                      class="form-control"
                      v-model="gameData['quiz'].questionExplain"
                      id="questione"
                      rows="1"
                    ></textarea>
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="answer" class="form-label">Answer</label>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Prefix Answer"
                      aria-label="Prefix"
                      v-model="gameData['quiz'].answerPrefix"
                    />
                    <input
                      type="text"
                      pattern="-?\d*\.?\d*"
                      class="form-control"
                      id="answer"
                      placeholder="Answer"
                      aria-label="Answer"
                      v-model="gameData['answer'].answer"
                      inputmode="numeric"
                      required
                    />
                    <!-- <span class="input-group-text">@</span> -->
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Suffix Answer"
                      aria-label="Suffix"
                      v-model="gameData['quiz'].answerSuffix"
                    />
                  </div>
                </div>
              </div>
              <button type="submit" class="w-100 btn btn-info mt-3">
                Start Question
              </button>
            </form>
          </div>
        </div>
        <div class="card" v-else-if="gameData.inGameStage > 0">
          <div class="card-body">
            <button @click="resetQuiz" class="w-100 btn btn-warning mb-3">
              Reset Question
            </button>
            <h1 class="text-center pre-formatted">
              {{ gameData["quiz"].question }}
            </h1>

            <h2 class="text-center pre-formatted">
              {{ gameData.quiz.questionExplain }}
            </h2>
            <h2 class="text-center pre-formatted">
              {{ gameData.quiz.answerPrefix }} {{ gameData.answer.answer }}
              {{ gameData.quiz.answerSuffix }}
            </h2>
            <!--
            <div class="text-center pre-formatted">
              {{ gameData.quiz.question }}
            </div> -->
          </div>
        </div>

        <div v-else></div>
      </div>
    </div>
    <div
      class="
        row row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4
        justify-content-center
        text-center
        mt-4
      "
    >
      <div class="col-auto" v-for="pl in playerData" :key="pl.uuid">
        <div class="card scale-in-hor-center">
          <div class="card-header">
            <h1 class="card-text text-center w-100">
              {{ pl.playerName }} ({{ pl.score }})
            </h1>
          </div>
          <transition
            enter-active-class="scale-in-hor-center"
            leave-active-class="scale-out-hor-center"
            mode="out-in"
          >
            <div
              class="card-body"
              v-if="gameData.inGameStage == 1 && pl.lockDown == false"
            >
              <h1>Not Answer</h1>
            </div>
            <div
              class="card-body"
              v-else-if="gameData.inGameStage == 1 && pl.lockDown == true"
            >
              <h1>Answered</h1>
            </div>
            <div v-else></div>
          </transition>
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
      gameData: {},
      playerData: [],
    };
  },
  computed: {
    ...mapGetters(["gameRoom", "gameName"]),
  },
  created() {
    // alert("New Gamme");
    this.$socket.emit("hostGameInfo", this.gameRoom);
  },
  mounted() {
    //GET GAME INFO UPDATE
    this.$socket.on("hostGameInfo", (data) => {
      if (data.gameData) this.gameData = data.gameData;
      if (data.playerData) this.playerData = data.playerData;
    });
  },
  unmounted() {
    this.$socket.off("hostGameInfo");
  },
  methods: {
    startQuiz() {
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.inGameStage = 1; // for start question
      dat.playerData = this.playerData;
      this.$socket.emit("hostGameUpdate", dat);
    },
    resetQuiz() {
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      // dat.gameData = this.gameData;
      dat.gameData = {
        inGameStage: 0,
        quiz: {
          questionType: "",
          question: "",
          questionExplain: "",
          answerPrefix: "",
          answerSuffix: "",
        },
        answer: {
          answer: "",
        },
      };
      dat.playerData = this.playerData.map((e) => {
        let d = e;
        d.min = "";
        d.max = "";
        d.size = "";
        d.ans = "";
        d.lockDown = false;
        d.answerStatus = "";
        return d;
      });
      this.$socket.emit("hostGameUpdate", dat);
    },
    guessPrice() {
      this.gameData.quiz.question = "สิ่งนี้ ราคาเท่าไหร่ ?";
      this.gameData.quiz.answerSuffix = "บาท";
    },
  },
};
</script>

<style>
</style>