<template>
  <div class="balken"></div>
  <div class="main">
    <router-link class="router-link" to="/course"
      ><div class="back-btn">Zur Kursauswahl</div></router-link
    >
    <div>
      <WeatherView
        :city="city"
        :temp="`${grad} °C`"
        :wind="`${wind} Km/h`"
        :wetter="wetter"
        :luftdruck="`${luftdruck} %`"
      />
    </div>
    <div class="buttons">
      <router-link to="/ansicht"
        ><div><IconKarte /></div
      ></router-link>
      <router-link class="router-link" to="/spieler">
        <div><IconSpieler /></div
      ></router-link>
      <router-link class="router-link" to="/scores">
        <div><IconScore /></div
      ></router-link>
      <div><IconStatistik /></div>
      <router-link class="router-link" to="/regeln">
        <div><IconRegeln /></div
      ></router-link>
      <div><IconShop /></div>
    </div>
    <div class="balken-unten"><BalkenUnten /></div>
  </div>
</template>
<script>
import IconKarte from "@/components/IconKarte.vue";
import IconRegeln from "@/components/IconRegeln.vue";
import IconScore from "@/components/IconScore.vue";
import IconShop from "@/components/IconShop.vue";
import IconSpieler from "@/components/IconSpieler.vue";
import IconStatistik from "@/components/IconStatistik.vue";
import WeatherView from "@/components/WeatherView.vue";
import BalkenUnten from "@/components/BalkenUnten.vue";
// import BackButton from "@/components/BackButton.vue";

export default {
  // name: "NavigationScreen",
  components: {
    IconKarte,
    IconRegeln,
    IconScore,
    IconShop,
    IconSpieler,
    IconStatistik,
    WeatherView,
    BalkenUnten,
    // BackButton,
  },

  data() {
    return {
      city: "",
      grad: "",
      wind: "",
      wetter: "",
      luftdruck: "",
    };
  },

  methods: {
    async loadWeatherData() {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?units=metric&q=braunschweig&appid=981b2bcca4c56c67d791ae50ab9ba39c&lang=de"
      );
      const data = await response.json();
      this.city = data.name;
      this.grad = data.main.temp;
      this.wind = data.wind.speed;
      this.wetter = data.weather[0].main;
      this.luftdruck = data.main.humidity;
    },
  },
  created() {
    this.loadWeatherData();
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
.main {
  position: relative;
}
.back-btn {
  height: 56px;
  /* width: 116px; */
  background-color: var(--dunkelgruen);
  border-radius: 15px;
  margin: 25px 25px 15px 25px;
  position: absolute;
  top: 565px;
  left: 30%;
  margin: 0 auto;
  color: #d5eae3;
  font-size: 1rem;
  padding: 17px 12px 10px 12px;
  font-weight: 600;
}
.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px;
  margin: auto;
  width: 278px;
}
.buttons div {
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
.balken-unten {
  position: absolute;
  top: 673px;
}
</style>
