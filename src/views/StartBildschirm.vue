<template>
  <div class="balken"></div>
  <div class="home">
    <img alt="Vue logo" src="../assets/diskgolf2_1.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "StartBildschirm",
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
.home {
  background: linear-gradient(
    180deg,
    rgb(174.69, 218.22, 203.71) 0%,
    rgb(27, 54, 61) 83.08%
  );
  background-color: rgba(255, 255, 255, 1);
}
</style>
