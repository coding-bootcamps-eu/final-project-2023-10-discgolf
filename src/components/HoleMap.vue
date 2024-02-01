<template>
  <div class="map-container">
    <div id="map"></div>
    <button class="btn btn-locate" @click="locateUser">
      <img class="imgage-locate" src="../assets/locate.svg" alt="" />
    </button>
    <button class="btn btn-basket" @click="locateBasket">
      <img class="imgage-locate" src="../assets/basket-btn.svg" alt="" />
    </button>
  </div>
</template>

<script>
import L from "leaflet";
import "/dist/css/leaflet.css";
import abwurf from "@/assets/abwurf.png";
import basket from "@/assets/basket.png";
import standort from "@/assets/circle.png";
export default {
  data() {
    return {
      map: null,
      startMarker: null,
      endMarker: null,
      userMarker: null,
    };
  },
  methods: {
    initializeMap() {
      this.map = L.map("map").setView([52.2504933, 10.5241629], 17.5);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    },
    locateBasket() {
      this.map.panTo(this.startMarker.getLatLng());
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

            // Aktualisiere die Größe des Benutzermarkers basierend auf dem Zoom-Level

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
    this.starter = [52.25072, 10.523546];
    this.ender = [52.2502666, 10.5247798];

    this.startMarker = L.marker(this.starter, {
      icon: new L.Icon({
        iconUrl: abwurf,
        iconSize: [40, 40],
      }),
    }).addTo(this.map);
    this.endMarker = L.marker(this.ender, {
      icon: new L.Icon({
        iconUrl: basket,
        iconSize: [40, 40],
      }),
    }).addTo(this.map);

    if (this.startMarker) {
      L.polyline([this.endMarker.getLatLng(), this.startMarker.getLatLng()], {
        color: "blue",
      }).addTo(this.map);
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
}
</style>
