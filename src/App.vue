<template>
  <div id="app">
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
  font-family: "Open Sans", sans-serif;
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
  background-color: var(--hellgruen);
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
.button-ganz-hell {
  background-color: var(--hellgruen);
  border-color: var(--dunkelgruen);
  border: 1px solid;
  border-radius: 15px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: large;
  color: var(--dunkelgruen);
}

* {
  box-sizing: border-box;
}

.plus-minus-button {
  background-color: var(--hellgruen);
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: large;
  font-weight: bolder;
  color: var(--dunkelgruen);
  border-radius: 100%;
  cursor: pointer;
}

.router-link {
  text-decoration: none;
}
</style>
