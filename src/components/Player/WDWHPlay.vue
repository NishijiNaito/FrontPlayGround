<template>
  <div>
    <transition
      enter-active-class="scale-in-hor-center"
      leave-active-class="scale-out-hor-center"
      mode="out-in"
    >
      <div v-if="gameData.phase == 1 && myPlayerData.is_ready == false">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="mb-3 text-center">PHASE 1 ตั้งประโยค</h2>
                  <h3 class="text-center">โปรดตั้งประโยคตามหัวข้อต่อไปนี้</h3>
                  <h3 class="text-center">
                    "{{ myPlayerData.q_who }}{{ myPlayerData.q_do }}ที่{{
                      myPlayerData.q_where
                    }}{{ myPlayerData.q_how }}"
                  </h3>
                  <!-- <div>{{ gameRoom }}</div> -->
                  <form @submit.prevent="submitAnswer">
                    <h2 class="text-center">
                      <div class="input-group mb-2">
                        <span class="input-group-text"> ใคร </span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="ใคร"
                          v-model="myPlayerData.q_who"
                          autocomplete="off"
                          required
                        />
                      </div>
                      <div class="input-group mb-2">
                        <span class="input-group-text"> ทำอะไร </span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="ทำอะไร"
                          v-model="myPlayerData.q_do"
                          autocomplete="off"
                          required
                        />
                      </div>
                      <div class="input-group mb-2">
                        <span class="input-group-text"> ที่ไหน </span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="ที่ไหน"
                          v-model="myPlayerData.q_where"
                          autocomplete="off"
                          required
                        />
                      </div>
                      <div class="input-group mb-2">
                        <span class="input-group-text"> อย่างไร </span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="อย่างไร"
                          v-model="myPlayerData.q_how"
                          autocomplete="off"
                          required
                        />
                      </div>
                    </h2>

                    <button type="submit" class="w-100 btn btn-info mt-1">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="gameData.phase == 1 && myPlayerData.is_ready == true">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="mb-3 text-center">PHASE 1 ตั้งประโยค</h2>
                  <h3 class="text-center">ตั้งประโยคเสร็จสิ้น</h3>
                  <h3 class="text-center">
                    {{ myPlayerData.q_who }} / {{ myPlayerData.q_do }} /
                    {{ myPlayerData.q_where }} / {{ myPlayerData.q_how }}
                  </h3>
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
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="mb-3 text-center">PHASE 2 สุ่ม สี่ คำ</h2>
                  <h3 class="text-center">คำที่ได้</h3>
                  <h3 class="text-center">
                    {{ myPlayerData.word_set.join(" / ") }}
                  </h3>
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

      <div v-else-if="gameData.phase == 3">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="mb-3 text-center">PHASE 3 สุ่มหมวดเล่า</h2>
                  <h3 class="text-center">หมวดหมู่ที่ได้</h3>
                  <h3 class="text-center mb-3">[ {{ gameData.category }} ]</h3>
                  <h3 class="text-center">คำที่มี</h3>
                  <h3 class="text-center">
                    {{ myPlayerData.word_set.join(" / ") }}
                  </h3>
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

      <div v-else-if="gameData.phase == 4 && myPlayerData.is_ready == false">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="mb-3 text-center">PHASE 4 แต่งเรื่องเล่า</h2>
                  <h3 class="text-center mb-3">
                    หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
                  </h3>
                  <h3 class="text-center">คำที่มี</h3>
                  <div class="text-center mb-3">
                    <button
                      class="btn btn-info mx-2"
                      v-for="(word, i) in myPlayerData.word_set"
                      :key="i"
                      @click="
                        myPlayerData.short_story =
                          myPlayerData.short_story + word;
                        $refs.short_str.focus();
                      "
                    >
                      {{ word }}
                    </button>
                    <br />
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

                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="gameData.phase == 4 && myPlayerData.is_ready == true">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="mb-3 text-center">PHASE 4 แต่งเรื่องเล่า</h2>
                  <h3 class="text-center mb-3">
                    หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
                  </h3>
                  <h3 class="text-center mb-3">เรื่องเล่าของท่าน</h3>
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

      <div v-else-if="gameData.phase == 5">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
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
              <div class="card mt-2">
                <div class="card-body">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="gameData.phase == 6 && myPlayerData.is_ready == false">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="text-center">PHASE 6 จัดอันดับ</h2>
                  <h3 class="text-center">โปรดจัดอันดับตามความถูกใจ</h3>

                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
              <div class="card mt-2">
                <div class="card-body">
                  <!-- <div>{{ gameRoom }}</div> -->

                  <button
                    @click="readyRank"
                    v-if="rankingTime == false"
                    class="w-100 btn btn-success"
                  >
                    พร้อมจัดอันดับ
                  </button>
                  <div v-if="rankingTime">
                    <div
                      class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-gap-2 justify-content-center"
                    >
                      <div
                        class="col"
                        @click="playerSelect = pl"
                        v-for="pl in rankingPlayerCanUse"
                        :key="pl"
                      >
                        <div
                          class="card"
                          :class="{ 'card-active': pl == playerSelect }"
                        >
                          <div class="card-body">
                            {{
                              playerData.find((e) => e.uuid == pl).playerName
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />

                    <div
                      class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-gap-2 justify-content-center"
                    >
                      <div
                        class="col"
                        @click="scoreSeclect = sc.score"
                        v-for="sc in send_score"
                        :key="sc.score"
                      >
                        <div
                          class="card"
                          :class="{
                            'card-active': sc.score == scoreSeclect,
                            'border-success': sc.player != null,
                          }"
                        >
                          <div class="card-body">
                            {{ sc.score }} คะแนน >
                            {{
                              sc.player == null
                                ? "ยังไม่กำหนด"
                                : playerData.find((e) => e.uuid == sc.player)
                                    .playerName
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    @click="submitRanking"
                    v-if="rankingPlayerCanUse.length == 0 && rankingTime"
                    class="w-100 btn btn-info mt-1"
                  >
                    กดเมื่อจัดอันดับเรียบร้อย
                  </button>
                  <!-- <div>scoreSeclect :{{ scoreSeclect }}</div>
                  <div>playerSelect :{{ playerSelect }}</div>
                  <div>{{ rankingAllPlayerList }}</div>
                  <div>{{ rankingPlayerCanUse }}</div>
                  <div>{{ send_score }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="gameData.phase == 6 && myPlayerData.is_ready == true">
        <div class="page page-center">
          <div class="row align-items-center">
            <div class="col-lg-8 col-md-10 col-sm-12 mx-auto">
              <div class="card">
                <div class="card-body">
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="text-center">PHASE 6 จัดอันดับ</h2>
                  <h3 class="text-center">จัดอันดับเรียบร้อย</h3>
                  <div
                    class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-gap-2"
                  >
                    <div
                      class="col"
                      v-for="sc in myPlayerData.send_score"
                      :key="sc.score"
                    >
                      <div class="card">
                        <div class="card-body">
                          {{ sc.score }} คะแนน >
                          {{
                            sc.player == null
                              ? "ยังไม่กำหนด"
                              : playerData.find((e) => e.uuid == sc.player)
                                  .playerName
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
                  <h1 class="mb-3 text-center">
                    {{ gameRoom.playerName }} | {{ myPlayerData.score }} คะแนน
                  </h1>
                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>

              <div class="card mt-2">
                <div class="card-body">
                  <h2 class="text-center">PHASE 6 สรุปผล</h2>
                  <h3 class="text-center">
                    ได้คะแนนไป {{ myPlayerData.score_vote }} คะแนน
                  </h3>

                  <!-- <div>{{ gameRoom }}</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 
    <div>{{ gameData }}</div>
    <div>{{ playerData }}</div>
    <div>{{ myPlayerData }}</div> -->
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
      rankingTime: false,
      rankingAllPlayerList: [],
      rankingPlayerCanUse: [],
      send_score: [],
      scoreSeclect: null,
      playerSelect: null,
    };
  },
  watch: {
    scoreSeclect(sc) {
      if (sc != null) {
        let idx = this.send_score.findIndex((e) => e.score == sc);
        if (this.send_score[idx].player != null) {
          //คะแนนนี้มีอยู่แล้ว
          this.rankingPlayerCanUse.push(this.send_score[idx].player);
          this.send_score[idx].player = null;
          this.scoreSeclect = null;
          this.playerSelect = null;
        } else {
          // ยังไม่มี
          if (this.playerSelect != null) {
            // เลือกผู้เล่นแล้ว
            let pl_idx = this.rankingPlayerCanUse.findIndex(
              (e) => e == this.playerSelect
            );
            this.send_score[idx].player = this.rankingPlayerCanUse[pl_idx];
            this.rankingPlayerCanUse.splice(pl_idx, 1);
            this.scoreSeclect = null;
            this.playerSelect = null;
          }
        }
      }
    },
    playerSelect(ps) {
      if (ps != null) {
        let pl_idx = this.rankingPlayerCanUse.findIndex(
          (e) => e == this.playerSelect
        );

        if (this.scoreSeclect != null) {
          //คะแนนถูกเลือกแล้ว
          let idx = this.send_score.findIndex(
            (e) => e.score == this.scoreSeclect
          );
          this.send_score[idx].player = this.rankingPlayerCanUse[pl_idx];
          this.rankingPlayerCanUse.splice(pl_idx, 1);
          this.scoreSeclect = null;
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
      this.rankingTime = false;
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
    submitStory() {
      let noinlist = [];
      this.myPlayerData.word_set.forEach((e) => {
        if (this.myPlayerData.short_story.search(e) == -1) {
          noinlist.push(e);
        }
      });

      if (noinlist.length > 0) {
        alert("คำบางคำยังไม่ได้ใส่ รายการได้แก่ " + noinlist.join(" / "));
      } else {
        // is complete

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
      }
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
    readyRank() {
      this.rankingAllPlayerList = [];
      this.rankingPlayerCanUse = [];
      this.send_score = [];

      this.playerData.forEach((e) => {
        if (e.uuid != this.gameRoom.uuid) {
          this.rankingAllPlayerList.push(e.uuid);
          this.rankingPlayerCanUse.push(e.uuid);
        }
      });

      let all_player = this.rankingAllPlayerList.length;

      for (let index = all_player; index > 0; index--) {
        this.send_score.push({ score: index, player: null });
      }
      this.rankingTime = true;
    },
    submitRanking() {
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
      this.myPlayerData.send_score = this.send_score;
      // put myplayerData in dat
      dat.myPlayerData = this.myPlayerData;
      this.$socket.emit("playerGameUpdate", dat);
    },
  },
};
</script>

<style>
.page {
  display: flex !important;
  flex-direction: column !important;
  position: relative !important;
  min-height: 100vh !important;
}

.page-center {
  justify-content: center !important;
}
.story {
  font-size: 18px !important;
}
</style>