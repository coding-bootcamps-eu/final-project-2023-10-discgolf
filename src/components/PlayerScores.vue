<template>
  <!-- Wenn Löcher verfügbar sind -->
  <div v-if="holes.length > 0">
    <!-- Titel des aktuellen Lochs und Par-Anzeige -->
    <HoleMap
      :key="currentHoleIndex"
      :view="currentHoleView"
      :anfang="currentHoleStart"
      :ende="currentHoleEnd"
      :zoom="17.5"
    />

    <h3>
      {{ currentHoleIndex + 1 }}. {{ currentHole.title }} - Par
      {{ currentHole.par }} - Länge - {{ currentHole.length }}m
    </h3>
    <!-- Schleife durch alle Spieler für das aktuelle Loch -->
    <div
      v-for="(player, playerIndex) in activePlayers"
      :key="playerIndex"
      class="player-row"
    >
      <!-- Anzeige des Spielernamens -->
      <div class="player-name">{{ player.name }} ({{ player.totalScore }})</div>
      <!-- Button zum Verringern der Anzahl von Würfen -->
      <div class="plus-minus-button-left" @click="reduceThrow(playerIndex)">
        <img src="../assets/minus-icon.png" />
      </div>
      <!-- Anzeige der Anzahl von Würfen -->
      <div class="throw-count">{{ player.throws[currentHoleIndex] }}</div>
      <!-- Button zum Erhöhen der Anzahl von Würfen -->
      <div class="plus-minus-button-right" @click="increaseThrow(playerIndex)">
        <img src="../assets/plus-icon.png" />
      </div>
    </div>

    <!-- Navigationsbuttons für Löcher -->
    <div class="arrow-menu">
      <!-- Button für vorheriges Loch -->
      <div class="arrow-left" @click="previousHole">
        <img src="../assets/arrow-left.png" alt="left" />
      </div>
      <!-- Buttons für jedes Loch -->
      <div
        v-for="(index, buttonIndex) in visibleButtonIndexes"
        :key="buttonIndex"
        @click="setCurrentHole(index)"
        :class="{
          highlighted: index === currentHoleIndex,
          'not-highlighted': index !== currentHoleIndex,
          'round-link': true,
        }"
      >
        {{ index + 1 }}
      </div>

      <!-- Button für nächstes Loch -->
      <div class="arrow-right" @click="nextHole">
        <img src="../assets/arrow-right.png" alt="right" />
      </div>
    </div>
  </div>
  <!-- Wenn keine Löcher verfügbar sind -->
  <div v-else>Keine Löcher verfügbar.</div>
  <router-link class="router-link" to="/statistik">
    <div><SpielStatistik />BUTTON</div>
  </router-link>
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
      players: [], // Liste der Spieler
      selectedCourse: "", // Ausgewählter Kurs initialisiert
      holes: [], // Löcher initialisieren
      currentHoleIndex: 0, // Aktuellen Lochindex initialisieren
      visibleButtonIndexes: [], // Sichtbare Schaltflächenindizes
    };
  },
  async created() {
    // Ausgewählten Kurs aus dem lokalen Speicher abrufen
    this.selectedCourse = localStorage.getItem("selectedCourse");
    const storedCurrentHoleIndex = localStorage.getItem("currentHoleIndex");
    this.currentHoleIndex = storedCurrentHoleIndex
      ? parseInt(storedCurrentHoleIndex)
      : 0;
    await this.fetchPlayerData();
    this.updateVisibleButtons();
  },
  async mounted() {
    // Spielerdaten erneut abrufen, wenn sie nicht auf dem neuesten Stand sind
    await this.fetchPlayerData();
  },
  computed: {
    activePlayers() {
      return this.players.filter((player) => player.active === true);
    },
    currentHole() {
      return this.holes[this.currentHoleIndex];
    },
    currentHoleView() {
      return this.currentHole ? this.currentHole.coordinates.view : "";
    },
    currentHoleStart() {
      return this.currentHole ? this.currentHole.coordinates.start : "";
    },
    currentHoleEnd() {
      return this.currentHole ? this.currentHole.coordinates.end : "";
    },
  },
  watch: {
    currentHoleIndex() {
      this.updateVisibleButtons();
    },
  },
  methods: {
    async fetchPlayerData() {
      try {
        // Spielerdaten abrufen
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();

        // Spielerdaten verarbeiten
        this.players = users.map((user) => ({
          id: user.id,
          name: user.name,
          active: user.active, // Aktive Eigenschaft direkt aus der API setzen
          throws: JSON.parse(
            JSON.stringify(user[this.selectedCourse] || [])
          ).map((value) => (value !== null ? value : 0)), // Wurfarray tief kopieren und Nullwerte behandeln
          totalPar: 0,
          totalScore: 0,
        }));

        // Ausgewählte Karten- und Kursdaten aus dem lokalen Speicher abrufen
        const selectedMap = localStorage.getItem("selectedMap");

        // Streckendaten abrufen
        const tracksResponse = await fetch(`${API_URL}/tracks`);
        const data = await tracksResponse.json();

        // Ausgewählte Karten-Daten finden
        const selectedMapData = data.find((map) => map.id === selectedMap);

        // Löcher den ausgewählten Kursdaten zuweisen
        this.holes = selectedMapData.courses[this.selectedCourse];

        // Gesamtpar und Gesamtpunktzahl berechnen
        this.players.forEach((player) => {
          this.calculateTotalPar(player);
          this.calculateTotalScore(player);
        });
      } catch (error) {
        console.error("Fehler beim Abrufen der Spielerdaten:", error);
      }
    },

    // Methode zum Festlegen des aktuellen Lochs
    setCurrentHole(index) {
      this.currentHoleIndex = index;
      // Aktuellen currentHoleIndex im localStorage speichern
      localStorage.setItem("currentHoleIndex", index);
    },

    // Methode zum Wechseln zum vorherigen Loch
    previousHole() {
      if (this.currentHoleIndex > 0) {
        this.currentHoleIndex--;
        localStorage.setItem("currentHoleIndex", this.currentHoleIndex);
      }
    },

    // Methode zum Wechseln zum nächsten Loch
    nextHole() {
      if (this.currentHoleIndex < this.holes.length - 1) {
        this.currentHoleIndex++;
        localStorage.setItem("currentHoleIndex", this.currentHoleIndex);
      }
    },

    // Methode zum Erhöhen der Anzahl von Würfen für einen Spieler auf einem Loch
    async increaseThrow(playerIndex) {
      const player = this.activePlayers[playerIndex];
      if (player) {
        try {
          const response = await fetch(`${API_URL}/users/${player.id}`);
          const userData = await response.json();

          if (response.ok) {
            // Würfe für den ausgewählten Kurs für den spezifischen Spieler aktualisieren
            userData[this.selectedCourse][this.currentHoleIndex] =
              userData[this.selectedCourse][this.currentHoleIndex] + 1 || 1;

            // Die Würfe für den Spieler im this.players-Array aktualisieren
            this.activePlayers[playerIndex].throws =
              userData[this.selectedCourse];

            // Gesamtpar und Gesamtpunktzahl für den Spieler neu berechnen
            this.calculateTotalPar(this.activePlayers[playerIndex]);
            this.calculateTotalScore(this.activePlayers[playerIndex]);

            // Anfrage zum Aktualisieren der Benutzerdaten senden
            const updateResponse = await fetch(
              `${API_URL}/users/${player.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
              }
            );

            if (updateResponse.ok) {
              console.log("Spieler aktualisiert:", player.name);
            } else {
              console.error(
                "Fehler beim Aktualisieren des Spielers:",
                player.name
              );
            }
          } else {
            console.error(
              "Fehler beim Abrufen der Benutzerdaten:",
              userData.statusText
            );
          }
        } catch (error) {
          console.error(
            "Fehler beim Aktualisieren des Spielers:",
            player.name,
            error
          );
        }
      }
    },

    // Methode zum Verringern der Anzahl von Würfen für einen Spieler auf einem Loch
    async reduceThrow(playerIndex) {
      const player = this.activePlayers[playerIndex];
      if (player && player.throws[this.currentHoleIndex] > 0) {
        try {
          const response = await fetch(`${API_URL}/users/${player.id}`);
          const userData = await response.json();

          if (response.ok) {
            // Würfe für den ausgewählten Kurs für den spezifischen Spieler aktualisieren
            userData[this.selectedCourse][this.currentHoleIndex] =
              userData[this.selectedCourse][this.currentHoleIndex] - 1 || 0;

            // Die Würfe für den Spieler im this.players-Array aktualisieren
            this.activePlayers[playerIndex].throws =
              userData[this.selectedCourse];

            // Gesamtpar und Gesamtpunktzahl für den Spieler neu berechnen
            this.calculateTotalPar(this.activePlayers[playerIndex]);
            this.calculateTotalScore(this.activePlayers[playerIndex]);

            // Anfrage zum Aktualisieren der Benutzerdaten senden
            const updateResponse = await fetch(
              `${API_URL}/users/${player.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
              }
            );

            if (updateResponse.ok) {
              console.log("Spieler aktualisiert:", player.name);
            } else {
              console.error(
                "Fehler beim Aktualisieren des Spielers:",
                player.name
              );
            }
          } else {
            console.error(
              "Fehler beim Abrufen der Benutzerdaten:",
              userData.statusText
            );
          }
        } catch (error) {
          console.error(
            "Fehler beim Aktualisieren des Spielers:",
            player.name,
            error
          );
        }
      }
    },

    // Funktion zum Berechnen des Gesamtpars eines Spielers
    calculateTotalPar(player) {
      const throwsAsNumbers = player.throws.map((value) => parseInt(value, 10));
      player.totalPar = throwsAsNumbers.reduce((total, currentThrow, index) => {
        if (this.holes[index] && this.holes[index].par) {
          return total + currentThrow - this.holes[index].par;
        } else {
          return total;
        }
      }, 0);
    },

    // Funktion zum Berechnen der Gesamtpunktzahl eines Spielers
    calculateTotalScore(player) {
      const throwsAsNumbers = player.throws.map((value) => parseInt(value, 10));
      player.totalScore = throwsAsNumbers.reduce((total, currentThrow) => {
        return total + currentThrow;
      }, 0);
    },

    // Funktion zum Aktualisieren des Gesamtpars und der Gesamtpunktzahl eines Spielers
    updateScore(player) {
      this.calculateTotalPar(player);
      this.calculateTotalScore(player);
    },

    // Methode zum Speichern von Spielerwurfdaten
    async saveThrowsData(player, selectedCourse, throwsData) {
      try {
        // Benutzerdaten für die Aktualisierung zusammenstellen
        const userData = {
          name: player.name,
          active: player.active,
          [selectedCourse]: throwsData,
        };

        // Anfrage zum Aktualisieren der Benutzerdaten senden
        const response = await fetch(`${API_URL}/users/${player.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        // Überprüfen, ob die Antwort erfolgreich war
        if (!response.ok) {
          throw new Error("Fehler beim Speichern der Wurfdaten");
        }

        console.log("Wurfdaten erfolgreich gespeichert");
      } catch (error) {
        console.error("Fehler beim Speichern der Wurfdaten:", error);
      }
    },

    updateVisibleButtons() {
      const totalButtons = 3;
      const halfButtons = Math.floor(totalButtons / 2);

      let start = Math.max(0, this.currentHoleIndex - halfButtons);
      let end = Math.min(this.holes.length - 1, start + totalButtons - 1);

      if (end - start + 1 < totalButtons) {
        start = Math.max(0, end - totalButtons + 1);
      }

      this.visibleButtonIndexes = Array.from(
        { length: end - start + 1 },
        (_, i) => i + start
      );
    },
  },
};
</script>

<style scoped>
.highlighted {
  background-color: #3b7c7d; /* Sie können die Farbe entsprechend Ihrem Design ändern */
}
.not-highlighted {
  background-color: #d5eae3;
}

.round-link {
  /* background-color: #d5eae3; */
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: 15px 6px;
  font-size: 0.8rem;
  font-weight: 600;
  padding-top: 4px;
  cursor: pointer;
}

.arrow-left img,
.arrow-right img {
  height: auto;
  margin-top: 15px;
  margin-left: 6px;
  height: 25px;
  cursor: pointer;
}
.arrow-left img:hover,
.arrow-right img:hover {
  filter: brightness(0.5);
}

.arrow-menu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 795px;
  margin: auto;
  left: 45%;
}
h3 {
  margin: 25px 30px;
}
.player-container {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.player-row {
  display: grid;
  grid-template-columns: 200px, 0.5fr, 0.5fr, 0.5fr;
  margin-bottom: 5px;
  margin-left: 25px;
  margin-right: 25px;
}

.player-name {
  margin-left: 35px;
  text-align: left;
  grid-column-start: 1;
}

.throw-count {
  /* margin: 0; */
  grid-column-start: 3;
  position: absolute;
  left: 57%;
}

.plus-minus-button-left {
  /* margin-left: 10px; */
  grid-column-start: 2;
  position: absolute;
  left: 54.5%;
  cursor: pointer;
}
.plus-minus-button-right {
  /* margin-left: 10px; */
  grid-column-start: 4;
  margin-right: 25px;
  position: absolute;
  left: 59%;
  cursor: pointer;
}
</style>
