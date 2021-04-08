<template>
  <div id="container">
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="scss">
@import "./global.scss";
</style>

<script lang="ts">
import { defineComponent } from "vue";

// import Homepage from "@/views/homepage/index";
// import Test from "@/views/test/index";
// import Result from "@/views/result/index";
export default defineComponent({
  name: "App",
  components: {},
  data() {
    return {
      selectedMenu: "Message",
    };
  },
  methods: {
    setMenu(menu: string) {
      this.$data.selectedMenu = menu;
    },
  },
});
</script>
