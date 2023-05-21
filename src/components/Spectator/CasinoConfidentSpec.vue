<template>
  <div>
    <transition
      enter-active-class="scale-in-hor-center"
      leave-active-class="scale-out-hor-center"
      mode="out-in"
    >
      <div v-if="gameData.phase < 2">
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
      <div v-else-if="gameData.phase == 2">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6 col-sm-12 mx-auto mb-3">
            <div class="card">
              <div class="card-body">
                <h1 class="text-center">
                  Topic :
                  {{ gameData.showNow == 0 ? "???" : gameData.quiz.quiz_topic }}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 3">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6 col-sm-12 mx-auto mb-3">
            <div class="card">
              <div class="card-body">
                <h1 class="text-center">
                  Topic :
                  {{ gameData.quiz.quiz_topic }}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 4">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6 col-sm-12 mx-auto mb-3">
            <div class="card mb-2">
              <div class="card-body">
                <h1 class="text-center">
                  {{ gameData["quiz"].quiz_question }}
                </h1>
              </div>
            </div>
            <div
              class="row row-gap-2"
              :class="{
                'row-cols-3': gameData.quiz.quiz_choice.length > 4,
                'row-cols-2': gameData.quiz.quiz_choice.length <= 4,
              }"
            >
              <div
                class="col"
                v-for="(c, idx) in gameData.quiz.quiz_choice"
                :key="idx"
              >
                <div class="card h-100" :class="'choice-' + (idx + 1)">
                  <div
                    class="card-body text-center"
                    v-if="gameData.showNow > idx"
                  >
                    {{ c }}
                  </div>
                  <div class="card-body text-center" v-else>???</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-lg-6 col-md-6 col-sm-12"
            v-if="gameData.quiz.quiz_picLink"
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
                  :src="gameData.quiz.quiz_picLink"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase <= 7">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6 col-sm-12 mx-auto mb-3">
            <div class="card mb-2">
              <div class="card-body">
                <h1 class="text-center">
                  {{ gameData["quiz"].quiz_question }}
                </h1>
              </div>
            </div>
            <div
              class="row row-gap-2"
              :class="{
                'row-cols-3': gameData.quiz.quiz_choice.length > 4,
                'row-cols-2': gameData.quiz.quiz_choice.length <= 4,
              }"
            >
              <div
                class="col"
                v-for="(c, idx) in gameData.quiz.quiz_choice"
                :key="idx"
              >
                <div class="card h-100" :class="'choice-' + (idx + 1)">
                  <div class="card-body text-center">{{ c }}</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-lg-6 col-md-6 col-sm-12"
            v-if="gameData.quiz.quiz_picLink"
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
                  :src="gameData.quiz.quiz_picLink"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 8">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6 col-sm-12 mx-auto mb-3">
            <div class="card mb-2">
              <div class="card-body">
                <h1 class="text-center">
                  {{ gameData["quiz"].quiz_question }}
                </h1>
              </div>
            </div>
            <div
              class="row row-gap-2"
              :class="{
                'row-cols-3': gameData.quiz.quiz_choice.length > 4,
                'row-cols-2': gameData.quiz.quiz_choice.length <= 4,
              }"
              v-if="gameData.quiz.quiz_type == 'MCQ'"
            >
              <div
                class="col"
                v-for="(c, idx) in gameData.quiz.quiz_choice"
                :key="idx"
              >
                <div
                  class="card h-100"
                  :class="'choice-' + (idx + 1)"
                  v-if="c == gameData.answer.answer"
                >
                  <div class="card-body text-center">{{ c }}</div>
                </div>
              </div>
            </div>

            <div
              class="row row-gap-2"
              :class="{
                'row-cols-3': gameData.quiz.quiz_choice.length > 4,
                'row-cols-2': gameData.quiz.quiz_choice.length <= 4,
              }"
              v-if="gameData.quiz.quiz_type == 'SORT'"
            >
              <div
                class="col"
                v-for="(c, idx) in gameData.answer.answer_sort"
                :key="idx"
              >
                <div class="card h-100">
                  <div class="card-body text-center">
                    {{ idx + 1 }} | {{ c }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-lg-6 col-md-6 col-sm-12"
            v-if="gameData.quiz.quiz_picLink"
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
                  :src="gameData.quiz.quiz_picLink"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 9">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6 col-sm-12 mx-auto mb-3">
            <div class="card">
              <div class="card-body">
                <h1 class="text-center">สรุปผล</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center text-center mt-4 row-gap-3 mb-3"
    >
      <div class="col" v-for="pl in playerData" :key="pl.uuid">
        <div class="card scale-in-hor-center h-100">
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
            <div class="card-body" v-if="gameData.phase == 1">
              <h1>Chip : {{ pl.chip_unscore }}</h1>
              <h1>Quiz Remain : {{ pl.quiz_play_remain }}</h1>
            </div>
            <div
              class="card-body text-danger"
              v-else-if="gameData.phase == 2 && pl.lockDown == false"
            >
              <h1>กำลังลงเดิมพัน</h1>
            </div>
            <div
              class="card-body text-success"
              v-else-if="gameData.phase == 2 && pl.lockDown == true"
            >
              <h1>ลงเดิมพันเรียบร้อย</h1>
            </div>

            <div
              class="card-body text-success"
              v-else-if="gameData.phase == 3 && pl.quiz_play == true"
            >
              <h1>Bet {{ pl.chip_inplay }} Chip</h1>
            </div>
            <div
              class="card-body text-danger"
              v-else-if="gameData.phase == 3 && pl.quiz_play == false"
            >
              <h1>Not Play</h1>
            </div>

            <div
              class="card-body text-danger"
              v-else-if="gameData.phase == 5 && pl.quiz_play"
            >
              <h1 v-if="gameData.quiz.quiz_type == 'MCQ'">
                {{ pl.chip_unchoose }} Remain
              </h1>
              <h1 v-else>
                {{ pl.chip_choice.filter((e) => e == null).length }} Rank Remain
              </h1>
            </div>
            <div class="card-body text-danger" v-else-if="gameData.phase == 5">
              <h1>Not Play</h1>
            </div>

            <div
              class="card-body"
              v-else-if="gameData.phase == 7 && pl.quiz_play == true"
            >
              <div
                class="row row-gap-2"
                :class="{
                  'row-cols-3': gameData.quiz.quiz_choice.length > 4,
                  'row-cols-2': gameData.quiz.quiz_choice.length <= 4,
                }"
                v-if="gameData.quiz.quiz_type == 'MCQ'"
              >
                <div
                  class="col"
                  v-for="(c, idx) in gameData.quiz.quiz_choice"
                  :key="idx"
                >
                  <div class="card" :class="'choice-' + (idx + 1)">
                    <div class="card-body text-center">
                      {{ pl.chip_choice[idx] }}
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="row row-gap-2"
                v-if="gameData.quiz.quiz_type == 'SORT'"
              >
                <div
                  class="col-12 col-xl-6"
                  v-for="(c, idx) in gameData.quiz.quiz_choice"
                  :key="idx"
                >
                  <div class="card h-100">
                    <div class="card-body text-center">
                      {{ idx + 1 }} | {{ pl.chip_choice[idx] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="card-body text-danger h-100"
              v-else-if="gameData.phase == 7"
            >
              <h1>Not Play</h1>
            </div>
            <div
              class="card-body"
              v-else-if="gameData.phase == 8 && pl.quiz_play == true"
            >
              <div
                class="row row-gap-2"
                :class="{
                  'row-cols-3': gameData.quiz.quiz_choice.length > 4,
                  'row-cols-2': gameData.quiz.quiz_choice.length <= 4,
                }"
                v-if="gameData.quiz.quiz_type == 'MCQ'"
              >
                <div
                  class="col"
                  v-for="(c, idx) in gameData.quiz.quiz_choice"
                  :key="idx"
                >
                  <div
                    class="card"
                    :class="'choice-' + (idx + 1)"
                    v-if="c == gameData.answer.answer"
                  >
                    <div class="card-body text-center">
                      {{ pl.chip_choice[idx] }}
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="row row-gap-2"
                v-if="gameData.quiz.quiz_type == 'SORT'"
              >
                <div
                  class="col-12 col-xl-6"
                  v-for="(c, idx) in pl.chip_choice"
                  :key="idx"
                >
                  <div
                    class="card text-white"
                    :class="{
                      'bg-danger': c != gameData.answer.answer_sort[idx],
                      'bg-success': c == gameData.answer.answer_sort[idx],
                    }"
                  >
                    <div class="card-body text-center">
                      {{ idx + 1 }} | {{ c }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body text-danger" v-else-if="gameData.phase == 8">
              <h1>Not Play</h1>
            </div>
            <div
              class="card-body text-success"
              v-else-if="gameData.phase == 9 && pl.quiz_play == true"
            >
              <h1>+{{ pl.result_quiz_score }}</h1>
            </div>
            <div class="card-body text-danger" v-else-if="gameData.phase == 9">
              <h1>Not Play</h1>
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
      if (data.timerData) this.timerData = data.timerData;
    });
  },
  unmounted() {
    this.$socket.off("spectatorGameInfo");
  },
};
</script>

<style scoped>
div[class*="choice-"] > div {
  color: white;
  font-size: 1.25em;
}
.choice-1 {
  background-color: #6c6874 !important;
}
.choice-2 {
  background-color: #7fb5b5 !important;
}
.choice-3 {
  background-color: #a98307 !important;
}
.choice-4 {
  background-color: #287233 !important;
}
.choice-5 {
  background-color: #763c28 !important;
}
.choice-6 {
  background-color: #d84b20 !important;
}
</style>