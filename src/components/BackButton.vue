<template>
  <div class="back-btn">
    <img src="../assets/pfeil.png" alt="zurück" class="pfeil" />Zurück
  </div>
</template>

<script>
export default {
  name: "BackButton",
};
</script>

<style scoped>
.back-btn {
  height: 56px;
  width: 116px;
  background-color: var(--dunkelgruen);
  border-radius: 15px;
  margin: 25px 25px 15px 25px;
  color: #d5eae3;
  font-size: 1rem;
  padding-top: 17px;
  font-weight: 600;
}
.pfeil {
  margin-right: 8px;
  width: 0.8rem;
  height: 0.8rem;
}
</style>
