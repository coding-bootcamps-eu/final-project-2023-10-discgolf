<template>
  <div class="balken"></div>
  <div class="about">
    <h1>This is an Spielregeln page</h1>
  </div>
  <div class="menu">
    <div class="arrow-menu"><ArrowNavigation /></div>
  </div>
</template>

<script>
import ArrowNavigation from "@/components/ArrowNavigation.vue";
export default {
  components: {
    ArrowNavigation,
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
  top: 650px;
  left: 27%;
}
</style>
