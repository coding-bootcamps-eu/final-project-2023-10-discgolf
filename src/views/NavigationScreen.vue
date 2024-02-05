<template>
  <div class="balken"></div>
  <div class="about">
    <h1></h1>
  </div>
  <div class="main">
    <div class="back-btn"></div>
    <div class="weather"></div>
    <div class="buttons">
      <span
        ><div class="icon">
          <img alt="Karte" src="../assets/navicons/01Vector.png" /><br /><img
            src="../assets/navicons/01Label.png"
            class="label"
          /></div
      ></span>
      <span
        ><div class="icon">
          <img alt="Karte" src="../assets/navicons/02Vector.png" /><br /><img
            src="../assets/navicons/02Label.png"
            class="label"
          /></div
      ></span>
      <span
        ><div class="icon">
          <img alt="Karte" src="../assets/navicons/03Vector.png" /><br /><img
            src="../assets/navicons/03Label.png"
            class="label"
          /></div
      ></span>
      <span
        ><div class="icon">
          <img alt="Karte" src="../assets/navicons/04Vector.png" /><br /><img
            src="../assets/navicons/04Label.png"
            class="label"
          /></div
      ></span>
      <span
        ><div class="icon">
          <img alt="Karte" src="../assets/navicons/05Vector.png" /><br /><img
            src="../assets/navicons/05Label.png"
            class="label"
          /></div
      ></span>
      <span
        ><div class="icon">
          <img alt="Karte" src="../assets/navicons/06Vector.png" /><br /><img
            src="../assets/navicons/06Label.png"
            class="label"
          /></div
      ></span>
    </div>
    <div class="balken-bottom"></div>
  </div>
</template>

<style scoped>
.about {
  background-color: var(--hellgruen);
}
h1 {
  margin: 0px;
}
.main {
  position: relative;
}
.back-btn {
  height: 56px;
  width: 116px;
  background-color: var(--dunkelgruen);
  border-radius: 15px;
  margin: 25px 25px 15px 25px;
}
.weather {
  height: 200px;
  width: 297px;
  background-color: var(--dunkelgruen);
  border-radius: 11px;
  margin: 90px auto;
}
.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 5px;
  margin: auto;
  width: 278px;
}
.buttons span {
  width: 89px;
  height: 89px;
  background-color: var(--dunkelgruen);
  border: 1px solid var(--dunkelgruen);
  border-radius: 8px;
}
.icon {
  padding-top: 7px;
  position: relative;
}
.icon .label {
  position: absolute;
  top: 65px;
  margin: 0 auto;
  left: 30%;
}
.balken-bottom {
  background-color: var(--dunkelgruen);
  width: 393px;
  height: 44px;
  position: absolute;
  top: 738px;
}
</style>
