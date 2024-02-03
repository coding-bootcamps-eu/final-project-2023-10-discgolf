<template>
  <div>
    <!-- Schleife durch alle Spieler -->
    <div v-for="(player, playerIndex) in players" :key="playerIndex">
      <h2>{{ player.name }}'s Würfe:</h2>
      <div v-if="player.redCourses.length > 0">
        <!-- Schleife durch alle roten Kurse des Spielers -->
        <div v-for="(course, index) in player.redCourses" :key="index">
          <div v-if="index + 1 === bahn">
            {{ course.title }} - Par {{ course.par }}

            <!-- Buttons zum Erhöhen und Verringern der Würfe -->
            <button @click="increaseThrow(playerIndex, index)">+</button>
            <!-- Eingabefeld für die Anzahl der Würfe -->
            <p>{{ player.throws[index] }}</p>
            <button @click="reduceThrow(playerIndex, index)">-</button>
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

export default {
  data() {
    return {
      players: [], // Spielerliste
      bahn: 1,
      bahnen: [],
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
        redCourses: [],
        throws: [],
        totalPar: 0,
        totalScore: 0,
      }));
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
        console.log("Daten abgerufen:", data);
        player.redCourses = data[0].courses.red; // Rote Kurse für den Spieler
        console.log(`${player.name}'s Rote Kurse:`, player.redCourses);
        console.log(`Moin ${this.course}`);
        // Gespeicherte Würfe verwenden oder mit Standardwerten initialisieren
        if (!savedThrows) {
          player.throws = new Array(player.redCourses.length).fill(0);
        } else {
          player.throws = savedThrows;
        }
        // Gesamtpar und Gesamtpunkte berechnen
        this.calculateTotalPar(player);
        this.calculateTotalScore(player);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Spielerdaten:", error);
    }
    this.loadTrack();
  },

  methods: {
    // Kursdaten abrufen
    async loadTrack() {
      const tracksResponse = await fetch(`${API_URL}/tracks`);
      const data = await tracksResponse.json();
      console.log("Daten abgerufen:", data);
      this.bahnen = data[0].courses.red; // Rote Kurse für den Spieler
    },
    // Gesamtpar eines Spielers berechnen
    calculateTotalPar(player) {
      const throwsAsNumbers = player.throws.map((value) => parseInt(value, 10));
      player.totalPar = throwsAsNumbers.reduce((total, currentThrow, index) => {
        return total + currentThrow - player.redCourses[index].par;
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
    updateScore(player) {
      this.calculateTotalPar(player);
      this.calculateTotalScore(player);

      // Würfe im lokalen Speicher speichern
      localStorage.setItem(
        `player${this.players.indexOf(player)}Throws`,
        JSON.stringify(player.throws)
      );
    },
    // Methode zum Erhöhen der Anzahl von Würfen
    increaseThrow(playerIndex, throwIndex) {
      this.players[playerIndex].throws[throwIndex]++;
      this.updateScore(this.players[playerIndex]);
    },
    // Methode zum Verringern der Anzahl von Würfen
    reduceThrow(playerIndex, throwIndex) {
      if (this.players[playerIndex].throws[throwIndex] > 0) {
        this.players[playerIndex].throws[throwIndex]--;
        this.updateScore(this.players[playerIndex]);
      }
    },
    selectBahn(selectedBahn) {
      this.bahn = selectedBahn;
      // Führe weitere Aktualisierungen oder Berechnungen hier durch, falls erforderlich
    },
  },
};
</script>
