<template>
  <div>
    <transition
      enter-active-class="scale-in-hor-center"
      leave-active-class="scale-out-hor-center"
      mode="out-in"
    >
      <div v-if="gameData.inGameStage > 0">
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
            <transition
              enter-active-class="scale-in-hor-center"
              leave-active-class="scale-out-hor-center"
              mode="out-in"
            >
              <div class="card mt-2" v-if="gameData.inGameStage == 3">
                <div class="card-body">
                  <h1 class="text-center">คำตอบ</h1>

                  <h2 class="text-center">
                    {{ gameData.quiz.answerPrefix }}
                    {{ gameData.answer.answer }}
                    {{ gameData.quiz.answerSuffix }}
                  </h2>
                </div>
              </div>
              <div class="card mt-2" v-else>
                <div class="card-body">
                  <h1 class="text-center">คำตอบ</h1>

                  <h2 class="text-center">
                    {{ gameData.quiz.answerPrefix }}
                    ???
                    {{ gameData.quiz.answerSuffix }}
                  </h2>
                </div>
              </div>
            </transition>
          </div>
          <div
            class="col-lg-6 col-md-6 col-sm-12"
            v-if="gameData.quiz.questionPic"
          >
            <div class="card">
              <div class="card-body">
                <img
                  style="
                    display: block;
                    max-height: 300px;
                    margin-left: auto;
                    margin-right: auto;
                  "
                  :src="gameData.quiz.questionPic"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6 col-sm-12 mx-auto mb-3">
            <div class="card">
              <div class="card-body">
                <h1 class="text-center">กำลังรอคำถาม</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div
      class="row row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center text-center mt-3 row-gap-3"
    >
      <div class="col" v-for="pl in playerData" :key="pl.uuid">
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
            <div
              class="card-body"
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
export default {
  props: ["roomId"],
  data() {
    return {
      gameData: {},
      playerData: [],
    };
  },
  created() {
    // alert("New Gamme");
    this.$socket.emit("spectatorGameInfo", this.roomId);
  },
  mounted() {
    //GET GAME INFO UPDATE
    this.$socket.on("spectatorGameInfo", (data) => {
      if (data.gameData) this.gameData = data.gameData;
      if (data.playerData) this.playerData = data.playerData;
    });
  },
  unmounted() {
    this.$socket.off("spectatorGameInfo");
  },
};
</script>

<style>
</style>