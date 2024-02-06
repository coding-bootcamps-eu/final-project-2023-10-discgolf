<template>
  <router-link class="router-link" to="/spieler">
    <div class="icon">
      <img alt="Spieler" src="../assets/navicons/02Vector.png" /><br /><img
        src="../assets/navicons/02Label.png"
        class="label"
      />
    </div>
  </router-link>
</template>

<script>
export default {
  name: "IconSpieler",
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
