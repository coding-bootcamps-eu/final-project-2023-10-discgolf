<template>
  <div class="about">
    <router-link class="router-link" to="/nav"
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
