<template>
  <div class="balken"></div>
  <div class="about"></div>
  <router-link class="router-link" to="/nav">
    <div><BackButton /></div>
  </router-link>
  <div class="menu">
    <div class="rules">
      <RegelnStart v-if="activeComponent === 'RegelnStart'" />
      <RegelnScheibe v-if="activeComponent === 'RegelnScheibe'" />
      <RegelnTechnik v-if="activeComponent === 'RegelnTechnik'" />
    </div>
    <div class="arrow-menu">
      <div class="arrow-left" @click="previousComponent()">
        <img src="../assets/arrow-left.png" alt="left" />
      </div>
      <div
        class="round-link"
        v-for="(component, index) in components"
        :key="index"
        @click="showComponent(index)"
        :class="{ active: currentIndex === index }"
      >
        {{ index + 1 }}
      </div>
      <div class="arrow-right" @click="nextComponent()">
        <img src="../assets/arrow-right.png" alt="right" />
      </div>
    </div>
    <div class="balken-unten"><BalkenUnten /></div>
  </div>
</template>

<script>
import BalkenUnten from "@/components/BalkenUnten.vue";
import BackButton from "@/components/BackButton.vue";
import RegelnStart from "@/components/RegelnStart.vue";
import RegelnScheibe from "@/components/RegelnScheibe.vue";
import RegelnTechnik from "@/components/RegelnTechnik.vue";

export default {
  components: {
    BalkenUnten,
    BackButton,
    RegelnStart,
    RegelnScheibe,
    RegelnTechnik,
  },
  data() {
    return {
      components: [RegelnStart, RegelnScheibe, RegelnTechnik],
      currentIndex: 0,
    };
  },
  computed: {
    activeComponent() {
      return this.components[this.currentIndex].name;
    },
  },
  methods: {
    showComponent(index) {
      this.currentIndex = index;
    },
    previousComponent() {
      this.currentIndex =
        (this.currentIndex - 1 + this.components.length) %
        this.components.length;
    },
    nextComponent() {
      this.currentIndex = (this.currentIndex + 1) % this.components.length;
    },
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
.round-link {
  background-color: #d5eae3;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: 15px 6px;
  font-size: 0.8rem;
  font-weight: 600;
  padding-top: 4px;
  cursor: pointer;
}
.round-link:hover {
  background-color: #ffffff;
}
.round-link.active {
  background-color: #3b7c7d;
}
.arrow-left {
  margin-top: 15px;
  margin-right: 6px;
  height: 25px;
  cursor: pointer;
}
.arrow-left:hover img {
  filter: brightness(0) invert(1);
}
.arrow-right {
  margin-top: 15px;
  margin-left: 6px;
  height: 25px;
  cursor: pointer;
}
.arrow-right:hover img {
  filter: brightness(0) invert(1);
}
</style>
