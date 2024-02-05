<template>
  <div>
    <div v-for="(korb, index) in bahnen" :key="korb">
      <div v-if="index + 1 === bahn">
        <HoleMap
          :view="bahnen[index].coordinates.view"
          :anfang="bahnen[index].coordinates.start"
          :ende="bahnen[index].coordinates.end"
        />
        <h1>{{ bahnen[index].title }}</h1>
        <p>{{ `Par: ${bahnen[index].par}` }}</p>
        <p>{{ `Länge: ${bahnen[index].length} Meter` }}</p>
      </div>
    </div>
    <div v-for="(player, playerIndex) in activePlayers" :key="playerIndex">
      <h2>{{ player.name }}'s Würfe:</h2>
      <div v-if="player.selectedCourse && player.selectedCourse.length > 0">
        <!-- Schleife durch alle Kurse des Spielers -->
        <div v-for="(course, index) in player.selectedCourse" :key="index">
          <div v-if="index + 1 === bahn">
            <!-- Buttons zum Erhöhen und Verringern der Würfe -->
            <button
              class="plus-minus-button"
              @click="increaseThrow(playerIndex, index)"
            >
              +
            </button>
            <!-- Eingabefeld für die Anzahl der Würfe -->
            <p>{{ player.throws[index] }}</p>
            <button
              class="plus-minus-button"
              @click="reduceThrow(playerIndex, index)"
            >
              -
            </button>
          </div>
        </div>
        <p>Total</p>
        <p>Par: {{ player.totalPar }}</p>
        <p>Punkte: {{ player.totalScore }}</p>
      </div>
    </div>
    <div v-for="(korb, index) in bahnen" :key="korb">
      <button @click="selectBahn(index + 1)">{{ index + 1 }}</button>
    </div>
  </div>
</template>

<script>
import { API_URL } from "../main.js";
import HoleMap from "./HoleMap.vue";

export default {
  components: {
    HoleMap,
  },
  data() {
    return {
      players: [], // Spielerliste
      bahn: 1,
      bahnen: [],
      selectedCourse: "", // Ausgewählter Kurs initialisieren
    };
  },

  async created() {
    try {
      // Benutzerdaten abrufen
      const response = await fetch(`${API_URL}/users`);
      const users = await response.json();
      // Benutzerdaten verarbeiten und Spielerliste initialisieren
      this.players = users.map((user) => ({
        name: user.name,
        active: user.active, // "active" Eigenschaft aus der API hinzufügen
        selectedCourse: "", // Ausgewählter Kurs initialisieren
        throws: [],
        totalPar: 0,
        totalScore: 0,
      }));
      // Laden des ausgewählten Kurses aus dem LocalStorage
      this.selectedCourse = localStorage.getItem("selectedCourse");
      // Kursdaten abrufen und Würfe für jeden Spieler initialisieren
      for (
        let playerIndex = 0;
        playerIndex < this.players.length;
        playerIndex++
      ) {
        const player = this.players[playerIndex];
        const savedThrows = JSON.parse(
          localStorage.getItem(`player${playerIndex}Throws`)
        );
        // Kursdaten abrufen
        const tracksResponse = await fetch(`${API_URL}/tracks`);
        const data = await tracksResponse.json();
        // Gespeicherten Kurs für den Spieler setzen
        player.selectedCourse = this.selectedCourse;
        // Gespeicherte Würfe verwenden oder mit Standardwerten initialisieren
        if (!savedThrows) {
          player.throws = new Array(
            data[0].courses[player.selectedCourse].length
          ).fill(0);
        } else {
          player.throws = savedThrows;
        }
        // Gesamtpar und Gesamtpunkte berechnen
        this.calculateTotalPar(player, data[0].courses[player.selectedCourse]);
        this.calculateTotalScore(player);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Spielerdaten:", error);
    }
    this.loadTrack();
  },

  // Spieler nach "active"-Eigenschaft filtern, um nur die aktiven Spieler anzuzeigen.
  computed: {
    activePlayers() {
      return this.players.filter((player) => player.active === true);
    },
  },

  methods: {
    // Kursdaten abrufen
    async loadTrack() {
      const tracksResponse = await fetch(`${API_URL}/tracks`);
      const data = await tracksResponse.json();

      this.bahnen = data[0].courses[this.selectedCourse]; // Rote Kurse für den Spieler
    },

    // Gesamtpar eines Spielers berechnen
    calculateTotalPar(player, selectedCourseData) {
      const throwsAsNumbers = player.throws.map((value) => parseInt(value, 10));
      player.totalPar = throwsAsNumbers.reduce((total, currentThrow, index) => {
        return total + currentThrow - selectedCourseData[index].par;
      }, 0);
    },

    // Gesamtpunkte eines Spielers berechnen
    calculateTotalScore(player) {
      const throwsAsNumbers = player.throws.map((value) => parseInt(value, 10));
      player.totalScore = throwsAsNumbers.reduce((total, currentThrow) => {
        return total + currentThrow;
      }, 0);
    },

    // Spielerpunkte aktualisieren
    updateScore(player, selectedCourseData) {
      this.calculateTotalPar(player, selectedCourseData);
      this.calculateTotalScore(player);

      // Würfe im lokalen Speicher speichern
      localStorage.setItem(
        `player${this.players.indexOf(player)}Throws`,
        JSON.stringify(player.throws)
      );
    },

    // Methode zum Erhöhen der Anzahl von Würfen
    increaseThrow(playerIndex, throwIndex) {
      const selectedCourseData = this.bahnen; // Assuming this contains the necessary data
      this.players[playerIndex].throws[throwIndex]++;
      this.updateScore(this.players[playerIndex], selectedCourseData);
    },

    // Methode zum Verringern der Anzahl von Würfen
    reduceThrow(playerIndex, throwIndex) {
      const selectedCourseData = this.bahnen; // Assuming this contains the necessary data
      if (this.players[playerIndex].throws[throwIndex] > 0) {
        this.players[playerIndex].throws[throwIndex]--;
        this.updateScore(this.players[playerIndex], selectedCourseData);
      }
    },

    selectBahn(selectedBahn) {
      this.bahn = selectedBahn;

      // Führe weitere Aktualisierungen oder Berechnungen hier durch, falls erforderlich
    },
  },
};
</script>
