<template>
  <div class="balken"></div>
  <div class="about">
    <router-link class="router-link posi" to="/nav"
      ><div><BackButton /></div
    ></router-link>
    <PlayerScores />
  </div>
</template>

<script>
import PlayerScores from "@/components/PlayerScores.vue"; // Update the path accordingly
import BackButton from "@/components/BackButton.vue";

export default {
  components: {
    PlayerScores,
    BackButton,
  },
};
</script>
<style scoped>
.back-btn {
  height: 56px;
  width: 116px;
  background-color: var(--dunkelgruen);
  border-radius: 15px;
  margin: 15px 25px 15px 25px;
  color: #d5eae3;
  font-size: 1rem;
  padding-top: 17px;
  font-weight: 600;
}
.about {
  position: relative;
}
.posi {
  position: absolute;
  z-index: 30;
  right: 3px;
}
</style>
