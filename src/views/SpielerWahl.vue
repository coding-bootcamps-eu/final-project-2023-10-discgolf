<template>
  <div class="about">
    <h1>This is an SpielerWahl page</h1>
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
