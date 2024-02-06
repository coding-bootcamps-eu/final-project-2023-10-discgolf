<template>
  <router-link to="/regeln">
    <div class="icon">
      <img alt="Regeln" src="../assets/navicons/05Vector.png" /><br /><img
        src="../assets/navicons/05Label.png"
        class="label"
      /></div
  ></router-link>
</template>

<script>
export default {
  name: "IconRegeln",
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
