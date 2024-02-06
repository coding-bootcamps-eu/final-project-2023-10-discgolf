<template>
  <router-link to="/nav">
    <BackButton />
  </router-link>
  <HoleMap
    :view="[52.25042, 10.52376]"
    :zoom="15"
    :scheibeLeihen="[52.246892, 10.528621]"
    :spielort="[52.249892, 10.525291]"
  />
</template>
<script>
import HoleMap from "@/components/HoleMap.vue";
import BackButton from "@/components/BackButton.vue";
export default {
  components: {
    HoleMap,
    BackButton,
  },
};
</script>
