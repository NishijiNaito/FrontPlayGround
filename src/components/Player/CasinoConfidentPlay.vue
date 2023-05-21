<template>
  <div>
    <transition
      enter-active-class="scale-in-hor-center"
      leave-active-class="scale-out-hor-center"
      mode="out-in"
    >
      <div v-if="gameData.phase == -1">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }}
                  </h1>
                  <h3 class="mb-2 text-center">Waiting For Config This Game</h3>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 0">
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
                    {{ myPlayerData.chip_unscore }} Chips |
                    {{ myPlayerData.score }} Point
                  </h1>
                  <h3 class="mb-2 text-center">Waiting For Question</h3>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 2 && myPlayerData.lockDown == false">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    Topic :
                    {{
                      gameData.showNow == 0 ? "???" : gameData.quiz.quiz_topic
                    }}
                  </h1>
                </div>
              </div>
            </div>

            <div
              class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto"
              v-show="gameData.showNow == 1"
            >
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">ลงเดิมพัน</h1>
                  <h2 class="text-center">
                    จำนวนคำถามที่ต้องเล่น :
                    {{ myPlayerData.quiz_play_remain }} (ขั้นต่ำ
                    {{ gameData.requireChipPerQuiz }} Chips)
                  </h2>
                  <h2 class="text-center">
                    จำนวน Chip :
                    {{ myPlayerData.chip_unscore }}
                  </h2>
                  <div class="mt-3">
                    <h2 class="text-center">
                      Chip ที่เล่น : {{ myPlayerData.chip_inplay }}
                    </h2>
                  </div>
                  <div
                    class="row row-cols-4 justify-content-center row-gap-3 mb-1"
                  >
                    <div class="col">
                      <button
                        class="btn btn-danger w-100"
                        :disabled="myPlayerData.chip_inplay < 5"
                        @click="chipplay(-5)"
                      >
                        -5
                      </button>
                    </div>
                    <div class="col">
                      <button
                        class="btn btn-danger w-100"
                        :disabled="myPlayerData.chip_inplay < 1"
                        @click="chipplay(-1)"
                      >
                        -1
                      </button>
                    </div>

                    <div class="col">
                      <button
                        class="btn btn-success w-100"
                        :disabled="
                          myPlayerData.chip_unscore -
                            (myPlayerData.quiz_play_remain - 1 < 0
                              ? 0
                              : myPlayerData.quiz_play_remain - 1) *
                              gameData.requireChipPerQuiz <
                          1
                        "
                        @click="chipplay(1)"
                      >
                        +1
                      </button>
                    </div>
                    <div class="col">
                      <button
                        class="btn btn-success w-100"
                        :disabled="
                          myPlayerData.chip_unscore -
                            (myPlayerData.quiz_play_remain - 1 < 0
                              ? 0
                              : myPlayerData.quiz_play_remain - 1) *
                              gameData.requireChipPerQuiz <
                          5
                        "
                        @click="chipplay(5)"
                      >
                        +5
                      </button>
                    </div>
                  </div>
                  <div
                    class="row row-cols-2 justify-content-center row-gap-3 mb-1"
                  >
                    <div class="col">
                      <button
                        class="btn btn-danger w-100"
                        @click="submitBet(false)"
                      >
                        ไม่เล่น Topic นี้
                      </button>
                    </div>
                    <div class="col">
                      <button
                        class="btn btn-success w-100"
                        :disabled="myPlayerData.chip_inplay < 1"
                        @click="submitBet(true)"
                      >
                        ลงเดิมพัน
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="page page-center">
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
        </div> -->
      </div>
      <div v-else-if="gameData.phase == 2 && myPlayerData.lockDown == true">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    Topic :
                    {{
                      gameData.showNow == 0 ? "???" : gameData.quiz.quiz_topic
                    }}
                  </h1>
                </div>
              </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">ลงเดิมพันเรียบร้อย</h1>
                  <div class="mt-3">
                    <h2 class="text-center">
                      Chip ที่เล่น : {{ myPlayerData.chip_inplay }}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="page page-center">
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
        </div> -->
      </div>

      <div v-else-if="gameData.phase == 3">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    Topic :
                    {{ gameData.quiz.quiz_topic }}
                  </h1>
                </div>
              </div>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">ลงเดิมพันเรียบร้อย</h1>
                  <div class="mt-3">
                    <h2 class="text-center">
                      Chip ที่เล่น : {{ myPlayerData.chip_inplay }}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="page page-center">
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
        </div> -->
      </div>
      <div v-else-if="gameData.phase == 4">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
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
                        <div
                          class="card-body text-center"
                          v-if="gameData.showNow > idx"
                        >
                          {{ q }}
                        </div>
                        <div class="card-body text-center" v-else>???</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="page page-center">
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
        </div> -->
      </div>
      <div v-else-if="gameData.phase == 5">
        <div class="page page-center" v-if="myPlayerData.quiz_play">
          <div
            class="row align-items-center"
            v-if="gameData.quiz.quiz_type == 'MCQ'"
          >
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

            <div class="col-lg-6 col-md-6 col-sm-12 mb-3">
              <div class="card">
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
            <div class="sticky">
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
            </div>
          </div>
          <div class="row align-items-center" v-else>
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

            <div class="col-lg-6 col-md-6 col-sm-12 mb-3">
              <div class="card">
                <div class="card-body">
                  <div
                    class="row row-cols-1 row-cols-lg-2 justify-content-center row-gap-3"
                  >
                    <div
                      class="col"
                      v-for="(q, idx) in gameData.quiz.quiz_choice"
                      :key="idx"
                      @click="choiceSelect = idx"
                    >
                      <div
                        class="card"
                        :class="{
                          'card-active': idx == choiceSelect,
                          'border-success':
                            myPlayerData.chip_choice.findIndex((e) => e == q) !=
                            -1,
                        }"
                        style="cursor: pointer"
                      >
                        <div class="card-body text-center">{{ q }}</div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div
                    class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-gap-2 justify-content-center mt-3"
                  >
                    <div
                      class="col"
                      @click="rankSelect = idx"
                      v-for="(sc, idx) in myPlayerData.chip_choice"
                      :key="idx"
                      style="cursor: pointer"
                    >
                      <div
                        class="card h-100"
                        :class="{
                          'card-active': idx == rankSelect,
                          'border-success': sc != null,
                        }"
                      >
                        <div class="card-body">
                          อันดับ{{ idx + 1 }} >
                          {{ sc == null ? "ยังไม่กำหนด" : sc }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="sticky">
              <div class="card">
                <div class="card-body">
                  <h1 class="card-text text-center inline w-100">
                    Bet Chip : {{ myPlayerData.chip_unchoose }}
                  </h1>

                  <h3 class="card-text text-center inline w-100">
                    โปรดเลือกตัวเลือกที่ต้องการ จากนั้นเลือกลำดับที่จะใส่
                  </h3>
                  <h3 class="card-text text-center inline w-100">
                    กดลำดับที่ต้องการเพื่อที่จะลบคำตอบของลำดับนั้น
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="page page-center" v-else>
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
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
                        <div class="card-body text-center">
                          {{ q }}
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
      <div v-else-if="gameData.phase == 6 || gameData.phase == 7">
        <div class="page page-center" v-if="myPlayerData.quiz_play">
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
                    v-if="gameData.quiz.quiz_type == 'MCQ'"
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
                  <div
                    class="row row-cols-1 row-cols-lg-2 justify-content-center row-gap-3"
                    v-else-if="gameData.quiz.quiz_type == 'SORT'"
                  >
                    <div
                      class="col"
                      v-for="(q, idx) in myPlayerData.chip_choice"
                      :key="idx"
                    >
                      <div class="card">
                        <div class="card-body text-center">
                          อันดับที่ {{ idx + 1 }}
                        </div>
                        <div class="card-footer h-100">
                          <h1 class="card-text text-center inline w-100">
                            {{ q }}
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
        <div class="page page-center" v-else>
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12 mb-3 mx-auto">
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
                        <div class="card-body text-center">
                          {{ q }}
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
      <div v-else-if="gameData.phase == 8">
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
                    v-if="gameData.quiz.quiz_type == 'MCQ'"
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
                          v-show="myPlayerData.quiz_play"
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
                  <div
                    class="row row-cols-1 row-cols-lg-2 justify-content-center row-gap-3"
                    v-if="
                      gameData.quiz.quiz_type == 'SORT' &&
                      myPlayerData.quiz_play
                    "
                  >
                    <div
                      class="col"
                      v-for="(q, idx) in myPlayerData.chip_choice"
                      :key="idx"
                    >
                      <div
                        class="card text-white"
                        :class="{
                          'bg-danger': q != gameData.answer.answer_sort[idx],
                          'bg-success': q == gameData.answer.answer_sort[idx],
                        }"
                      >
                        <div class="card-body text-center">
                          อันดับที่ {{ idx + 1 }}
                        </div>
                        <div
                          class="card-footer h-100"
                          :class="{
                            'bg-danger': q != gameData.answer.answer_sort[idx],
                            'bg-success': q == gameData.answer.answer_sort[idx],
                          }"
                        >
                          <h1 class="card-text text-center inline w-100">
                            {{ q }}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="row row-cols-1 row-cols-lg-2 justify-content-center row-gap-3"
                    v-if="
                      gameData.quiz.quiz_type == 'SORT' &&
                      !myPlayerData.quiz_play
                    "
                  >
                    <div
                      class="col"
                      v-for="(q, idx) in gameData.answer.answer_sort"
                      :key="idx"
                    >
                      <div class="card">
                        <div class="card-body text-center">
                          อันดับที่ {{ idx + 1 }}
                        </div>
                        <div class="card-footer h-100">
                          <h1 class="card-text text-center inline w-100">
                            {{ q }}
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
      <div v-else-if="gameData.phase == 9">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }}
                  </h1>
                  <h2 class="mb-2 text-center">
                    คะแนนของคุณ : {{ myPlayerData.score }} (+{{
                      myPlayerData.result_quiz_score
                    }})
                  </h2>
                  <h2 class="mb-2 text-center">
                    Chip ที่ต้องเล่นอีก : {{ myPlayerData.chip_unscore }}
                  </h2>
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
      rankSelect: null,
      choiceSelect: null,
    };
  },
  watch: {
    rankSelect(rs) {
      // index
      if (rs != null) {
        if (this.myPlayerData.chip_choice[rs] != null) {
          //คะแนนนี้มีอยู่แล้ว
          this.myPlayerData.chip_choice[rs] = null;
          this.rankSelect = null;
          this.choiceSelect = null;
        } else {
          // ยังไม่มี
          if (this.choiceSelect != null) {
            // เลือกคัวเลือกแล้ว

            this.myPlayerData.chip_choice[rs] =
              this.gameData.quiz.quiz_choice[this.choiceSelect];
            this.rankSelect = null;
            this.choiceSelect = null;
          }
        }
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
      }
    },
    choiceSelect(cs) {
      if (cs != null) {
        if (this.rankSelect != null) {
          //คะแนนถูกเลือกแล้ว

          this.myPlayerData.chip_choice[this.rankSelect] =
            this.gameData.quiz.quiz_choice[cs];
          this.rankSelect = null;
          this.choiceSelect = null;
        }
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
      }
    },
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
      if (data.gameData) {
        this.gameData = data.gameData;
        if (data.gameData.phase == 6) this.selectChoice = null;
      }
      if (data.timerData) this.timerData = data.timerData;
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
    chipplay(chip) {
      if (this.myPlayerData.quiz_play_remain > 0) {
        if (
          chip > 0 &&
          this.myPlayerData.chip_inplay < this.gameData.requireChipPerQuiz
        ) {
          // add
          this.myPlayerData.chip_unscore -= this.gameData.requireChipPerQuiz;
          this.myPlayerData.chip_inplay += this.gameData.requireChipPerQuiz;
        } else if (
          chip < 0 &&
          this.myPlayerData.chip_inplay + chip <
            this.gameData.requireChipPerQuiz
        ) {
          // del when
          this.myPlayerData.chip_unscore += this.myPlayerData.chip_inplay;
          this.myPlayerData.chip_inplay = 0;
        } else {
          this.myPlayerData.chip_unscore -= chip;
          this.myPlayerData.chip_inplay += chip;
        }
      } else {
        this.myPlayerData.chip_unscore -= chip;
        this.myPlayerData.chip_inplay += chip;
      }
    },
    submitBet(play) {
      if (play) {
        // play this Topic

        this.myPlayerData.quiz_play = true;
        this.myPlayerData.lockDown = true;
      } else {
        // Fold this Topic
        this.myPlayerData.chip_unscore += this.myPlayerData.chip_inplay;
        this.myPlayerData.chip_inplay = 0;
        this.myPlayerData.quiz_play = false;
        this.myPlayerData.lockDown = true;
      }
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
</style>