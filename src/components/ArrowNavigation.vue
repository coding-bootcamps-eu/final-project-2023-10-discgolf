<template>
  <div class="arrow-left">
    <img src="../assets/arrow-left.png" alt="left" />
  </div>
  <div class="round-link" @click="showComponent('RegelnStart')">1</div>
  <div class="round-link" @click="showComponent('RegelnScheibe')">2</div>
  <div class="round-link" @click="showComponent('RegelnTechnik')">3</div>
  <div class="arrow-right">
    <img src="../assets/arrow-right.png" alt="right" />
  </div>
</template>

<script>
export default {
  name: "ArrowNavigation",
};
</script>

<style scoped>
.round-link {
  background-color: #d5eae3;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: 15px 6px;
  font-size: 0.8rem;
  font-weight: 600;
  padding-top: 4px;
}
.arrow-left {
  margin-top: 15px;
  margin-right: 6px;
  height: 25px;
}
.arrow-right {
  margin-top: 15px;
  margin-left: 6px;
  height: 25px;
}
</style>
