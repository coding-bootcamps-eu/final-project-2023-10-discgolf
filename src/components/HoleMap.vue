<template>
  <div class="map-container">
    <div id="map"></div>
    <button class="btn btn-locate" @click="locateUser">
      <img
        @mouseenter="hover_locate = true"
        @mouseleave="hover_locate = false"
        class="imgage-locate"
        :class="{ 'locate-hover': hover_locate }"
        src="../assets/locate.svg"
        alt=""
      />
    </button>
    <button class="btn btn-basket" :class="AbwurfBtn" @click="locateBasket">
      <img
        @mouseenter="hover_basket = true"
        @mouseleave="hover_basket = false"
        class="imgage-locate"
        :class="{ 'locate-hover': hover_basket }"
        src="../assets/basket-btn.svg"
        alt=""
      />
    </button>
  </div>
</template>

<script>
import L from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
// import "/dist/css/leaflet.css";
import abwurf from "@/assets/abwurf.png";
import courseBeginn from "@/assets/coursebeginn.png";
import basket from "@/assets/basket.png";
import standort from "@/assets/circle.png";
import frisbee from "@/assets/frisbee.png";
export default {
  data() {
    return {
      map: null,
      startMarker: null,
      endMarker: null,
      userMarker: null,
      hover_basket: false,
      hover_locate: false,
      markerSize: [40, 40],
    };
  },
  props: ["view", "anfang", "ende", "zoom", "scheibeLeihen", "spielort"],
  computed: {
    AbwurfBtn() {
      return this.anfang ? "" : "hidden-btn";
    },
  },
  methods: {
    initializeMap() {
      this.map = L.map("map", {
        zoomControl: true,
        zoom: 1,
        zoomAnimation: false,
        fadeAnimation: true,
        markerZoomAnimation: true,
      }).setView(this.view, this.zoom);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    },
    locateBasket() {
      if (this.anfang || this.spielort) {
        this.map.panTo(this.startMarker.getLatLng());
      }
    },
    locateUser() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = L.latLng(
              position.coords.latitude,
              position.coords.longitude
            );
            this.map.panTo(userLocation);

            // Füge den Benutzermarker hinzu
            if (this.userMarker) {
              this.map.removeLayer(this.userMarker);
            }
            this.userMarker = L.marker(userLocation, {
              icon: new L.Icon({ iconUrl: standort, iconSize: [40, 40] }),
            })
              .addTo(this.map)
              .bindPopup("Dein Standort")
              .openPopup();

            // Hier wird die Luftlinie hinzugefügt
            if (this.startMarker) {
              L.polyline([userLocation, this.startMarker.getLatLng()], {
                color: "red",
                dashArray: "5, 5",
              }).addTo(this.map);
            }
          },
          (error) => {
            alert("Fehler bei der Standortbestimmung: " + error.message);
          }
        );
      } else {
        alert("Geolocation wird von deinem Browser nicht unterstützt.");
      }
    },
  },
  mounted() {
    this.initializeMap();

    // Start- und Endpunkte setzen
    if (this.anfang && this.ende) {
      this.startMarker = L.marker(this.anfang, {
        icon: new L.Icon({
          iconUrl: abwurf,
          iconSize: [40, 40],
        }),
      }).addTo(this.map);
      this.endMarker = L.marker(this.ende, {
        icon: new L.Icon({
          iconUrl: basket,
          iconSize: [40, 40],
        }),
      }).addTo(this.map);
    }

    if (this.anfang && this.ende) {
      L.polyline([this.endMarker.getLatLng(), this.startMarker.getLatLng()], {
        color: "blue",
      }).addTo(this.map);
    }

    if (this.spielort && this.scheibeLeihen) {
      this.startMarker = L.marker(this.spielort, {
        icon: new L.Icon({
          iconUrl: courseBeginn,
          iconSize: [40, 40],
        }),
      })
        .bindPopup("Anfang des Kurses")
        .addTo(this.map);
      this.endMarker = L.marker(this.scheibeLeihen, {
        icon: new L.Icon({
          iconUrl: frisbee,
          iconSize: [40, 40],
        }),
      })
        .bindPopup("Hier kannst du dir Scheiben ausleihen")
        .addTo(this.map);
    }
  },
};
</script>

<style scoped>
.map-container {
  position: relative;
}
#map {
  height: 400px;
  z-index: 0;
}
.btn {
  border: none;
  padding: 0;
  z-index: 60;
  position: absolute;
  width: 35px;
  height: 35px;
}
.btn-locate {
  left: 10px;
  top: 90px;
}

.btn-basket {
  left: 10px;
  top: 130px;
}

.imgage-locate {
  width: 35px;
  height: 35px;
  transition: 0.4s;
}
.locate-hover {
  width: 40px;
  height: 40px;
}
.hidden-btn {
  display: none;
}
</style>
