<template>
  <div class="balken"></div>
  <div class="about">
    <h1></h1>
  </div>
  <div class="main">
    <div><BackButton /></div>
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
h1 {
  margin: 0px;
}
.main {
  position: relative;
}
.balken-unten {
  position: absolute;
  top: 675px;
}
</style>
