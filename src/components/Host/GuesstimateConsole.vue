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
              <!-- <button @click="guessPrice" class="btn btn-warning me-3">
                Guess Price
              </button> -->
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
                      pattern="-?[0-9]*([.][0-9]{1,})?"
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
              <div class="row justify-content-center">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="my-input">ไฟล์รูปภาพ</label>
                    <input
                      v-if="
                        this.gameData.quiz.questionPic.length == 0 ||
                        this.gameData.quiz.questionPic.search('data:image/') !=
                          -1
                      "
                      id="my-input"
                      class="form-control"
                      @change="handleImage"
                      type="file"
                      accept="image/*"
                    />
                  </div>

                  <div class="mt-1">
                    <input
                      v-if="
                        this.gameData.quiz.questionPic.search('data:image/') ==
                        -1
                      "
                      type="text"
                      class="form-control"
                      placeholder="Pic URL"
                      aria-label="Prefix"
                      v-model="this.gameData.quiz.questionPic"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <button
                    class="btn btn-primary w-100 mt-1"
                    type="button"
                    @click="showPic = !showPic"
                  >
                    {{ showPic ? "ปิด" : "เปิด" }}รูป
                  </button>
                  <img
                    v-if="showPic"
                    style="width: 100%"
                    :src="this.gameData.quiz.questionPic"
                  />
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
            <button
              @click="revealAnswer"
              v-if="gameData.inGameStage == 1"
              class="w-100 btn btn-success mb-3"
            >
              Reveal Answer
            </button>
            <button
              @click="revealCorrect"
              v-if="gameData.inGameStage == 2"
              class="w-100 btn btn-lime mb-3"
            >
              Reveal Corect
            </button>
            <!-- {{ playerData }} -->
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
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center text-center mt-3 row-gap-3"
    >
      <div class="col" v-for="pl in playerData" :key="pl.uuid">
        <div class="card scale-in-hor-center h-100">
          <div class="card-header h-100">
            <button class="btn btn-danger" @click="arscore(pl.uuid, -1)">
              <i class="fas fa-minus"></i>
            </button>
            <h1 class="card-text text-center w-100">
              {{ pl.playerName }} ({{ pl.score }})
            </h1>
            <button class="btn btn-success" @click="arscore(pl.uuid, 1)">
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <transition
            enter-active-class="scale-in-hor-center"
            leave-active-class="scale-out-hor-center"
            mode="out-in"
          >
            <div
              class="card-body text-danger"
              v-if="gameData.inGameStage == 1 && pl.lockDown == false"
            >
              <h1>Not Answer</h1>
            </div>
            <div
              class="card-body text-success"
              v-else-if="gameData.inGameStage == 1 && pl.lockDown == true"
            >
              <h1>Answered</h1>
            </div>
            <div
              class="card-body text-danger"
              v-else-if="gameData.inGameStage == 2 && pl.lockDown == false"
            >
              <h1>Not Answer</h1>
            </div>
            <div
              class="card-body"
              v-else-if="gameData.inGameStage == 2 && pl.lockDown == true"
            >
              <h1 v-if="gameData.quiz.questionType == 'E'">
                {{ gameData.quiz.answerPrefix }} {{ pl.ans }}
                {{ gameData.quiz.answerSuffix }}
              </h1>
              <h1 v-else-if="gameData.quiz.questionType == 'R1'">
                {{ gameData.quiz.answerPrefix }} {{ pl.min }} - {{ pl.max }}
                {{ gameData.quiz.answerSuffix }}
              </h1>
            </div>
            <div
              class="card-body"
              v-else-if="gameData.inGameStage == 3 && pl.lockDown == true"
            >
              <h1 v-if="gameData.quiz.questionType == 'E'">
                Diff. = {{ pl.size }} <br />
                (+ {{ pl.answerStatus }} pts.)
              </h1>
              <h1 v-else-if="gameData.quiz.questionType == 'R1'">
                <div v-if="pl.answerStatus == 'correct_smallest'">
                  Smallest + 3 pts.
                </div>
                <div v-else-if="pl.answerStatus == 'correct'">+ 1 pts.</div>
                <div v-else-if="pl.answerStatus == 'correct_largest'">
                  Largest
                </div>
                <div v-else>Incorrect</div>
              </h1>
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
      showPic: false,
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
          questionPic: "",
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
    revealAnswer() {
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.inGameStage = 2; // for start question
      dat.playerData = this.playerData;
      this.$socket.emit("hostGameUpdate", dat);
    },
    revealCorrect() {
      let ans = +this.gameData.answer.answer; //get answer of question

      let pd = JSON.parse(JSON.stringify(this.playerData)); // for Not Same Array
      if (this.gameData.quiz.questionType == "E") {
        // Closed Answer
        pd.forEach((e) => {
          if (e.lockDown) {
            e.size = Math.abs(+e.ans - ans);
          }
        });
        console.log(pd);

        pd.sort((a, b) => {
          // hight to low
          return b.size - a.size;
        });

        let max = pd[0].size;
        let score = 1;

        pd.forEach((e) => {
          if (e.lockDown) {
            if (e.size < max) {
              score += 1;
              max = e.size;
            }
            e.score += score;
            e.answerStatus = score;
          }
        });

        //put Result
        this.playerData.forEach((e, i) => {
          let idx = pd.findIndex((el) => {
            return el.uuid == e.uuid;
          });
          this.playerData[i] = pd[idx];
        });
      } else if (this.gameData.quiz.questionType == "R1") {
        // Answer For Range
        let cor = 0;
        let incor = 0;

        pd.forEach((pl) => {
          if (pl.lockDown) {
            // is answered
            if (+pl.min <= ans && +pl.max >= ans) {
              //correct
              pl.answerStatus = "correct";
              pl.size = Math.abs(+pl.min - +pl.max);

              cor++;
            } else {
              //incorrect
              pl.answerStatus = "incorrect";
              incor++;
            }
          }
        });

        console.log(`Room ${this.gameRoom.roomId} > ${cor} | ${incor}`);

        //find smallest and largest
        let min = 0;
        let max = 0;
        let i = 1;
        pd.forEach((pl) => {
          if (pl.lockDown && pl.answerStatus == "correct") {
            // answer and correct
            if (i == 1) {
              // set first
              min = pl.size;
              max = pl.size;
            } else {
              //set min max
              if (min > pl.size) {
                min = pl.size;
              } else if (max < pl.size) {
                max = pl.size;
              }
            }
            i++;
          }
        });

        //scoring in mode

        pd.forEach((pl) => {
          if (pl.lockDown && pl.answerStatus == "correct") {
            // answer and correct
            if (pl.size == min) {
              // is the least
              pl.score += 3;
              pl.answerStatus = "correct_smallest";
            } else if (pl.size != max) {
              // not least but not max
              pl.score += 1;
            } else if (incor > 0) {
              // max but have incor
              pl.score += 1;
            } else {
              // no incor and max
              pl.answerStatus = "correct_largest";
            }
          }
        });

        //put Result
        this.playerData.forEach((e, i) => {
          let idx = pd.findIndex((el) => {
            return el.uuid == e.uuid;
          });
          this.playerData[i] = pd[idx];
        });
      }

      // For Gather

      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.inGameStage = 3; // for start question
      dat.playerData = this.playerData;
      this.$socket.emit("hostGameUpdate", dat);
    },
    guessPrice() {
      this.gameData.quiz.question = "สิ่งนี้ ราคาเท่าไหร่ ?";
      this.gameData.quiz.answerSuffix = "บาท";
    },

    async handleImage(e) {
      // console.log(e.target.files.length);
      // return;
      if (e.target.files.length > 0) {
        const selecetImg = e.target.files[0];

        this.createBase64Image(selecetImg);
      } else {
        this.gameData.quiz.questionPic = "";
      }
    },
    createBase64Image(fileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.gameData.quiz.questionPic = e.target.result;
      };
      reader.readAsDataURL(fileObj);
    },
    arscore(uuid, score) {
      let idx = this.playerData.findIndex((e) => e.uuid == uuid);
      this.playerData[idx].score += score;

      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.playerData = this.playerData.map((e) => {
        let d = e;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
  },
};
</script>

<style>
</style>