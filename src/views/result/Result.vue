<template>
  <section>
    <h2>BrandmobileAfrica Quiz</h2>

    <div>
      <h3>Weldone!</h3>

      <div id="result">
        <h4>Quiz Summary</h4>
        <hr />
        <p id="total">{{ percent }}%</p>
        <p>
          <span>Questions Answered:</span> <b>{{ answered }}/{{ total }}</b>
        </p>
        <p>
          <span>Correct Answers:</span> <b class="green">{{ correct }}</b>
        </p>
        <p>
          <span>Incorrect Answers:</span> <b class="red">{{ wrong }}</b>
        </p>
      </div>
    </div>

    <router-link to="/">Go Home</router-link>
  </section>
</template>

<style lang="scss" scoped>
@import "./style.scss";
</style>

<script lang="ts">
import { defineComponent } from "vue";
const SESSIONKEY = "quizResponse";
export default defineComponent({
  name: "Homepage",
  props: {
    title: String,
  },
  data() {
    return {
      total: 0,
      answered: 0,
      correct: 0,
      wrong: 0,
      percent: 0,
    };
  },
  mounted() {
    this.calculate();
  },

  methods: {
    calculate() {
      let sessionArray;
      let sessionS = sessionStorage.getItem(SESSIONKEY);
      if (!sessionS) {
        this.$router.push({ name: "Homepage" });
      } else {
        sessionArray = JSON.parse(sessionS);
        this.$data.total = sessionArray.totalQuestions;
        this.$data.answered = Object.keys(sessionArray.questions).length;
        for (let attempt in sessionArray.questions) {
          sessionArray.questions[attempt].isCorrect
            ? this.$data.correct++
            : this.$data.wrong++;
        }

        this.$data.percent = Number(
          ((this.$data.correct / this.$data.total) * 100).toFixed(0)
        );
      }
      sessionStorage.setItem(SESSIONKEY, "");
    },
  },
});
</script>
