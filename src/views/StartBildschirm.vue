<template>
  <div class="balken"></div>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo_discgolf.png" />
    <h1>Willkommen in der DiscGolf-App</h1>
    <router-link to="/course" class="button-hell margin">Play now!</router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "StartBildschirm",
  components: {},
};
</script>

<style scoped>
.home {
  background: linear-gradient(
    180deg,
    rgb(174.69, 218.22, 203.71) 0%,
    rgb(27, 54, 61) 83.08%
  );
  background-color: rgba(255, 255, 255, 1);
  height: 100%;
}

img {
  margin: auto;
}
.margin {
  padding: 5px;
}

h1 {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 32px;
  color: var(--hellgruen);
}
</style>
