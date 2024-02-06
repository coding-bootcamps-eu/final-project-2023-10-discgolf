<template>
  <div class="balken"></div>
  <router-link class="router-link" to="/nav">
    <div><BackButton /></div
  ></router-link>
  <div class="menu">
    <div class="arrow-menu"><ArrowNavigation /></div>
    <div class="balken-unten"><BalkenUnten /></div>
  </div>
</template>

<script>
import ArrowNavigation from "@/components/ArrowNavigation.vue";
import BalkenUnten from "@/components/BalkenUnten.vue";
import BackButton from "@/components/BackButton.vue";

export default {
  components: {
    ArrowNavigation,
    BalkenUnten,
    BackButton,
  },
};
</script>

<style scoped>
.about {
  background-color: var(--hellgruen);
}
h1 {
  margin: 0px;
}
.menu {
  position: relative;
}
.arrow-menu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 610px;
  left: 30%;
}
.balken-unten {
  position: absolute;
  top: 675px;
}
</style>
