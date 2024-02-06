<template>
  <router-link to="/scores">
    <div class="icon">
      <img alt="Score" src="../assets/navicons/03Vector.png" /><br /><img
        src="../assets/navicons/03Label.png"
        class="label"
      /></div
  ></router-link>
</template>

<script>
export default {
  name: "IconScore",
};
</script>

<style scoped>
.icon {
  padding-top: 7px;
  position: relative;
}
.icon .label {
  position: absolute;
  top: 65px;
  margin: 0 auto;
  left: 30%;
}
</style>
