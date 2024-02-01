<template>
  <div>
    <div id="map"></div>
    <button @click="locateUser">Meinen Standort finden</button>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
      this.map = L.map("map").setView([52.24828145, 10.52451875], 17.5);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
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
            this.map.on("zoomend", () => {
              const currentZoom = this.map.getZoom();
              const newIconSize = [
                40 / 2 ** (17.5 - currentZoom),
                40 / 2 ** (17.5 - currentZoom),
              ];
              const newIcon = new L.Icon({
                iconUrl: "@/assets/diskgolf2_1.png",
                iconSize: newIconSize,
              });
              this.userMarker.setIcon(newIcon);
            });

            // Füge den Benutzermarker hinzu
            if (this.userMarker) {
              this.map.removeLayer(this.userMarker);
            }
            this.userMarker = L.marker(userLocation, {
              icon: new L.Icon({ iconUrl: "person.png", iconSize: [40, 40] }),
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
    const starter = [52.25072, 10.523546];
    const ender = [52.2502666, 10.5247798];

    this.startMarker = L.marker(starter, {
      icon: new L.Icon({
        iconUrl: "@/assets/diskgolf2_1.png",
        iconSize: [40, 40],
      }),
    }).addTo(this.map);
    this.endMarker = L.marker(ender, {
      icon: new L.Icon({
        iconUrl: "@/assets/diskgolf2_1.png",
        iconSize: [40, 40],
      }),
    }).addTo(this.map);
  },
};
</script>

<style>
#map {
  height: 400px;
}
</style>
