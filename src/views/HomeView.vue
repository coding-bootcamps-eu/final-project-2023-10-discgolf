<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/diskgolf2_1.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <HoleMap />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import HoleMap from "@/components/HoleMap.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    HoleMap,
  },
};
</script>
