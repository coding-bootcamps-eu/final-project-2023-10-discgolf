<template>
  <div class="menu">
    <div class="rules">
      <h2>Rückhandwurf – Grundtechnik</h2>
      <p>
        <img src="../assets/rules.png" />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegelnTechnik",
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
img {
  width: 100%;
  background-color: var(--hellgruen);
  margin-top: 25px;
}
</style>
