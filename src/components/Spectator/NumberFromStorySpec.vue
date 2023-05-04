<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12">
        <transition
          enter-active-class="scale-in-hor-center"
          leave-active-class="scale-out-hor-center"
          mode="out-in"
        >
          <div class="card" v-if="gameData.phase == 0">
            <div class="card-body text-center">
              <h2 class="text-center">PHASE 0 ตั้งค่าเกม</h2>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 1">
            <div class="card-body">
              <h2 class="text-center">PHASE 1 สุ่มหมวดหมู่</h2>
              <h3 class="text-center">
                หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
              </h3>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 2">
            <div class="card-body">
              <h2 class="text-center">PHASE 2 สุ่มตัวเลข</h2>
              <h3 class="text-center">
                หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
              </h3>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 3">
            <div class="card-body">
              <h2 class="text-center">PHASE 3 แต่งเรื่อง</h2>
              <h3 class="text-center">
                หมวดหมู่ที่ได้ [ {{ gameData.category }} ]
              </h3>
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
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 5">
            <div class="card-body">
              <h2 class="text-center">PHASE 5 ตอบคำถาม</h2>
              <h2 class="text-center">โปรดเลือกคนที่มีเลขมากสุด และ น้อยสุด</h2>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 6">
            <div class="card-body">
              <h2 class="text-center">PHASE 6 แสดงคำตอบ</h2>
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
              <h1>กำลังดูหมวดหมู่</h1>
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
              <h1>กำลังสุ่มตัวเลข</h1>
            </div>
            <div
              class="card-body text-success"
              v-else-if="gameData.phase == 2 && pl.is_ready == true"
            >
              <h1>สุ่มเรียบร้อย</h1>
            </div>
            <div
              class="card-body text-danger"
              v-else-if="gameData.phase == 3 && pl.is_ready == false"
            >
              <h1>กำลังแต่งเรื่อง</h1>
            </div>
            <div
              class="card-body text-success"
              v-else-if="gameData.phase == 3 && pl.is_ready == true"
            >
              <h1>แต่งเรียบร้อย</h1>
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
              v-else-if="gameData.phase == 5 && pl.is_ready == false"
            >
              <h1>กำลังตอบ</h1>
            </div>
            <div
              class="card-body text-success"
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
export default {
  props: ["roomId"],
  computed: {
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