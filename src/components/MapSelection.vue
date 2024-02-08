<template>
  <!-- Auswahl der Spielstätte und des Layouts -->
  <div class="selects">
    <label for="map">Spielstätte:</label>
    <!-- Dropdown-Menü für die Auswahl der Spielstätte -->
    <select v-model="selectedMap" @change="fetchCourses">
      <option disabled value="">Wählen Sie eine Spielstätte aus:</option>
      <!-- Iteration über verfügbare Spielstätten -->
      <option v-for="map in maps" :key="map.id" :value="map.id">
        {{ map.mapTitle }}
      </option>
    </select>

    <label for="course">Layout:</label>
    <!-- Dropdown-Menü für die Auswahl des Layouts -->
    <select v-model="selectedCourse">
      <option disabled value="">Wählen Sie das Layout aus:</option>
      <!-- Iteration über verfügbare Layouts -->
      <option v-for="course in courses" :key="course" :value="course">
        {{ course }}
      </option>
    </select>
  </div>
  <div class="submit">
    <!-- Bestätigungstaste -->
    <router-link to="/nav" class="button-hell" @click="saveSelection"
      >Bestätigen</router-link
    >
  </div>
</template>

<script>
import { API_URL } from "../main.js";

export default {
  data() {
    return {
      selectedMap: null,
      selectedCourse: null,
      maps: [], // Liste der verfügbaren Spielstätten
      courses: [], // Liste der verfügbaren Layouts
    };
  },
  methods: {
    // Abrufen der verfügbaren Layouts basierend auf der ausgewählten Spielstätte
    fetchCourses() {
      const selectedMapObj = this.maps.find(
        (map) => map.id === this.selectedMap
      );
      if (selectedMapObj) {
        this.courses = Object.keys(selectedMapObj.courses);
      }
    },
    // Abrufen der verfügbaren Spielstätten
    fetchMaps() {
      fetch(`${API_URL}/tracks`)
        .then((response) => response.json())
        .then((data) => {
          this.maps = data;
          // Auswahl aus dem lokalen Speicher wiederherstellen, wenn die Komponente eingebunden wird
          this.retrieveSelection();
        });
    },
    // Auswahl speichern
    saveSelection() {
      localStorage.setItem("selectedMap", this.selectedMap);
      localStorage.setItem("selectedCourse", this.selectedCourse);
      localStorage.removeItem("currentHoleIndex");
    },
    // Auswahl aus dem lokalen Speicher abrufen
    retrieveSelection() {
      this.selectedMap = localStorage.getItem("selectedMap");
      this.selectedCourse = localStorage.getItem("selectedCourse");
      // Layouts für die ausgewählte Spielstätte abrufen
      this.fetchCourses();
    },
  },
  mounted() {
    // Beim Laden der Komponente Spielstätten abrufen
    this.fetchMaps();
  },
  watch: {
    // Änderungen in der ausgewählten Spielstätte beobachten und die zugehörigen Layouts abrufen
    selectedMap: function (newMap) {
      if (newMap) {
        this.fetchCourses();
      }
    },
  },
};
</script>
<style scoped>
.selects {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 70%;
  margin-top: 15px;
}
.selects label {
  text-align: left;
  margin-top: 25px;
  margin-bottom: 10px;
}
.selects select {
  height: 40px;
  border-radius: 15px;
  background-color: #afdacc;
}
.submit {
  text-align: right;
  margin-right: 60px;
  margin-top: 45px;
}
.button-hell {
  text-decoration: none;
  padding: 12px;
  box-shadow: 0 1px 2px var(--dunkelgruen);
}
</style>
