<template>
  <div class="icon">
    <router-link to="/ansicht"
      ><img alt="Karte" src="@/assets/navicons/01Vector.png" /><br /><img
        src="@/assets/navicons/01Label.png"
        class="label"
    /></router-link>
  </div>
</template>
<script>
export default {
  name: "IconKarte",
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
