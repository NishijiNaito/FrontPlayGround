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
                  <h1 class="text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="mb-3 text-center">PHASE 0 ตั้งค่าเกม</h2>
                  <h3 class="text-center">รอ Host ตั้งค่าเกม</h3>
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
                  <h1 class="text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="mb-3 text-center">PHASE 1 สุ่มหมวดหมู่</h2>
                  <h3 class="text-center">หมวดหมู่ที่ได้</h3>
                  <h3 class="text-center mb-3">[ {{ gameData.category }} ]</h3>

                  <button
                    type="button"
                    @click="submitAnswer"
                    v-if="myPlayerData.is_ready == false"
                    class="w-100 btn btn-info mt-1"
                  >
                    กดเมื่อดูคำเรียบร้อย
                  </button>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 2 && myPlayerData.is_ready == false">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="mb-3 text-center">PHASE 2 สุ่มตัวเลข</h2>
                  <h3 class="text-center">
                    หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
                  </h3>

                  <button
                    type="button"
                    @click="randomNumber"
                    class="w-100 btn btn-info mt-1"
                  >
                    กดเพื่อสุ่มเลข
                  </button>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 2 && myPlayerData.is_ready == true">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="mb-3 text-center">PHASE 2 สุ่มตัวเลข</h2>
                  <h3 class="text-center mb-3">
                    หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
                  </h3>

                  <h3 class="text-center mb-2">ตัวเลขที่ได้</h3>

                  <div class="text-center" style="font-size: 5rem">
                    {{ myPlayerData.level }}
                  </div>

                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="gameData.phase == 3 && myPlayerData.is_ready == false">
        <div class="page page-center">
          <div class="row justify-content-center align-items-center row-gap-2">
            <div class="col-lg-8 col-md-8 col-sm-12 h-100">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="mb-3 text-center">PHASE 3 แต่งเรื่อง</h2>
                  <h3 class="text-center mb-3">
                    หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
                  </h3>

                  <div v-if="gameData.writing">
                    <div class="text-center mb-3">
                      <button
                        @click="
                          myPlayerData.short_story =
                            myPlayerData.short_story + '|';
                          $refs.short_str.focus();
                        "
                        class="w-100 btn btn-dark mx-2 mt-2"
                      >
                        แบ่งคำพูด
                      </button>
                    </div>
                    <form @submit.prevent="submitStory">
                      <textarea
                        ref="short_str"
                        class="form-control mb-2"
                        rows="5"
                        style="font-size: 18px"
                        v-model="myPlayerData.short_story"
                      ></textarea>
                      {{ myPlayerData.short_story }}
                      <button
                        type="submit"
                        v-if="myPlayerData.is_ready == false"
                        class="w-100 btn btn-info mt-1"
                      >
                        กดเมื่อแต่งเรียบร้อย
                      </button>
                    </form>
                  </div>
                  <div v-else>
                    <button
                      type="button"
                      @click="submitAnswer"
                      v-if="myPlayerData.is_ready == false"
                      class="w-100 btn btn-info mt-1"
                    >
                      กดเมื่อคิดเรียบร้อย
                    </button>
                  </div>

                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-8 col-sm-12">
              <div class="card">
                <div class="card-body">
                  <div class="text-center" style="font-size: 5rem">
                    {{ myPlayerData.level }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="gameData.phase == 3 && myPlayerData.is_ready == true">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="mb-3 text-center">PHASE 4 แต่งเรื่อง</h2>
                  <h3 class="text-center mb-3">
                    หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
                  </h3>
                  <h3 class="text-center mb-2">
                    ตัวเลขที่ได้ {{ myPlayerData.level }}
                  </h3>
                  <h3 class="text-center mb-3">เรื่องของท่าน</h3>
                  <div class="text-center mb-3" style="text-size: 18px">
                    {{ myPlayerData.short_story.split("|").join("") }}
                  </div>

                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="gameData.phase == 4">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="text-center">PHASE 5 เล่าเรื่องเล่า</h2>

                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
              <div
                class="card mt-2"
                :class="{
                  'bg-success':
                    gameRoom.uuid == gameData.player_present_now &&
                    !gameData.writing,
                  'text-white':
                    gameRoom.uuid == gameData.player_present_now &&
                    !gameData.writing,
                }"
              >
                <div class="card-body" v-if="gameData.writing">
                  <div
                    class="text-center story"
                    v-if="gameRoom.uuid == gameData.player_present_now"
                  >
                    <h2 class="mb-2">Your Story</h2>
                    <button
                      @click="toNext"
                      v-show="
                        this.playerData.find(
                          (e) => e.uuid == gameData.player_present_now
                        ).short_story_postion +
                          1 !=
                        this.playerData.find(
                          (e) => e.uuid == gameData.player_present_now
                        ).short_story_all_split
                      "
                      class="btn btn-success mb-2"
                    >
                      แสดงส่วนถัดไป
                    </button>
                    <div v-html="ownerStory"></div>
                  </div>
                  <div class="text-center story" v-else>
                    <h2 class="mb-2">
                      Story Teller :
                      {{
                        playerData.find((e) => {
                          return e.uuid == gameData.player_present_now;
                        }).playerName
                      }}
                    </h2>
                    <div v-html="nowStory"></div>
                  </div>

                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
                <div class="card-body" v-else>
                  <div
                    class="text-center story"
                    v-if="gameRoom.uuid == gameData.player_present_now"
                  >
                    <h2 class="mb-2">ถึงตาคุณพูด</h2>
                  </div>
                  <div class="text-center story" v-else>
                    <h2 class="mb-2">
                      ผู้พูด :
                      {{
                        playerData.find((e) => {
                          return e.uuid == gameData.player_present_now;
                        }).playerName
                      }}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="gameData.phase == 5 && myPlayerData.is_ready == false">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="text-center">PHASE 5 ตอบคำถาม</h2>
                  <h3 class="text-center">
                    โปรดเลือกคนที่มีเลขมากสุด และ น้อยสุด
                  </h3>
                  <h3 class="text-center">
                    เลขของคุณ : {{ myPlayerData.level }}
                  </h3>

                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
              <div class="card mt-2">
                <div class="card-body">
                  <!-- <div>{{ gameRoom }}</div> -->
                  <transition
                    enter-active-class="scale-in-hor-center"
                    leave-active-class="scale-out-hor-center"
                    mode="out-in"
                  >
                    <button
                      @click="readyAnswer"
                      v-if="answeringTime == false"
                      class="w-100 btn btn-success"
                    >
                      พร้อมตอบคำถาม
                    </button>
                    <div v-else>
                      <div
                        class="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-gap-2"
                      >
                        <div
                          class="col"
                          @click="playerSelect = pl"
                          v-for="pl in answeringPlayerCanUse"
                          :key="pl"
                        >
                          <div
                            class="card"
                            :class="{ 'card-active': pl == playerSelect }"
                            style="cursor: pointer"
                          >
                            <div
                              class="card-body text-center"
                              style="font-size: 19px"
                            >
                              {{
                                playerData.find((e) => e.uuid == pl).playerName
                              }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />

                      <div
                        class="row row-cols-1 row-cols-sm-2 row-gap-2"
                        style="font-size: 19px"
                      >
                        <div class="col" @click="answerSelect = 'M'">
                          <div
                            class="card"
                            :class="{
                              'card-active': answerSelect == 'M',
                              'border-success':
                                myPlayerData.send_answer.mostPlayer != null,
                            }"
                            style="cursor: pointer"
                          >
                            <div class="card-body">
                              มากที่สุด >
                              {{
                                myPlayerData.send_answer.mostPlayer == null
                                  ? "ยังไม่กำหนด"
                                  : playerData.find(
                                      (e) =>
                                        e.uuid ==
                                        myPlayerData.send_answer.mostPlayer
                                    ).playerName
                              }}
                            </div>
                          </div>
                        </div>
                        <div class="col" @click="answerSelect = 'L'">
                          <div
                            class="card"
                            :class="{
                              'card-active': answerSelect == 'L',
                              'border-success':
                                myPlayerData.send_answer.leastPlayer != null,
                            }"
                            style="cursor: pointer"
                          >
                            <div class="card-body">
                              น้อยที่สุด >
                              {{
                                myPlayerData.send_answer.leastPlayer == null
                                  ? "ยังไม่กำหนด"
                                  : playerData.find(
                                      (e) =>
                                        e.uuid ==
                                        myPlayerData.send_answer.leastPlayer
                                    ).playerName
                              }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>

                  <button
                    type="button"
                    @click="submitAnswer"
                    v-if="
                      myPlayerData.send_answer.mostPlayer != null &&
                      myPlayerData.send_answer.leastPlayer != null &&
                      answeringTime
                    "
                    class="w-100 btn btn-info mt-3"
                  >
                    กดเมื่อตอบเรียบร้อย
                  </button>

                  <!-- <div>answerSelect :{{ answerSelect }}</div> -->
                  <!-- <div>playerSelect :{{ playerSelect }}</div> -->
                  <!-- <div>{{ rankingAllPlayerList }}</div> -->
                  <!-- <div>{{ answeringPlayerCanUse }}</div> -->
                  <!-- <div>{{ myPlayerData.send_answer }}</div> -->
                  <!-- <div>{{ send_score }}</div>  -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 5 && myPlayerData.is_ready == true">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="text-center">PHASE 5 ตอบคำถาม</h2>
                  <h3 class="text-center">ตอบคำถามเรียบร้อย</h3>
                  <div class="row row-gap-3" style="font-size: 19px">
                    <div class="col-12 col-md-6">
                      <div class="card">
                        <div class="card-body">
                          มากที่สุด >
                          {{
                            myPlayerData.send_answer.mostPlayer == null
                              ? "ยังไม่กำหนด"
                              : playerData.find(
                                  (e) =>
                                    e.uuid ==
                                    myPlayerData.send_answer.mostPlayer
                                ).playerName
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="card">
                        <div class="card-body">
                          น้อยที่สุด >
                          {{
                            myPlayerData.send_answer.leastPlayer == null
                              ? "ยังไม่กำหนด"
                              : playerData.find(
                                  (e) =>
                                    e.uuid ==
                                    myPlayerData.send_answer.leastPlayer
                                ).playerName
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="gameData.phase == 6">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-10 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="text-center mb-2">PHASE 6 แสดงคำตอบ</h2>
                  <h2 class="text-center mb-3">คำตอบของคุณ</h2>
                  <div class="row mb-2 row-gap-2" style="font-size: 18px">
                    <div class="col-12 col-md-6">
                      <div class="card">
                        <div class="card-body">
                          มากที่สุด >
                          {{
                            myPlayerData.send_answer.mostPlayer == null
                              ? "ยังไม่กำหนด"
                              : playerData.find(
                                  (e) =>
                                    e.uuid ==
                                    myPlayerData.send_answer.mostPlayer
                                ).playerName
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <div class="card">
                        <div class="card-body">
                          น้อยที่สุด >
                          {{
                            myPlayerData.send_answer.leastPlayer == null
                              ? "ยังไม่กำหนด"
                              : playerData.find(
                                  (e) =>
                                    e.uuid ==
                                    myPlayerData.send_answer.leastPlayer
                                ).playerName
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="mb-2 mt-2" />
                  <h2 class="text-center mb-3">ผู้เล่นคนอื่นๆ</h2>
                  <div
                    class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-2 justify-content-center"
                  >
                    <div class="col" v-for="pl in dataExeptMe" :key="pl.uuid">
                      <div class="card">
                        <div class="card-body fo-text">
                          {{ pl.playerName }} <br />
                          มากสุด :
                          {{
                            pl.send_answer.mostPlayer == null
                              ? "ยังไม่กำหนด"
                              : playerData.find(
                                  (e) => e.uuid == pl.send_answer.mostPlayer
                                ).playerName
                          }}
                          <br />
                          น้อยสุด :
                          {{
                            pl.send_answer.leastPlayer == null
                              ? "ยังไม่กำหนด"
                              : playerData.find(
                                  (e) => e.uuid == pl.send_answer.leastPlayer
                                ).playerName
                          }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- <div>{{ gameRoom }}</div> -->
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
                  <h1 class="text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="text-center">PHASE 7 เฉลยคำตอบ และ Challenge</h2>
                  <h2 class="text-center mt-2">
                    ทายว่ามากที่สุด >
                    {{
                      myPlayerData.send_answer.mostPlayer == null
                        ? "ยังไม่กำหนด"
                        : playerData.find(
                            (e) => e.uuid == myPlayerData.send_answer.mostPlayer
                          ).playerName
                    }}
                    ({{
                      myPlayerData.send_answer.mostPlayer == null
                        ? "ยังไม่กำหนด"
                        : playerData.find(
                            (e) => e.uuid == myPlayerData.send_answer.mostPlayer
                          ).level
                    }}) <br />
                    ทายว่าน้อยที่สุด >
                    {{
                      myPlayerData.send_answer.leastPlayer == null
                        ? "ยังไม่กำหนด"
                        : playerData.find(
                            (e) =>
                              e.uuid == myPlayerData.send_answer.leastPlayer
                          ).playerName
                    }}
                    ({{
                      myPlayerData.send_answer.leastPlayer == null
                        ? "ยังไม่กำหนด"
                        : playerData.find(
                            (e) =>
                              e.uuid == myPlayerData.send_answer.leastPlayer
                          ).level
                    }})
                  </h2>
                  <hr class="mb-2 mt-2" />

                  <h2 class="text-center mt-2">
                    มากที่สุด {{ gameData.result.mostLevel }} | น้อยที่สุด
                    {{ gameData.result.leastLevel }}
                  </h2>
                  <h2 class="text-center mb-2">
                    ได้ {{ myPlayerData.score_guess }} คะแนน
                  </h2>
                  <hr class="mb-2 mt-2" />
                  <h2 class="text-center mb-3">เลขของแต่ละคน</h2>
                  <div
                    class="row justify-content-center row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-gap-2 mb-2"
                  >
                    <div class="col" v-for="pl in playerData" :key="pl.uuid">
                      <div class="card">
                        <div class="card-body fo-text">
                          {{ pl.playerName }} | {{ pl.level }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      answeringTime: false,
      answeringAllPlayerList: [],
      answeringPlayerCanUse: [],
      send_answer: [],
      answerSelect: null,
      playerSelect: null,
    };
  },
  watch: {
    answerSelect(sc) {
      if (sc != null) {
        if (sc == "M") {
          // Most
          if (this.myPlayerData.send_answer.mostPlayer != null) {
            // มีอยู่แล้ว
            this.answeringPlayerCanUse.push(
              this.myPlayerData.send_answer.mostPlayer
            );
            this.myPlayerData.send_answer.mostPlayer = null;
            this.answerSelect = null;
            this.playerSelect = null;
          } else {
            // ยังไม่มี
            if (this.playerSelect != null) {
              // เลือกผู้เล่นแล้ว
              let pl_idx = this.answeringPlayerCanUse.findIndex(
                (e) => e == this.playerSelect
              );
              this.myPlayerData.send_answer.mostPlayer =
                this.answeringPlayerCanUse[pl_idx];
              this.answeringPlayerCanUse.splice(pl_idx, 1);
              this.answerSelect = null;
              this.playerSelect = null;
            }
          }
        } else {
          // Least
          if (this.myPlayerData.send_answer.leastPlayer != null) {
            // มีอยู่แล้ว
            this.answeringPlayerCanUse.push(
              this.myPlayerData.send_answer.leastPlayer
            );
            this.myPlayerData.send_answer.leastPlayer = null;
            this.answerSelect = null;
            this.playerSelect = null;
          } else {
            // ยังไม่มี
            if (this.playerSelect != null) {
              // เลือกผู้เล่นแล้ว
              let pl_idx = this.answeringPlayerCanUse.findIndex(
                (e) => e == this.playerSelect
              );
              this.myPlayerData.send_answer.leastPlayer =
                this.answeringPlayerCanUse[pl_idx];
              this.answeringPlayerCanUse.splice(pl_idx, 1);
              this.answerSelect = null;
              this.playerSelect = null;
            }
          }
        }
      }
    },
    playerSelect(ps) {
      if (ps != null) {
        let pl_idx = this.answeringPlayerCanUse.findIndex(
          (e) => e == this.playerSelect
        );

        if (this.answerSelect != null) {
          //คะแนนถูกเลือกแล้ว
          if (this.answerSelect == "M") {
            this.myPlayerData.send_answer.mostPlayer =
              this.answeringPlayerCanUse[pl_idx];
            this.answeringPlayerCanUse.splice(pl_idx, 1);
            this.answerSelect = null;
            this.playerSelect = null;
          } else {
            this.myPlayerData.send_answer.leastPlayer =
              this.answeringPlayerCanUse[pl_idx];
            this.answeringPlayerCanUse.splice(pl_idx, 1);
            this.answerSelect = null;
            this.playerSelect = null;
          }

          this.answerSelect = null;
          this.playerSelect = null;
        }
      }
    },
  },
  computed: {
    ...mapGetters(["gameRoom", "gameName"]),
    nowStory() {
      let story = "";
      let teller_detail = this.playerData.find(
        (e) => e.uuid == this.gameData.player_present_now
      );
      let story_split = teller_detail.short_story.split("|");
      // console.log(story_split);

      for (let index = 0; index <= teller_detail.short_story_postion; index++) {
        story += story_split[index];
      }
      if (
        teller_detail.short_story_postion + 1 ==
        teller_detail.short_story_all_split
      ) {
        story += "<br/> >>>END OF STORY<<<";
      }
      return story;
    },
    ownerStory() {
      let story = "";
      let teller_detail = this.playerData.find(
        (e) => e.uuid == this.gameData.player_present_now
      );
      let story_split = teller_detail.short_story.split("|");
      // console.log(story_split);

      for (
        let index = 0;
        index < teller_detail.short_story_postion + 1;
        index++
      ) {
        story += story_split[index];
      }
      story +=
        "<br/>Next : " +
        (story_split[teller_detail.short_story_postion + 1] || "END");

      return story;
    },
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
      this.answeringTime = false;
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
      this.myPlayerData.is_ready = true;
      // put myplayerData in dat
      dat.myPlayerData = this.myPlayerData;
      this.$socket.emit("playerGameUpdate", dat);
    },
    randomNumber() {
      // get gameRoom Data
      let dat = {
        roomId: this.gameRoom.roomId,
        playerName: this.gameRoom.playerName,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };

      this.myPlayerData.level = Math.floor(Math.random() * 100) + 1;

      // set myplayerData
      this.myPlayerData.is_ready = true;
      // put myplayerData in dat
      dat.myPlayerData = this.myPlayerData;
      this.$socket.emit("playerGameUpdate", dat);
    },

    submitStory() {
      // get gameRoom Data
      let dat = {
        roomId: this.gameRoom.roomId,
        playerName: this.gameRoom.playerName,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      // set myplayerData
      this.myPlayerData.is_ready = true;
      this.myPlayerData.short_story_all_split =
        this.myPlayerData.short_story.split("|").length;
      // put myplayerData in dat
      dat.myPlayerData = this.myPlayerData;
      this.$socket.emit("playerGameUpdate", dat);
    },
    toNext() {
      // get gameRoom Data
      let dat = {
        roomId: this.gameRoom.roomId,
        playerName: this.gameRoom.playerName,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      // set myplayerData
      // this.myPlayerData.is_ready = true;
      this.myPlayerData.short_story_postion++;
      // put myplayerData in dat
      dat.myPlayerData = this.myPlayerData;
      this.$socket.emit("playerGameUpdateAll", dat);
    },
    readyAnswer() {
      this.answeringAllPlayerList = [];
      this.answeringPlayerCanUse = [];

      this.playerData.forEach((e) => {
        this.answeringAllPlayerList.push(e.uuid);
        this.answeringPlayerCanUse.push(e.uuid);
      });
      this.answeringTime = true;
    },
  },
};
</script>

<style>
.fo-text {
  font-size: 18px !important;
}
</style>