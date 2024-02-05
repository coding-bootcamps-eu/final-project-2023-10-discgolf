<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/course">Course</router-link> |
      <router-link to="/nav">Navigation</router-link> |
      <router-link to="/spieler">Spielerwahl</router-link> |
      <router-link to="/scores">Spielstand</router-link> |
      <router-link to="/ansicht">Kartenansicht</router-link> |
      <router-link to="/regeln">Regeln</router-link> |
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
:root {
  --hellgruen: #afdacc;
  --dunkelgruen: #3b7c7d;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
  margin: auto;
}

main {
  height: 852px;
  width: 393px;
  border: 1px solid red;
  margin: auto;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.balken {
  background-color: var(--dunkelgruen);
  width: 393px;
  height: 44px;
}

.button-hell {
  background-color: var(--dunkelgruen);
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: large;
  color: var(--hellgruen);
  border-radius: 15px;
}

* {
  box-sizing: border-box;
}
</style>
