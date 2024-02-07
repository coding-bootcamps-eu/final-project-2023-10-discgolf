<template>
  <div class="gesamt">
    <BalkenUnten />
    <router-link class="router-link posi" to="/nav">
      <BackButton />
    </router-link>
    <HoleMap
      :view="[52.25042, 10.52376]"
      :zoom="15"
      :scheibeLeihen="[52.246892, 10.528621]"
      :spielort="[52.249892, 10.525291]"
    />
    <div class="scheiben-leihen">
      <h4>Scheiben leihen:</h4>
      <address>
        <p>Jahn Klause</p>
        <img src="@/assets/frisbee.png" alt="" />
        <p>Wolfenbüttler Straße 58</p>
        <p>38102 Braunschweig</p>
      </address>
    </div>

    <div class="scheiben-leihen">
      <h4>Kurs Startpunkt:</h4>
      <address>
        <p>Bürgerpark</p>
        <img src="@/assets/coursebeginn.png" alt="" />
        <p>Friedrich-Kreis-Weg</p>
        <p>38102 Braunschweig</p>
      </address>
    </div>
    <BalkenUnten class="position" />
  </div>
</template>
<script>
import HoleMap from "@/components/HoleMap.vue";
import BackButton from "@/components/BackButton.vue";
import BalkenUnten from "@/components/BalkenUnten.vue";
export default {
  components: {
    HoleMap,
    BackButton,
    BalkenUnten,
  },
};
</script>
<style scoped>
.gesamt {
  position: relative;
}
.scheiben-leihen {
  position: relative;
  background-color: var(--dunkelgruen);
  width: 90%;
  margin-inline: auto;
  border-radius: 15px;
  color: var(--hellgruen);
  padding-top: 3px;
  padding-bottom: 13px;
  margin-top: 20px;
}
address {
  line-height: 5px;
}
img {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 25px;
  top: 50px;
}
.posi {
  position: absolute;
  z-index: 20;
  right: 3px;
}
.position {
  position: absolute;
  bottom: -80px;
}
</style>
