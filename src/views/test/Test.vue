<template>
  <section>
    <h2>BrandmobileAfrica Quiz</h2>

    <h3 class="question">{{ questions[current]?.question }}</h3>
    <div class="timer">
      <div id="time">
        <h4>{{ currentTime }}</h4>
      </div>
    </div>

    <div class="options">
      <label
        v-for="option in questions[current].choices"
        :key="option.id"
        :for="option.id"
      >
        <span>{{ option.choice }}</span>
        <input
          @input="evaluateAnswer"
          type="radio"
          :name="option.question_id"
          :id="option.id"
          :value="option.choice"
        />
      </label>
    </div>

    <button @click="next">
      {{ current + 1 >= questionsLength ? "Submit" : "Next" }}
    </button>
  </section>
</template>

<style lang="scss" scoped>
@import "./style.scss";
</style>

<script lang="ts">
import Questions from "../../data/questions.json";

import { defineComponent } from "vue";
const SESSIONKEY = "quizResponse";
export default defineComponent({
  name: "Test",
  props: {},
  data() {
    return {
      questions: Questions.data,
      questionsLength: Questions.data.length,
      current: 0,
      currentTime: 120,
    };
  },
  mounted() {
    this.decrementTime();
  },
  methods: {
    decrementTime() {
      //@ts-ignore
      window.interv = setInterval(() => {
        if (this.currentTime <= 0) {
          this.submit();
        }
        this.$data.currentTime--;
      }, 1000);
    },

    next() {
      this.$data.current + 1 >= this.$data.questionsLength
        ? this.submit()
        : this.$data.current++;
    },
    evaluateAnswer(e: Event) {
      //@ts-ignore
      let ans = e?.target?.value;
      let question = this.$data.questions[this.$data.current];
      let isCorrect = Boolean(
        question.choices.filter(
          (choice) => choice.choice == ans && choice.is_correct_choice == 1
        )?.length
      );

      let sessionArray;
      let sessionS = sessionStorage.getItem(SESSIONKEY);
      if (!sessionS) {
        sessionArray = {
          totalQuestions: this.$data.questionsLength,
          questions: {},
        };
      } else {
        sessionArray = JSON.parse(sessionS);
      }

      sessionArray.questions[question.id] = {
        isCorrect,
        question: question.question,
        questionID: question.id,
        choice: ans,
      };
      sessionStorage.setItem(SESSIONKEY, JSON.stringify(sessionArray));
    },
    submit() {
      let sessionArray;
      let sessionS = sessionStorage.getItem(SESSIONKEY);
      if (!sessionS) {
        sessionArray = {
          totalQuestions: this.$data.questionsLength,
          questions: [],
        };
        sessionStorage.setItem(SESSIONKEY, JSON.stringify(sessionArray));
      }
      //@ts-ignore
      clearInterval(window.interv);
      this.$router.push({ name: "Result" });
    },
  },
});
</script>
