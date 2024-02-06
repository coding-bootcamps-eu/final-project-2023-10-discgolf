<template>
  <div class="weather">
    <h2>{{ city }}</h2>
    <p class="temp">{{ temp }}</p>

    <img class="wetter" :src="wetterImg" />
    <div class="wind-and-luft">
      <div class="wind">
        <img src="@/assets/wetter-img/wind.png" />
        <p>{{ wind }}</p>
      </div>
      <div class="wind">
        <img src="@/assets/wetter-img/humidity.png" />
        <p>{{ luftdruck }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import drizzle from "@/assets/wetter-img/drizzle.png";
import clouds from "@/assets/wetter-img/clouds.png";
import clear from "@/assets/wetter-img/clear.png";
import rain from "@/assets/wetter-img/rain.png";
import mist from "@/assets/wetter-img/mist.png";
import snow from "@/assets/wetter-img/snow.png";

export default {
  name: "WeatherView",
  props: ["city", "temp", "wind", "wetter", "luftdruck"],
  computed: {
    wetterImg() {
      if (this.wetter === "Drizzle") {
        return drizzle;
      } else if (this.wetter === "Clouds") {
        return clouds;
      } else if (this.wetter === "Clear") {
        return clear;
      } else if (this.wetter === "Rain") {
        return rain;
      } else if (this.wetter === "Mist") {
        return mist;
      } else {
        return snow;
      }
    },
  },
};
</script>

<style scoped>
.weather {
  background-color: #3b7c7d;
  border-radius: 15px;
  width: 297px;
  margin: 90px auto;
  position: relative;
  color: #afdacc;
}
.wind {
  display: flex;
  align-items: center;
  margin-top: -15px;
  font-weight: 700;
}
.wind img {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
.wetter {
  width: 120px;
  height: 100px;
}
h2 {
  padding-top: 15px;
}
.temp {
  font-size: 22px;
  font-weight: 900;
  margin-top: -10px;
  margin-bottom: 1px;
}

.wind-and-luft {
  display: flex;
  justify-content: space-between;
  margin-inline: 20px;
}
</style>
