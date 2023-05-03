<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12">
        <button
          @click="toPHASE0"
          v-if="gameData.phase != 0"
          class="w-100 btn btn-warning"
        >
          กลับไปที่ PHASE 0 ตั้งค่าเกม
        </button>
        <transition
          enter-active-class="scale-in-hor-center"
          leave-active-class="scale-out-hor-center"
          mode="out-in"
        >
          <div class="card" v-if="gameData.phase == 0">
            <div class="card-body text-center">
              <h2 class="text-center">PHASE 0 ตั้งค่าเกม</h2>

              <div class="row justify-content-center">
                <div class="col-auto">
                  <div class="form-check">
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        v-model="gameData.writing"
                        checked
                      />
                      เขียนเรื่องเล่า
                    </label>
                  </div>
                </div>
              </div>

              <button @click="toPHASE1" class="w-100 btn btn-success">
                เข้าสู่ PHASE 1 สุ่มหมวดหมู่
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 1">
            <div class="card-body">
              <h2 class="text-center">PHASE 1 สุ่มหมวดหมู่</h2>
              <h3 class="text-center">
                หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
              </h3>
              <button @click="toPHASE2" class="w-100 btn btn-success">
                เข้าสู่ PHASE 2 สุ่มตัวเลข
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 2">
            <div class="card-body">
              <h2 class="text-center">PHASE 2 สุ่มตัวเลข</h2>
              <h3 class="text-center">
                หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
              </h3>

              <button @click="toPHASE3" class="w-100 btn btn-success">
                เข้าสู่ PHASE 3 แต่งเรื่อง
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 3">
            <div class="card-body">
              <h2 class="text-center">PHASE 3 แต่งเรื่อง</h2>
              <h3 class="text-center">
                หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
              </h3>
              <button @click="toPHASE4" class="w-100 btn btn-success">
                เข้าสู่ PHASE 4 เล่าเรื่อง
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 4">
            <div class="card-body">
              <h2 class="text-center">PHASE 4 เล่าเรื่อง</h2>
              <h3 class="text-center">
                หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
              </h3>
              <h3 class="text-center">
                หมวดหมู่ที่ได้ [ {{ gameData.category }} ] | ผู้เล่าปัจจุบัน :
                {{
                  playerData.find((e) => {
                    return e.uuid == gameData.player_present_now;
                  }).playerName
                }}
                | ผู้เล่าคนถัดไป :
                {{
                  gameData.player_order.length != 0
                    ? playerData.find((e) => {
                        return e.uuid == gameData.player_order[0] || "";
                      }).playerName
                    : "ไม่มี"
                }}
              </h3>
              <button
                @click="toNextPresent"
                v-if="gameData.player_order.length != 0"
                class="w-100 btn btn-success"
              >
                ผู้เล่าคนถัดไป
              </button>
              <button
                @click="toPHASE5"
                v-if="gameData.player_order.length == 0"
                class="w-100 btn btn-success"
              >
                เข้าสู่ PHASE 5 ตอบคำถาม
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 5">
            <div class="card-body">
              <h2 class="text-center">PHASE 5 ตอบคำถาม</h2>

              <button @click="toPHASE6" class="w-100 btn btn-success">
                เข้าสู่ PHASE 6 แสดงคำตอบ
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 6">
            <div class="card-body">
              <h2 class="text-center">PHASE 6 แสดงคำตอบ</h2>

              <button @click="toPHASE7" class="w-100 btn btn-success">
                เข้าสู่ PHASE 7 เฉลย
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 7">
            <div class="card-body">
              <h2 class="text-center">PHASE 7 เฉลยคำตอบ และ Challenge</h2>
              <h2 class="text-center mt-2">
                มากที่สุด {{ gameData.result.mostLevel }}
              </h2>
              <h2 class="text-center">
                น้อยที่สุด {{ gameData.result.leastLevel }}
              </h2>

              <button @click="toPHASE1" class="w-100 btn btn-success">
                เข้าสู่ PHASE 1 สุ่มหมวดหมู่
              </button>
            </div>
          </div>
          <div v-else></div
        ></transition>
      </div>
    </div>

    <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center text-center mt-4 row-gap-3"
      v-if="gameData.phase != 4"
    >
      <div class="col" v-for="pl in playerData" :key="pl.uuid">
        <div class="card scale-in-hor-center">
          <div class="card-header">
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
              class="card-body"
              v-if="gameData.phase == 1 && pl.is_ready == false"
            >
              <h1>กำลังดูหมวดหมู่</h1>
            </div>
            <div
              class="card-body"
              v-else-if="gameData.phase == 1 && pl.is_ready == true"
            >
              <h1>เรียบร้อย</h1>
            </div>
            <div
              class="card-body"
              v-else-if="gameData.phase == 2 && pl.is_ready == false"
            >
              <h1>กำลังสุ่มตัวเลข</h1>
            </div>
            <div
              class="card-body"
              v-else-if="gameData.phase == 2 && pl.is_ready == true"
            >
              <h1>สุ่มเรียบร้อย</h1>
            </div>
            <div
              class="card-body"
              v-else-if="gameData.phase == 3 && pl.is_ready == false"
            >
              <h1>กำลังแต่งเรื่อง</h1>
            </div>
            <div
              class="card-body"
              v-else-if="gameData.phase == 3 && pl.is_ready == true"
            >
              <h1>แต่งเรียบร้อย</h1>
            </div>
            <div
              class="card-body"
              v-else-if="gameData.phase == 4 && pl.is_ready == false"
            >
              <h1>กำลังแต่งเรื่องเล่า</h1>
            </div>
            <div
              class="card-body"
              v-else-if="gameData.phase == 4 && pl.is_ready == true"
            >
              <h1>แต่งเรียบร้อย</h1>
            </div>
            <div
              class="card-body"
              v-else-if="gameData.phase == 5 && pl.is_ready == false"
            >
              <h1>กำลังตอบ</h1>
            </div>
            <div
              class="card-body"
              v-else-if="gameData.phase == 5 && pl.is_ready == true"
            >
              <h1>ตอบเรียบร้อย</h1>
            </div>

            <div class="card-body" v-else-if="gameData.phase == 6">
              <h1>
                Most :
                {{
                  pl.send_answer.mostPlayer == null
                    ? "ยังไม่กำหนด"
                    : playerData.find(
                        (e) => e.uuid == pl.send_answer.mostPlayer
                      ).playerName
                }}
              </h1>
              <h1>
                Least :
                {{
                  pl.send_answer.leastPlayer == null
                    ? "ยังไม่กำหนด"
                    : playerData.find(
                        (e) => e.uuid == pl.send_answer.leastPlayer
                      ).playerName
                }}
              </h1>
            </div>
            <div class="card-body" v-else-if="gameData.phase == 7">
              <h1>{{ pl.level }}</h1>
              <h1>{{ pl.score_guess }} คะแนน</h1>
            </div>
            <div v-else></div>
          </transition>
        </div>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12">
        <div class="card mt-2">
          <div class="card-body">
            <div class="text-center story">
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
    toPHASE0() {
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.phase = 0; // for to 1 phase
      dat.gameData.category = ""; // หมวดหมู่
      dat.gameData.result = { mostLevel: null, leastLevel: null }; // เลขมากสุด - น้อยสุด
      dat.gameData.player_order = []; // ลำดับของผู้เล่น
      dat.gameData.player_present_now = ""; //ผู้เล่นปัจจุบัน

      dat.playerData = this.playerData.map((e) => {
        let d = e;
        d.level = null; // ระดับของเรื่องเล่า

        d.score_guess = 0; // คะแนนที่ได้จากรอบ
        d.score_challenged = 0; // จำนวนที่ถูก Challenge
        d.short_story = ""; // เรื่องเล่า
        d.show_short_story = "";
        d.short_story_postion = -1; // ตำแหน่งที่แสดง
        d.short_story_all_split = null; // ส่วนที่แสดงทั้งหมด
        d.send_answer = { mostPlayer: null, leastPlayer: null }; // คำตอบ คนที่มีเลขสูงสุด ต่ำสุด
        d.challenge_list = []; //รายชื่อที่จะ Challenge
        d.is_ready = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    toPHASE1() {
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.phase = 1; // for to 1 phase
      dat.gameData.category = "แล้วแต่กำหนด"; // หมวดหมู่
      dat.gameData.result = { mostLevel: null, leastLevel: null }; // เลขมากสุด - น้อยสุด
      dat.gameData.player_order = []; // ลำดับของผู้เล่น
      dat.gameData.player_present_now = ""; //ผู้เล่นปัจจุบัน

      dat.playerData = this.playerData.map((e) => {
        let d = e;
        d.level = null; // ระดับของเรื่องเล่า

        d.score_guess = 0; // คะแนนที่ได้จากรอบ
        d.score_challenged = 0; // จำนวนที่ถูก Challenge
        d.short_story = ""; // เรื่องเล่า
        d.show_short_story = "";
        d.short_story_postion = -1; // ตำแหน่งที่แสดง
        d.short_story_all_split = null; // ส่วนที่แสดงทั้งหมด
        d.send_answer = { mostPlayer: null, leastPlayer: null }; // คำตอบ คนที่มีเลขสูงสุด ต่ำสุด
        d.challenge_list = []; //รายชื่อที่จะ Challenge
        d.is_ready = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    toPHASE2() {
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.phase = 2; // for to 2 phase

      dat.playerData = this.playerData.map((e) => {
        let d = e;
        d.is_ready = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    toPHASE3() {
      // Random to write
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.phase = 3; // for to 3 phase

      let i = 1;
      this.playerData.forEach((e) => {
        if (i == 1) {
          this.gameData.result = {
            mostLevel: e.level,
            leastLevel: e.level,
          };
        } else {
          if (this.gameData.result.mostLevel < e.level) {
            this.gameData.result.mostLevel = e.level;
          } else if (this.gameData.result.leastLevel > e.level) {
            this.gameData.result.leastLevel = e.level;
          }
        }
        i++;
      });

      dat.playerData = this.playerData.map((e) => {
        let d = e;
        d.is_ready = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    toPHASE4() {
      // random pos

      let player_all = [];

      this.playerData.forEach((e) => {
        player_all.push(e.uuid);
      });

      let player_order = [];
      while (player_all.length != 0) {
        let randword = Math.floor(Math.random() * player_all.length);
        player_order.push(player_all[randword]);
        player_all.splice(randword, 1);
      }

      this.gameData.player_present_now = player_order.pop();

      this.gameData.player_order = player_order;

      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.phase = 4; // for to 5 phase
      dat.playerData = this.playerData.map((e) => {
        let d = e;
        d.is_ready = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    toNextPresent() {
      let player_order = [];
      this.gameData.player_order.forEach((e) => {
        player_order.push(e);
      });

      this.gameData.player_present_now = player_order.pop();

      this.gameData.player_order = player_order;

      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.phase = 4; // for to 4 phase
      dat.playerData = this.playerData.map((e) => {
        let d = e;
        d.is_ready = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    toPHASE5() {
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.phase = 5; // for to 5 phase
      dat.playerData = this.playerData.map((e) => {
        let d = e;
        d.is_ready = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    toPHASE6() {
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.phase = 6; // for to 6 phase
      dat.playerData = this.playerData.map((e) => {
        let d = e;
        d.is_ready = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    toPHASE7() {
      this.playerData.forEach((e) => {
        //chk for most
        if (e.send_answer.mostPlayer != null) {
          let most_player_level = this.playerData.find(
            (el) => el.uuid == e.send_answer.mostPlayer
          ).level;

          if (most_player_level == this.gameData.result.mostLevel) {
            e.score_guess++;
            e.score++;
          }
        }

        //chk for least
        if (e.send_answer.leastPlayer != null) {
          let least_player_level = this.playerData.find(
            (el) => el.uuid == e.send_answer.leastPlayer
          ).level;

          if (least_player_level == this.gameData.result.leastLevel) {
            e.score_guess++;
            e.score++;
          }
        }
      });

      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.phase = 7; // for to 6 phase
      dat.playerData = this.playerData.map((e) => {
        let d = e;
        d.is_ready = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    arscore(uuid, score) {
      let idx = this.playerData.findIndex((e) => e.uuid == uuid);
      this.playerData[idx].score += score;
      this.playerData[idx].score_guess += score;

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