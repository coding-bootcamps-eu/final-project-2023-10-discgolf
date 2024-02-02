<template>
  <div>
    <label for="map">Spielstätte:</label>
    <select v-model="selectedMap" @change="fetchCourses">
      <option disabled value="">Wählen Sie eine Spielstätte aus:</option>
      <option v-for="map in maps" :key="map.id" :value="map.id">
        {{ map.mapTitle }}
      </option>
    </select>

    <label for="course">Layout:</label>
    <select v-model="selectedCourse">
      <option disabled value="">Wählen Sie das Layout aus:</option>
      <option v-for="course in courses" :key="course" :value="course">
        {{ course }}
      </option>
    </select>

    <button>Bestätigen</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedMap: null,
      selectedCourse: null,
      maps: [],
      courses: [],
    };
  },
  methods: {
    fetchCourses() {
      const selectedMapObj = this.maps.find(
        (map) => map.id === this.selectedMap
      );
      if (selectedMapObj) {
        this.courses = Object.keys(selectedMapObj.courses);
      }
    },
    fetchMaps() {
      fetch("http://localhost:3000/tracks")
        .then((response) => response.json())
        .then((data) => {
          this.maps = data;
        });
    },
  },
  mounted() {
    this.fetchMaps();
  },
};
</script>
