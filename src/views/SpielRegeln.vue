<template>
  <div class="balken"></div>
  <div class="about"></div>
  <router-link class="router-link" to="/nav">
    <div><BackButton /></div>
  </router-link>
  <div class="menu">
    <div class="rules">
      <h2>Die Spielregeln</h2>
      <p>
        In Anlehnung an das Reglement des klassischen Golfspiels gilt es beim
        Disc-Golf einen Parcours zu absolvieren, bei dem an jeder Bahn mit
        möglichst wenigen Würfen (Par) der Zielkorb erreicht werden muss.
        <br /><br />
        Nach jedem Wurf wird von dort aus weitergespielt, wo die Scheibe lie-
        gen geblieben ist. Der Spieler, der am weitesten vom Ziel entfernt ist,
        macht den nächsten Wurf. <br /><br />Gewonnen hat, wer die geringste
        Gesamt- wurfzahl auf dem Parcours vorweisen kann. Bäume, Äste und
        Sträucher sind Teil des Kurses und dürfen nicht weg- gebogen oder
        abgebrochen werden.
      </p>
    </div>
    <div class="arrow-menu"><ArrowNavigation /></div>
    <div class="balken-unten"><BalkenUnten /></div>
  </div>
</template>

<script>
import ArrowNavigation from "@/components/ArrowNavigation.vue";
import BalkenUnten from "@/components/BalkenUnten.vue";
import BackButton from "@/components/BackButton.vue";

export default {
  components: {
    ArrowNavigation,
    BalkenUnten,
    BackButton,
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
