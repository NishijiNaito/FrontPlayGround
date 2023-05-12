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
      <div
        v-else-if="
          gameData.phase == 3 || gameData.phase == 4 || gameData.phase == 5
        "
      >
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
                <div class="card" :class="'choice-' + (idx + 1)">
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
      <div v-else-if="gameData.phase == 6">
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
                <div
                  class="card"
                  :class="'choice-' + (idx + 1)"
                  v-if="c == gameData.answer.answer"
                >
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
    </transition>

    <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center text-center mt-4 row-gap-3 mb-3"
    >
      <div class="col" v-for="pl in playerData" :key="pl.uuid">
        <div class="card scale-in-hor-center h-100">
          <div class="card-header h-100">
            <h1 class="card-text text-center w-100">
              {{ pl.playerName }} ({{ pl.chip_remain }})
            </h1>
          </div>
          <transition
            enter-active-class="scale-in-hor-center"
            leave-active-class="scale-out-hor-center"
            mode="out-in"
          >
            <div
              class="card-body text-danger"
              v-if="gameData.phase == 3 && pl.lockDown == false"
            >
              <h1>{{ pl.chip_unchoose }} Chip Remain</h1>
            </div>
            <div class="card-body" v-else-if="gameData.phase == 5">
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
                  <div class="card" :class="'choice-' + (idx + 1)">
                    <div class="card-body text-center">
                      {{ pl.chip_choice[idx] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body" v-else-if="gameData.phase == 6">
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

<style>
div[class*="choice-"] > div {
  color: white;
  font-size: 1.25em;
}
.choice-1 {
  background-color: #6c6874;
}
.choice-2 {
  background-color: #7fb5b5;
}
.choice-3 {
  background-color: #a98307;
}
.choice-4 {
  background-color: #287233;
}
.choice-5 {
  background-color: #763c28;
}
.choice-6 {
  background-color: #d84b20;
}
</style>