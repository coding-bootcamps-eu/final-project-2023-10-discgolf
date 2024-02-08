<template>
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
  </div>
</template>

<script>
export default {
  name: "RegelnStart",
};
</script>

<style scoped>
.rules p {
  text-align: left;
  font-size: 1rem;
}
.rules h2 {
  text-align: center;
  font-weight: 900;
  margin-top: 30px;
}
</style>
