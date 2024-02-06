<template>
  <div class="about">
    <h1></h1>
    <div><BackButton /></div>
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
