<template>
  <div>
    <!-- Schleife durch alle Spieler -->
    <div v-for="(player, playerIndex) in players" :key="playerIndex">
      <h2>{{ player.name }}'s Würfe:</h2>
      <div v-if="player.redCourses.length > 0">
        <ul>
          <!-- Schleife durch alle roten Kurse des Spielers -->
          <li v-for="(course, index) in player.redCourses" :key="index">
            {{ course.title }} - Par {{ course.par }}
            <!-- Eingabefeld für die Anzahl der Würfe -->
            <input
              type="number"
              v-model="player.throws[index]"
              min="0"
              @input="updateScore(player)"
            />
            <!-- Buttons zum Erhöhen und Verringern der Würfe -->
            <button @click="increaseThrow(playerIndex, index)">+</button>
            <button @click="reduceThrow(playerIndex, index)">-</button>
          </li>
        </ul>
        <p>Total</p>
        <p>Par: {{ player.totalPar }}</p>
        <p>Punkte: {{ player.totalScore }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { API_URL } from "../main.js";

export default {
  data() {
    return {
      players: [], // Spielerliste
    };
  },
  async mounted() {
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
  },
  methods: {
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
  },
};
</script>
