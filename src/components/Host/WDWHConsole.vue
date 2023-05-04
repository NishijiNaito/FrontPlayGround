<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12">
        <transition
          enter-active-class="scale-in-hor-center"
          leave-active-class="scale-out-hor-center"
          mode="out-in"
        >
          <div class="card" v-if="gameData.phase == 1">
            <div class="card-body">
              <h2 class="text-center">PHASE 1 ตั้งประโยค</h2>
              <button @click="toPHASE2" class="w-100 btn btn-success">
                เข้าสู่ PHASE 2 สุ่ม สี่ คำ
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 2">
            <div class="card-body">
              <h2 class="text-center">PHASE 2 สุ่ม สี่ คำ</h2>
              <button @click="toPHASE3" class="w-100 btn btn-success">
                เข้าสู่ PHASE 3 สุ่มหมวดเล่า
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 3">
            <div class="card-body">
              <h2 class="text-center">PHASE 3 สุ่มหมวดเล่า</h2>
              <h3 class="text-center">
                หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
              </h3>
              <button @click="toPHASE4" class="w-100 btn btn-success">
                เข้าสู่ PHASE 4 แต่งเรื่องเล่า
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 4">
            <div class="card-body">
              <h2 class="text-center">PHASE 4 แต่งเรื่องเล่า</h2>
              <h3 class="text-center">
                หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
              </h3>
              <button @click="toPHASE5" class="w-100 btn btn-success">
                เข้าสู่ PHASE 5 เล่าเรื่องเล่า
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 5">
            <div class="card-body">
              <h2 class="text-center">PHASE 5 เล่าเรื่องเล่า</h2>
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
                @click="toPHASE6"
                v-if="gameData.player_order.length == 0"
                class="w-100 btn btn-success"
              >
                เข้าสู่ PHASE 6 จัดอันดับ
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 6">
            <div class="card-body">
              <h2 class="text-center">PHASE 6 จัดอันดับ</h2>

              <button @click="toPHASE7" class="w-100 btn btn-success">
                เข้าสู่ PHASE 7 สรุปผล
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 7">
            <div class="card-body">
              <h2 class="text-center">PHASE 7 สรุปผล</h2>

              <button @click="toPHASE1" class="w-100 btn btn-success">
                เข้าสู่ PHASE 1 ตั้งประโยค
              </button>
            </div>
          </div>
          <div v-else></div
        ></transition>
      </div>
    </div>

    <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center text-center mt-4 row-gap-3"
      v-if="gameData.phase != 5"
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
              class="card-body text-danger"
              v-if="gameData.phase == 1 && pl.is_ready == false"
            >
              <h1>กำลังพิมพ์</h1>
            </div>
            <div
              class="card-body text-success"
              v-else-if="gameData.phase == 1 && pl.is_ready == true"
            >
              <h1>เรียบร้อย</h1>
            </div>
            <div
              class="card-body text-danger"
              v-else-if="gameData.phase == 2 && pl.is_ready == false"
            >
              <h1>กำลังดูคำ</h1>
            </div>
            <div
              class="card-body text-success"
              v-else-if="gameData.phase == 2 && pl.is_ready == true"
            >
              <h1>เรียบร้อย</h1>
            </div>
            <div
              class="card-body text-danger"
              v-else-if="gameData.phase == 3 && pl.is_ready == false"
            >
              <h1>กำลังดูหมวดหมู่</h1>
            </div>
            <div
              class="card-body text-success"
              v-else-if="gameData.phase == 3 && pl.is_ready == true"
            >
              <h1>เรียบร้อย</h1>
            </div>
            <div
              class="card-body text-danger"
              v-else-if="gameData.phase == 4 && pl.is_ready == false"
            >
              <h1>กำลังแต่งเรื่องเล่า</h1>
            </div>
            <div
              class="card-body text-success"
              v-else-if="gameData.phase == 4 && pl.is_ready == true"
            >
              <h1>แต่งเรียบร้อย</h1>
            </div>
            <div
              class="card-body text-danger"
              v-else-if="gameData.phase == 6 && pl.is_ready == false"
            >
              <h1>กำลังจัดอันดับ</h1>
            </div>
            <div
              class="card-body text-success"
              v-else-if="gameData.phase == 6 && pl.is_ready == true"
            >
              <h1>จัดอันดับเรียบร้อย</h1>
            </div>
            <div class="card-body" v-else-if="gameData.phase == 7">
              <h1>+{{ pl.score_vote }} คะแนน</h1>
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
    toPHASE2() {
      let allwords = [];
      this.playerData.forEach((e) => {
        allwords.push(e.q_who);
        allwords.push(e.q_do);
        allwords.push(e.q_where);
        allwords.push(e.q_how);
      });

      this.playerData.forEach((e) => {
        for (let r = 0; r < 4; r++) {
          let randword = Math.floor(Math.random() * allwords.length);
          e.word_set.push(allwords[randword]);
          allwords.splice(randword, 1);
        }
      });

      // console.log(allwords);

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
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.phase = 3; // for to 3 phase
      dat.gameData.category = "แล้วแต่กำหนด"; // for to 3 phase
      dat.playerData = this.playerData.map((e) => {
        let d = e;
        d.is_ready = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    toPHASE4() {
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.phase = 4; // for to 3 phase
      dat.playerData = this.playerData.map((e) => {
        let d = e;
        d.is_ready = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    toPHASE5() {
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
      dat.gameData.phase = 5; // for to 5 phase
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
        e.send_score.forEach((ss) => {
          let plidx = this.playerData.findIndex((pi) => pi.uuid == ss.player);
          this.playerData[plidx].score += ss.score;
          this.playerData[plidx].score_vote += ss.score;
        });
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
    toPHASE1() {
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = this.gameData;
      dat.gameData.phase = 1; // for to 6 phase
      dat.playerData = this.playerData.map((e) => {
        let d = e;
        d.q_who = "";
        d.q_do = "";
        d.q_where = "";
        d.q_how = "";
        d.word_set = [];
        d.short_story = "";
        d.show_short_story = "";
        d.short_story_postion = -1;
        d.short_story_all_split = null;
        d.send_score = [];
        d.is_ready = false;
        d.score_vote = 0;
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