<template>
  <div class="balken"></div>
  <div class="about">
    <img alt="Vue logo" src="../assets/logo_discgolf_klein.png" />
    <h1></h1>
    <div class="map-selection"><MapSelection /></div>
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
  height: 100%;
}
h1 {
  margin: 0px;
}

h1 {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 32px;
  color: var(--hellgruen);
}
.about img {
  margin-top: 50px;
}
.map-selection {
  margin: 50px auto;
}
</style>
