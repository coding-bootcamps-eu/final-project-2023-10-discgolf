<template>
  <div class="icon">
    <img
      alt="Spieler"
      src="../assets/navicons/02Vector.png"
      class="image"
    /><br /><img src="../assets/navicons/02Label.png" class="label" />
  </div>
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
.icon .image {
  padding-top: 6px;
}
.icon .label {
  position: absolute;
  top: 65px;
  margin: 0 auto;
  left: 25%;
}
</style>
