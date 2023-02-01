<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body" v-if="gameData.inGameStage == 0">
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
          <div class="card-body">{{ gameData }}</div>
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
  },
};
</script>

<style>
</style>