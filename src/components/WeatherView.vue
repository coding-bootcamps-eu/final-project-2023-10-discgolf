<template>
  <div class="weather"><img src="../assets/wetter.png" /></div>
</template>

<script>
export default {
  name: "WeatherView",
};
</script>

<style scoped>
.weather {
  height: 200px;
  width: 297px;
  background-color: var(--dunkelgruen);
  border-radius: 11px;
  margin: 90px auto;
}
</style>
