<template>
  <div class="balken"></div>
  <div class="main">
    <router-link class="router-link" to="/nav">
      <div><BackButton /></div
    ></router-link>
    <h2>Fügen Sie die Namen der Spieler ein:</h2>
    <div><AddPlayer /></div>
    <div class="balken-unten"><BalkenUnten /></div>
  </div>
</template>

<script>
import AddPlayer from "@/components/AddPlayer.vue"; // Update the path accordingly
import BalkenUnten from "@/components/BalkenUnten.vue";
import BackButton from "@/components/BackButton.vue";

export default {
  components: {
    AddPlayer,
    BalkenUnten,
    BackButton,
  },
};
</script>

<style scoped>
.about {
  background-color: var(--hellgruen);
}
h2 {
  margin-left: 25px;
}
.main {
  position: relative;
}
.balken-unten {
  position: absolute;
  top: 739px;
}
</style>
