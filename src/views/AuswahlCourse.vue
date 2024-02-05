<template>
  <div class="balken"></div>
  <div class="about">
    <h1>This is an AuswahlCourse page</h1>
    <MapSelection />
  </div>
</template>

<script>
import MapSelection from "@/components/MapSelection.vue"; // Update the path accordingly

export default {
  components: {
    MapSelection,
  },
};
</script>

<style scoped>
.about {
  background: linear-gradient(
    180deg,
    rgb(174.69, 218.22, 203.71) 0%,
    rgb(27, 54, 61) 83.08%
  );
  background-color: rgba(255, 255, 255, 1);
}
h1 {
  margin: 0px;
}
</style>
