<template>
  <div class="balken"></div>
  <div class="about"></div>
  <router-link class="router-link" to="/nav">
    <div>
      <BackButton />
    </div>
  </router-link>
  <div class="menu">
    <div class="rules">
      <h2>Die SpielStatistik</h2>
    </div>
    <div class="arrow-menu">
      <ArrowNavigation />
    </div>
    <div class="balken-unten">
      <BalkenUnten />
    </div>
  </div>
  <StatistikCalc />
</template>

<script>
import ArrowNavigation from "@/components/ArrowNavigation.vue";
import BalkenUnten from "@/components/BalkenUnten.vue";
import BackButton from "@/components/BackButton.vue";
import StatistikCalc from "@/components/StatistikCalc.vue";

export default {
  components: {
    ArrowNavigation,
    BalkenUnten,
    BackButton,
    StatistikCalc,
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

.rules {
  margin: 15px 25px;
}

.rules p {
  text-align: left;
  font-size: 1rem;
}

.rules h2 {
  text-align: center;
  font-weight: 900;
  margin-top: 30px;
}

.menu {
  position: relative;
}

.arrow-menu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 590px;
  left: 30%;
}

.balken-unten {
  position: absolute;
  top: 653px;
}
</style>
