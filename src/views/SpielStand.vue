<template>
  <div class="about">
    <h1>This is an Spielstand page</h1>
    <PlayerScores />
  </div>
</template>

<script>
import PlayerScores from "@/components/PlayerScores.vue"; // Update the path accordingly

export default {
  components: {
    PlayerScores,
  },
};
</script>
