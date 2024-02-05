<template>
  <div class="balken"></div>
  <div class="about">
    <h1>Fügen Sie die Namen der Spieler ein:</h1>
    <AddPlayer />
  </div>
</template>

<script>
import AddPlayer from "@/components/AddPlayer.vue"; // Update the path accordingly

export default {
  components: {
    AddPlayer,
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
</style>
