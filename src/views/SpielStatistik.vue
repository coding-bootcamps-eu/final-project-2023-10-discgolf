<template>
  <div class="balken"></div>
  <div class="about"></div>
  <router-link class="router-link" to="/scores">
    <div>
      <BackButton />
    </div>
  </router-link>
  <div class="menu"></div>
  <StatistikCalc />
  <router-link class="router-link" to="/">
    <button @click="saveResultsToBackend()" class="back-btn">
      Runde abschließen
    </button>
  </router-link>
</template>

<script>
import BackButton from "@/components/BackButton.vue";
import StatistikCalc from "@/components/StatistikCalc.vue";
import ResultHandler from "@/handlers/ResultHandler.js";

export default {
  components: {
    BackButton,
    StatistikCalc,
  },
  methods: {
    async saveResultsToBackend() {
      await ResultHandler.generateRound();
    },
  },
};
</script>

<style scoped>
.about {
  background-color: var(--hellgruen);
}
.back-btn {
  height: 56px;
  background-color: var(--dunkelgruen);
  border-radius: 15px;
  margin: 25px 25px 15px 25px;
  color: #d5eae3;
  font-size: 1rem;
  padding-block: auto;
  font-weight: 600;
  border: none;
  cursor: pointer;
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
