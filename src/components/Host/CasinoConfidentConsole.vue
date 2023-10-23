<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="mb-3">
          <button
            @click="toPHASEM1"
            v-if="gameData.phase != -1"
            class="w-100 btn btn-warning"
          >
            กลับไปที่ PHASE -1 ตั้งค่าเกม
          </button>
          <button
            @click="toPHASE0"
            v-if="gameData.phase > 0"
            class="w-100 btn btn-warning"
          >
            กลับไปที่ PHASE 0 ตั้งค่าเกม
          </button>
          <button
            @click="toPHASE1"
            v-if="gameData.phase > 1"
            class="w-100 btn btn-warning"
          >
            กลับไปที่ PHASE 1 ตั้งคำถาม
          </button>
        </div>
        <!-- SECTION HTML SECTION -->
        <transition
          enter-active-class="scale-in-hor-center"
          leave-active-class="scale-out-hor-center"
          mode="out-in"
        >
          <div class="card" v-if="gameData.phase == -1">
            <!-- ANCHOR PHASE -1 : setup Game -->
            <div class="card-body text-center">
              <h2 class="text-center">PHASE -1 ตั้งค่าเกม</h2>
              <form @submit.prevent="setupGame">
                <div class="row justify-content-center text-start mb-2">
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="chip_start" class="h-100"
                        >Chip เริ่มต้น</label
                      >
                      <input
                        type="number"
                        min="1"
                        value="100"
                        class="form-control"
                        ref="chip_start"
                        name="chip_start"
                        id="chip_start"
                        required
                        placeholder="ChipStart"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="requireQuizPlay" class="h-100"
                        >จำนวนคำถามที่ต้องเล่น</label
                      >
                      <input
                        type="number"
                        min="0"
                        class="form-control"
                        v-model="gameData.requireQuizPlay"
                        name="requireQuizPlay"
                        id="requireQuizPlay"
                        required
                        placeholder="ChipStart"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label for="requireChipPerQuiz" class="h-100"
                        >จำนวน Chip ต่อข้อที่ต้องเล่นอย่างน้อย
                        {{ gameData.requireQuizPlay }} ข้อ</label
                      >
                      <input
                        type="number"
                        min="0"
                        class="form-control"
                        v-model="gameData.requireChipPerQuiz"
                        name="requireChipPerQuiz"
                        id="requireChipPerQuiz"
                        required
                        placeholder="ChipStart"
                      />
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary w-100" type="submit">
                  ตั้งค่า
                </button>
              </form>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 0">
            <!-- ANCHOR PHASE 0 : Edit Detail -->
            <div class="card-body text-center">
              <h2 class="text-center">PHASE 0 ตั้งค่าผู้เล่น</h2>

              <button @click="toPHASE1" class="w-100 btn btn-success">
                เข้าสู่ PHASE 1 ตั้งคำถาม
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 1">
            <!-- ANCHOR PHASE 1 : prepareQuiz -->
            <div class="card-body">
              <h2 class="text-center">PHASE 1 ตั้งคำถาม</h2>
              <div class="row justify-content-center mb-3">
                <div class="col-md-6">
                  <a
                    class="btn btn-primary w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#my-modal"
                    @click="openQuiz"
                  >
                    Load Quiz
                  </a>
                  <a
                    class="btn btn-primary w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#my-modal"
                    ref="mo"
                    hidden
                  >
                  </a>
                </div>
              </div>

              <div
                id="my-modal"
                class="modal fade"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div
                  class="modal-dialog modal-full-width modal-dialog-centered modal-dialog-scrollable"
                  role="document"
                >
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Load Quiz</h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <button class="btn btn-success mb-3" @click="loadQuiz">
                        Load Quiz From Sheet
                      </button>
                      <table class="table table-light">
                        <thead>
                          <tr>
                            <th>TOPIC</th>
                            <th>Question</th>
                            <th>Answer</th>
                            <th>Select</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="q in quizList" :key="q.quiz_id">
                            <td>{{ q.quiz_topic }}</td>
                            <td>{{ q.quiz_question }}</td>
                            <td>{{ q.quiz_answer }}</td>
                            <td>
                              <button
                                class="btn btn-outline-success"
                                type="button"
                                id="button-addon2"
                                @click="selectQuiz(q.quiz_id)"
                              >
                                <i class="fa fa-check" aria-hidden="true"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-3 text-center">
                <label class="form-label">Question TYPE</label>
                <div class="form-selectgroup">
                  <label class="form-selectgroup-item">
                    <input
                      type="radio"
                      name="icons"
                      value="MCQ"
                      class="form-selectgroup-input"
                      v-model="gameData.quiz.quiz_type"
                    />
                    <span class="form-selectgroup-label">
                      <i class="fas fa-check-square"></i>
                      Multiple Choice Quiz
                    </span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input
                      type="radio"
                      name="icons"
                      value="MCMC"
                      class="form-selectgroup-input"
                      v-model="gameData.quiz.quiz_type"
                    />
                    <span class="form-selectgroup-label">
                      <i class="fas fa-check-square me-2"></i>
                      <i class="fas fa-check-square"></i>
                      Multiple Choice Multiple Correct
                    </span>
                  </label>
                  <label class="form-selectgroup-item">
                    <input
                      type="radio"
                      name="icons"
                      value="SORT"
                      v-model="gameData.quiz.quiz_type"
                      class="form-selectgroup-input"
                    />
                    <span class="form-selectgroup-label">
                      <i class="fas fa-sort-numeric-down"></i> Sorting
                    </span>
                  </label>
                </div>
              </div>

              <form @submit.prevent="startQuiz" class="">
                <div class="row justify-content-center my-text">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="questione" class="form-label"
                        >Question Topic</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="gameData['quiz'].quiz_topic"
                        id="questione"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="question" class="form-label">Question</label>
                      <textarea
                        class="form-control"
                        v-model="gameData['quiz'].quiz_question"
                        id="question"
                        rows="1"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div class="col-md-6"></div>
                </div>
                <div class="row justify-content-center mb-3 my-text">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="my-input">ไฟล์รูปภาพ</label>
                      <input
                        v-if="
                          this.gameData.quiz.quiz_picLink.length == 0 ||
                          this.gameData.quiz.quiz_picLink.search(
                            'data:image/'
                          ) != -1
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
                          this.gameData.quiz.quiz_picLink.search(
                            'data:image/'
                          ) == -1
                        "
                        type="text"
                        class="form-control"
                        placeholder="Pic URL"
                        aria-label="Prefix"
                        v-model="this.gameData.quiz.quiz_picLink"
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
                      :src="this.gameData.quiz.quiz_picLink"
                    />
                  </div>
                </div>
                <div></div>
                <div
                  v-if="gameData.quiz.quiz_type == 'MCQ'"
                  class="row justify-content-center my-text"
                >
                  <div
                    class="col-md-6 mb-3"
                    v-for="(a, idx) in gameData.quiz.quiz_choice"
                    :key="idx"
                  >
                    <div class="input-group">
                      <span class="input-group-text">Choice {{ idx + 1 }}</span>
                      <input
                        type="text"
                        class="form-control"
                        :class="{
                          'is-valid':
                            gameData.quiz.quiz_choice[idx] ==
                              answerData.answer && answerData.answer != '',
                        }"
                        v-model="gameData.quiz.quiz_choice[idx]"
                        :placeholder="'Choice ' + (idx + 1)"
                        required
                      />
                      <button
                        class="btn btn-outline-success d-none d-md-block"
                        type="button"
                        id="button-addon2"
                        @click="
                          answerData.answer = gameData.quiz.quiz_choice[idx]
                        "
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>
                      </button>
                      <button
                        class="btn btn-outline-danger d-none d-md-block"
                        type="button"
                        id="button-addon2"
                        v-if="gameData.quiz.quiz_choice.length > 2"
                        @click="gameData.quiz.quiz_choice.splice(idx, 1)"
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div class="input-group d-block d-md-none">
                      <button
                        class="btn btn-outline-success w-50"
                        type="button"
                        id="button-addon2"
                        @click="
                          answerData.answer = gameData.quiz.quiz_choice[idx]
                        "
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>
                      </button>
                      <button
                        class="btn btn-outline-danger w-50"
                        type="button"
                        id="button-addon2"
                        v-if="gameData.quiz.quiz_choice.length > 2"
                        @click="gameData.quiz.quiz_choice.splice(idx, 1)"
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-12">
                    <button
                      type="button"
                      @click="gameData.quiz.quiz_choice.push('')"
                      class="w-100 btn btn-info mt-3"
                    >
                      Add Choice
                    </button>
                  </div>
                </div>

                <div
                  v-else-if="gameData.quiz.quiz_type == 'MCMC'"
                  class="row justify-content-center my-text"
                >
                  <!-- NOTE MCMC -->
                  {{ gameData }}
                  {{ answerData }}
                  <div
                    class="col-md-6 mb-3"
                    v-for="(a, idx) in gameData.quiz.quiz_choice"
                    :key="idx"
                  >
                    <div class="input-group">
                      <span class="input-group-text">Choice {{ idx + 1 }}</span>
                      <input
                        type="text"
                        class="form-control"
                        :class="{
                          'is-valid': answerData.answer?.includes(
                            gameData.quiz.quiz_choice[idx].id
                          ),
                        }"
                        v-model="gameData.quiz.quiz_choice[idx].text"
                        :placeholder="'Choice ' + (idx + 1)"
                        required
                      />
                      <button
                        class="btn btn-outline-success d-none d-md-block"
                        type="button"
                        id="button-addon2"
                        @click="toggleAnswer(gameData.quiz.quiz_choice[idx].id)"
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>
                      </button>
                      <button
                        class="btn btn-outline-danger d-none d-md-block"
                        type="button"
                        id="button-addon2"
                        v-if="gameData.quiz.quiz_choice.length > 2"
                        @click="gameData.quiz.quiz_choice.splice(idx, 1)"
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div class="input-group d-block d-md-none">
                      <button
                        class="btn btn-outline-success w-50"
                        type="button"
                        id="button-addon2"
                        @click="toggleAnswer(gameData.quiz.quiz_choice[idx].id)"
                      >
                        <i class="fa fa-check" aria-hidden="true"></i>
                      </button>
                      <button
                        class="btn btn-outline-danger w-50"
                        type="button"
                        id="button-addon2"
                        v-if="gameData.quiz.quiz_choice.length > 2"
                        @click="gameData.quiz.quiz_choice.splice(idx, 1)"
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-12">
                    <button
                      type="button"
                      @click="addMCMCChoice()"
                      class="w-100 btn btn-info mt-3"
                    >
                      Add Choice
                    </button>
                  </div>
                </div>
                <div v-else class="row justify-content-center my-text">
                  <div
                    class="col-md-6 mb-3"
                    v-for="(a, idx) in answerData.answer_sort"
                    :key="idx"
                  >
                    <div class="input-group">
                      <span class="input-group-text"
                        >Position {{ idx + 1 }}</span
                      >
                      <input
                        type="text"
                        class="form-control"
                        v-model="answerData.answer_sort[idx]"
                        :placeholder="'Position ' + (idx + 1)"
                        required
                      />

                      <button
                        class="btn btn-outline-danger d-none d-md-block"
                        type="button"
                        id="button-addon2"
                        v-if="answerData.answer_sort.length > 3"
                        @click="answerData.answer_sort.splice(idx, 1)"
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </div>
                    <div class="input-group d-block d-md-none">
                      <button
                        class="btn btn-outline-danger w-50"
                        type="button"
                        id="button-addon2"
                        v-if="answerData.answer_sort.length > 3"
                        @click="answerData.answer_sort.splice(idx, 1)"
                      >
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-12">
                    <button
                      type="button"
                      @click="answerData.answer_sort.push('')"
                      class="w-100 btn btn-info mt-3"
                    >
                      Add Choice
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  class="w-100 btn btn-success mt-3"
                  v-if="
                    (answerData.answer != '' &&
                      gameData.quiz.quiz_choice.findIndex(
                        (e) => e == answerData.answer
                      ) != -1) ||
                    gameData.quiz.quiz_type != 'MCQ'
                  "
                >
                  Start Question
                </button>
              </form>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 2">
            <!-- ANCHOR PHASE 2 : ShowTopic / Place Bet Play -->
            <div class="card-body">
              <h2 class="text-center">PHASE 2 แสดงหัวข้อ / วางเดิมพัน</h2>
              <h3 class="text-center mb-2">
                Topic : {{ gameData.quiz.quiz_topic }}
              </h3>
              <h3 class="text-center">
                {{ gameData.quiz.quiz_question }}
              </h3>

              <h3 class="text-center">
                {{ gameData.quiz.quiz_choice.join(" / ") }}
              </h3>
              <h3 class="text-center">
                {{ answerData.answer }}
              </h3>
              <button
                v-if="gameData.showNow == 0"
                @click="showNow"
                class="w-100 btn btn-info"
              >
                แสดงหัวข้อ
              </button>
              <button v-else @click="toPHASE3" class="w-100 btn btn-success">
                เข้าสู่ PHASE 3 แสดงเดิมพัน
              </button>
            </div>
            <!-- 
            <div class="card-body">
              <h2 class="text-center">PHASE 2 แสดงคำถาม</h2>
              <h3 class="text-center mb-2">
                Topic : {{ gameData.quiz.quiz_topic }}
              </h3>
              <h3 class="text-center">
                {{ gameData.quiz.quiz_question }}
              </h3>

              <h3 class="text-center">
                {{ gameData.quiz.quiz_choice.join(" / ") }}
              </h3>
              <h3 class="text-center">
                {{ answerData.answer }}
              </h3>

              <button @click="toPHASE3" class="w-100 btn btn-success">
                เข้าสู่ PHASE 3 เริ่มเกม
              </button>
            </div>
             -->
          </div>
          <div class="card" v-else-if="gameData.phase == 3">
            <!-- ANCHOR PHASE 3 : ShowBet -->
            <div class="card-body">
              <h2 class="text-center">ShowBet / ShowQuiz</h2>
              <h3 class="text-center mb-2">
                Topic : {{ gameData.quiz.quiz_topic }}
              </h3>
              <h3 class="text-center">
                {{ gameData.quiz.quiz_question }}
              </h3>

              <h3 class="text-center">
                {{ gameData.quiz.quiz_choice.join(" / ") }}
              </h3>
              <h3 class="text-center">
                {{ answerData.answer }}
              </h3>
              <button @click="toPHASE4" class="w-100 btn btn-success">
                เข้าสู่ PHASE 4 แสดงคำถาม
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 4">
            <!-- ANCHOR PHASE 4 : ShowQuiz / Show Answer -->

            <div class="card-body">
              <h2 class="text-center">PHASE 4 แสดงคำถาม</h2>
              <h3 class="text-center mb-2">
                Topic : {{ gameData.quiz.quiz_topic }}
              </h3>
              <h3 class="text-center">
                {{ gameData.quiz.quiz_question }}
              </h3>

              <h3 class="text-center">
                {{ gameData.quiz.quiz_choice.join(" / ") }}
              </h3>
              <h3 class="text-center">
                {{ answerData.answer }}
              </h3>
              <button
                v-if="gameData.showNow < gameData.quiz.quiz_choice.length"
                @click="showNow"
                class="w-100 btn btn-info"
              >
                แสดงตัวเลือกที่ {{ gameData.showNow + 1 }}
                {{ gameData.quiz.quiz_choice[gameData.showNow] }}
              </button>
              <button v-else @click="toPHASE5" class="w-100 btn btn-success">
                เข้าสู่ PHASE 5 เริ่มตอบ
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 5">
            <!-- ANCHOR PHASE 5 : Place Chip (Answer the question)  -->

            <div class="card-body">
              <h2 class="text-center">PHASE 5 เริ่มตอบ</h2>
              <h3 class="text-center mb-2">
                Topic : {{ gameData.quiz.quiz_topic }}
              </h3>
              <h3 class="text-center">
                {{ gameData.quiz.quiz_question }}
              </h3>

              <h3 class="text-center">
                {{ gameData.quiz.quiz_choice.join(" / ") }}
              </h3>
              <h3 class="text-center">
                {{ answerData.answer }}
              </h3>
              <button @click="toPHASE6" class="w-100 btn btn-success">
                เข้าสู่ PHASE 6 LockDown
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 6">
            <!-- ANCHOR PHASE 6 : Lock Down (Time up for answer)  -->

            <div class="card-body">
              <h2 class="text-center">PHASE 6 LockDown</h2>
              <h3 class="text-center mb-2">
                Topic : {{ gameData.quiz.quiz_topic }}
              </h3>
              <h3 class="text-center">
                {{ gameData.quiz.quiz_question }}
              </h3>

              <h3 class="text-center">
                {{ gameData.quiz.quiz_choice.join(" / ") }}
              </h3>
              <h3 class="text-center">
                {{ answerData.answer }}
              </h3>
              <button @click="toPHASE7" class="w-100 btn btn-success">
                เข้าสู่ PHASE 7 แสดงคำตอบ
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 7">
            <!-- ANCHOR PHASE 7 : Reveal Player Answer  -->

            <div class="card-body">
              <h2 class="text-center">PHASE 7 แสดงคำตอบ</h2>
              <h3 class="text-center mb-2">
                Topic : {{ gameData.quiz.quiz_topic }}
              </h3>
              <h3 class="text-center">
                {{ gameData.quiz.quiz_question }}
              </h3>

              <h3 class="text-center">
                {{ gameData.quiz.quiz_choice.join(" / ") }}
              </h3>
              <h3 class="text-center">
                {{ answerData.answer }}
              </h3>
              <button @click="toPHASE8" class="w-100 btn btn-success">
                เข้าสู่ PHASE 8 เฉลยคำตอบ
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 8">
            <!-- ANCHOR PHASE 8 : Reveal Correct Answer  -->

            <div class="card-body">
              <h2 class="text-center">PHASE 8 เฉลยคำตอบ</h2>
              <h3 class="text-center mb-2">
                Topic : {{ gameData.quiz.quiz_topic }}
              </h3>
              <h3 class="text-center">
                {{ gameData.quiz.quiz_question }}
              </h3>

              <h3 class="text-center">
                {{ gameData.quiz.quiz_choice.join(" / ") }}
              </h3>
              <h3 class="text-center" v-if="gameData.quiz.quiz_type == 'MCQ'">
                {{ answerData.answer }}
              </h3>
              <h3 class="text-center" v-else>
                {{ answerData.answer_sort.join(" / ") }}
              </h3>
              <h3 class="text-center">
                {{ answerData.answer_detail }}
              </h3>
              <button @click="toPHASE9" class="w-100 btn btn-success">
                เข้าสู่ PHASE 9 สรุปผล
              </button>
            </div>
          </div>
          <div class="card" v-else-if="gameData.phase == 9">
            <!-- ANCHOR PHASE 9 : Summary Remaining  -->

            <div class="card-body">
              <h2 class="text-center">PHASE 9 สรุปผล</h2>

              <button @click="toPHASE1" class="w-100 btn btn-success">
                เข้าสู่ PHASE 1 ตั้งคำถาม
              </button>
            </div>
          </div>
          <div v-else></div
        ></transition>

        <!-- !SECTION -->
      </div>
    </div>

    <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 justify-content-center text-center mt-4 row-gap-3 mb-3"
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
              class="card-body text-danger"
              v-if="gameData.phase == 2 && pl.lockDown == false"
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
            <div class="card-body text-danger" v-else-if="gameData.phase == 5">
              <h1 v-if="gameData.quiz.quiz_type == 'MCQ'">
                {{ pl.chip_unchoose }} Remain
              </h1>
              <h1 v-else>
                {{ pl.chip_choice.filter((e) => e == null).length }} Rank Remain
              </h1>
            </div>
            <div class="card-body" v-else-if="gameData.phase == 7">
              <h1>{{ pl.chip_choice.join(" / ") }}</h1>
            </div>
            <div class="card-body" v-else-if="gameData.phase == 8">
              <h1>+ {{ pl.result_quiz_score }}</h1>
            </div>
            <div v-else></div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      gameData: {},
      playerData: [],
      answerData: { answer: "", answer_sort: [], answer_detail: "" },
      timerData: {},
      quizList: [],
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
      if (data.answerData) this.answerData = data.answerData;
      if (data.timerData) this.timerData = data.timerData;
    });
  },
  unmounted() {
    this.$socket.off("hostGameInfo");
  },
  watch: {
    "gameData.quiz.quiz_type"(dat) {
      console.log(dat);
      if (dat == "MCMC") {
        this.answerData.answer = [];
        this.gameData.quiz.quiz_choice = [];
        this.gameData.quiz.quiz_choice.push({ id: this.genCode(6), text: "" });
        this.gameData.quiz.quiz_choice.push({ id: this.genCode(6), text: "" });
      } else if (dat == "MCQ") {
        this.answerData.answer = "";
        this.gameData.quiz.quiz_choice = ["", ""];
      }
    },
  },
  methods: {
    // SECTION METHODS
    addMCMCChoice() {
      this.gameData.quiz.quiz_choice.push({ id: this.genCode(6), text: "" });
    },
    genCode(length) {
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return password;
    },

    toggleAnswer(txt) {
      let idx = this.answerData.answer.findIndex((e) => e == txt);
      if (idx == -1) {
        this.answerData.answer.push(txt);
      } else {
        this.answerData.answer.splice(idx, 1);
      }
    },
    async handleImage(e) {
      // console.log(e.target.files.length);
      // return;
      if (e.target.files.length > 0) {
        const selecetImg = e.target.files[0];

        this.createBase64Image(selecetImg);
      } else {
        this.gameData.quiz.quiz_picLink = "";
      }
    },
    createBase64Image(fileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.gameData.quiz.quiz_picLink = e.target.result;
      };
      reader.readAsDataURL(fileObj);
    },
    openQuiz() {
      let ql = localStorage.getItem("quizList");
      if (ql != null) {
        this.quizList = JSON.parse(ql);
      }
    },
    async loadQuiz() {
      let res = await axios.get(
        "http://gsx2json.com/api?id=1wP7EMy2Wjyo5S9bA2DW3UTggqFk52XB_c13frEC08h4&sheet=Quiz&columns=false"
      );

      this.quizList = res.data.rows.filter(
        (e) =>
          e.quiz_type == "MCQ" ||
          (e.quiz_type == "SORT" && e.choice_3 != undefined)
      );

      localStorage.setItem("quizList", JSON.stringify(this.quizList));
      console.log(res.data.rows);
    },
    selectQuiz(quiz_id) {
      let quiz = this.quizList.find((e) => e.quiz_id == quiz_id);
      this.gameData.quiz.quiz_type = quiz.quiz_type;
      this.gameData.quiz.quiz_topic = quiz.quiz_topic;
      this.gameData.quiz.quiz_question = quiz.quiz_question;

      if (
        quiz.quiz_picLink &&
        quiz.quiz_picLink != 0 &&
        quiz.quiz_picLink != "-"
      )
        this.gameData.quiz.quiz_picLink = quiz.quiz_picLink;

      if (
        quiz.quiz_answer_detail &&
        quiz.quiz_answer_detail != 0 &&
        quiz.quiz_answer_detail != "-"
      )
        this.answerData.answer_detail = quiz.quiz_answer_detail;

      let i = 1;
      this.gameData.quiz.quiz_choice = [];
      this.answerData.answer = "";
      this.answerData.answer_sort = [];
      if (quiz.quiz_type == "MCQ") {
        this.answerData.answer = quiz.quiz_answer;
        while (quiz["choice_" + i] && quiz["choice_" + i] != "-") {
          this.gameData.quiz.quiz_choice.push(quiz["choice_" + i]);
          i++;
        }
      } else if (quiz.quiz_type == "SORT") {
        while (quiz["choice_" + i] && quiz["choice_" + i] != "-") {
          this.answerData.answer_sort.push(quiz["choice_" + i]);
          i++;
        }
      }
      this.$refs.mo.click();
    },
    showNow() {
      //ANCHOR Status
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = { ...this.gameData };
      dat.gameData.showNow += 1;
      this.$socket.emit("hostGameUpdate", dat);
    },
    toPHASE0() {
      //SECTION PHASE 0
      //NOTE Reset To phase 0
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = { ...this.gameData };

      dat.gameData.phase = 0;
      dat.gameData.quiz = {
        quiz_topic: "",
        quiz_question: "",
        quiz_choice: [],
        quiz_picLink: "",
      };
      dat.gameData.answer = {
        answer: "",
      };

      dat.answerData = {
        answer: "",
      };

      dat.timerData = { fullTime: null, remainTime: null, millTime: null };

      dat.playerData = this.playerData.map((e) => {
        let d = { ...e };

        d.chip_unscore += d.chip_inplay;
        d.chip_inplay = 0;
        d.chip_unchoose = 0;
        d.chip_choice = [];
        d.lockDown = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
      //!SECTION
    },
    toPHASEM1() {
      //SECTION PHASE -1 To RESET GAME
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = { ...this.gameData };

      dat.gameData.phase = -1;
      dat.gameData.showNow = 0;
      dat.gameData.requireQuizPlay = 0;
      dat.gameData.requireChipPerQuiz = 1;
      dat.gameData.nowQuiz = 0;
      dat.gameData.quiz = {
        quiz_topic: "",
        quiz_question: "",
        quiz_choice: [],
        quiz_picLink: "",
      };
      dat.gameData.answer = {
        answer: "",
      };

      dat.answerData = {
        answer: "",
      };

      dat.timerData = { fullTime: null, remainTime: null, millTime: null };

      dat.playerData = this.playerData.map((e) => {
        let d = { ...e };
        d.chip_unscore = 0;
        d.chip_inplay = 0;
        d.quiz_play_remain = 0;

        d.score = 0;
        d.chip_choice = [];
        d.quiz_play = false;
        d.lockDown = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
      //!SECTION
    },
    setupGame() {
      //SECTION PHASE SETUP GAME -1 TO 0
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };

      dat.gameData = { ...this.gameData };
      dat.gameData.phase = 0;

      dat.gameData.quiz = {
        quiz_topic: "",
        quiz_question: "",
        quiz_choice: ["", ""],
        quiz_picLink: "",
      };
      dat.gameData.answer = {
        answer: "",
      };

      dat.answerData = {
        answer: "",
      };

      dat.timerData = { fullTime: null, remainTime: null, millTime: null };
      //NOTE SET PLAYER DATA
      dat.playerData = this.playerData.map((e) => {
        let d = { ...e };
        d.chip_unscore = +this.$refs.chip_start.value;
        d.chip_inplay = 0;
        d.quiz_play_remain = dat.gameData.requireQuizPlay;

        d.score = 0;
        d.chip_choice = [];
        d.quiz_play = false;
        d.lockDown = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
      //!SECTION
    },
    // 1 - prepareQuiz
    toPHASE1() {
      //ANCHOR PHASE 0 TO 1
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = { ...this.gameData };
      dat.gameData.phase = 1;
      dat.gameData.quiz = {
        quiz_type: "MCQ",
        quiz_topic: "",
        quiz_question: "",
        quiz_choice: ["", ""],
        quiz_picLink: "",
      };
      dat.gameData.answer = {
        answer: "",
        answer_sort: [],
        answer_detail: "",
      };

      dat.answerData = {
        answer: "",
        answer_sort: ["", "", ""],
        answer_detail: "",
      };

      dat.timerData = { fullTime: null, remainTime: null, millTime: null };

      dat.playerData = this.playerData.map((e) => {
        let d = { ...e };

        d.chip_unscore += d.chip_inplay;
        d.chip_inplay = 0;
        d.chip_unchoose = 0;
        d.chip_choice = [];
        d.lockDown = false;
        return d;
      });
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    // 2 - ShowTopic / Place Bet Play
    startQuiz() {
      //ANCHOR PHASE startQuiz 1 TO 2

      if (this.gameData.quiz.quiz_type == "SORT") {
        let tmp_rand = [...this.answerData.answer_sort];

        this.gameData.quiz.quiz_choice = [];
        while (tmp_rand.length != 0) {
          let randc = Math.floor(Math.random() * tmp_rand.length);
          this.gameData.quiz.quiz_choice.push(tmp_rand[randc]);
          tmp_rand.splice(randc, 1);
        }
      }

      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };

      dat.gameData = { ...this.gameData };

      dat.gameData.phase = 2;
      dat.gameData.showNow = 0;

      dat.timerData = { fullTime: 0, remainTime: 0, millTime: 0 };

      dat.playerData = this.playerData.map((e) => {
        let d = { ...e };
        d.chip_inplay = 0;
        d.chip_unchoose = 0;
        d.chip_choice = [];

        d.quiz_play = false;
        d.lockDown = false;
        return d;
      });
      dat.answerData = this.answerData;
      this.$socket.emit("hostGameUpdate", dat);
    },
    // 3 - ShowBet
    toPHASE3() {
      //ANCHOR PHASE 2 TO 3
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = { ...this.gameData };

      dat.gameData.phase = 3;
      dat.gameData.showNow = 0;

      dat.timerData = { fullTime: 60, remainTime: 60, millTime: 0 };

      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    // 4 - ShowQuiz then Show Answer
    toPHASE4() {
      //ANCHOR PHASE 3 TO 4
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = { ...this.gameData };

      dat.gameData.phase = 4;
      dat.gameData.showNow = 0;

      dat.timerData = { fullTime: 60, remainTime: 60, millTime: 0 };

      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    // 5 - StartGame
    toPHASE5() {
      //ANCHOR PHASE Place Chip 4 TO 5
      // toPhase 5
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = { ...this.gameData };

      dat.gameData.phase = 5;
      dat.gameData.showNow = 0;

      dat.timerData = { fullTime: 60, remainTime: 60, millTime: 0 };

      // console.log(dat);
      dat.playerData = this.playerData.map((e) => {
        let d = { ...e };
        d.chip_unchoose = d.chip_inplay;
        d.chip_choice = [];

        for (
          let index = 0;
          index < this.gameData.quiz.quiz_choice.length;
          index++
        ) {
          if (this.gameData.quiz.quiz_type == "MCQ") {
            d.chip_choice.push(0);
          } else {
            d.chip_choice.push(null);
          }
        }

        d.lockDown = false;
        return d;
      });

      this.$socket.emit("hostGameUpdate", dat);
    },
    // 6 - Lock Down (Time up for answer)
    toPHASE6() {
      //ANCHOR PHASE 5 TO 6 Lock Down
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = { ...this.gameData };

      dat.gameData.phase = 6;

      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    // 7 - Reveal Player Answer
    toPHASE7() {
      //ANCHOR PHASE 6 TO 7 Reveal Player Answer
      // toPhase 7
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = { ...this.gameData };

      dat.gameData.phase = 7;

      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    // 8 - Reveal Correct Answer
    toPHASE8() {
      //ANCHOR PHASE 7 TO 8 Reveal Correct Answer
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = { ...this.gameData };

      dat.gameData.phase = 8;

      dat.playerData = this.playerData.map((e) => {
        let d = { ...e };
        d.result_quiz_score = 0;

        if (this.gameData.quiz.quiz_type == "MCQ") {
          for (
            let index = 0;
            index < this.gameData.quiz.quiz_choice.length;
            index++
          ) {
            if (
              this.gameData.quiz.quiz_choice[index] == this.answerData.answer
            ) {
              d.score += e.chip_choice[index];
              d.result_quiz_score += e.chip_choice[index];
            }
          }
        } else if (this.gameData.quiz.quiz_type == "SORT") {
          let max_correct = this.gameData.quiz.quiz_choice.length;
          let my_correct = 0;

          for (
            let index = 0;
            index < this.gameData.quiz.quiz_choice.length;
            index++
          ) {
            if (e.chip_choice[index] == this.answerData.answer_sort[index]) {
              my_correct++;
            }
          }
          d.result_quiz_score += Math.round(
            (my_correct / max_correct) * d.chip_inplay
          );
          d.score += d.result_quiz_score;
        }

        d.chip_unchoose = 0;

        d.chip_inplay = 0;

        if (d.quiz_play && d.quiz_play_remain > 0) {
          d.quiz_play_remain--;
        }

        d.lockDown = false;
        return d;
      });

      dat.gameData.answer = { ...this.answerData };

      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
    // 9 - Summary Remaining
    toPHASE9() {
      //ANCHOR PHASE 8 TO 9 Summary Remaining
      let dat = {
        roomId: this.gameRoom.roomId,
        passCode: this.gameRoom.passCode,
        mode: this.gameRoom.mode,
        game: this.gameRoom.game,
        uuid: this.gameRoom.uuid,
      };
      dat.gameData = { ...this.gameData };

      dat.gameData.phase = 9;
      dat.gameData.nowQuiz += 1;
      // console.log(dat);
      this.$socket.emit("hostGameUpdate", dat);
    },
  },
  //!SECTION
};
</script>

<style></style>
