<template>
  <!-- If holes are available -->
  <div v-if="holes.length > 0">
    <!-- Title of the current hole and par display -->
    <HoleMap
      :key="currentHoleIndex"
      :view="currentHoleView"
      :anfang="currentHoleStart"
      :ende="currentHoleEnd"
      :zoom="17.5"
    />

    <h2>
      {{ currentHoleIndex + 1 }}. {{ currentHole.title }} - Par
      {{ currentHole.par }} - Länge - {{ currentHole.length }}m
    </h2>
    <!-- Loop through all players for the current hole -->
    <div v-for="(player, playerIndex) in activePlayers" :key="playerIndex">
      <div>
        <!-- Display player name -->
        <span>{{ player.name }}</span>
        <!-- Button to decrease the number of throws -->
        <button class="plus-minus-button" @click="reduceThrow(playerIndex)">
          -
        </button>
        <!-- Display number of throws -->
        <span>{{ player.throws[currentHoleIndex] }}</span>
        <!-- Button to increase the number of throws -->
        <button class="plus-minus-button" @click="increaseThrow(playerIndex)">
          +
        </button>
      </div>
      <!-- Display total par and total score for each player -->
      <p>Total Par: {{ player.totalPar }}</p>
      <p>Total Score: {{ player.totalScore }}</p>
    </div>
    <!-- Navigation buttons for holes -->
    <div>
      <!-- Button for previous hole -->
      <button class="arrow-left" @click="previousHole">&lt;</button>
      <!-- Buttons for each hole -->
      <button
        v-for="buttonIndex in visibleButtonIndexes"
        :key="buttonIndex"
        @click="setCurrentHole(buttonIndex)"
        :class="{
          highlighted: buttonIndex === currentHoleIndex,
          'not-highlighted': buttonIndex !== currentHoleIndex,
          'round-link': true,
        }"
      >
        {{ buttonIndex + 1 }}
      </button>

      <!-- Button for next hole -->
      <button class="arrow-right" @click="nextHole">&gt;</button>
    </div>
  </div>
  <!-- If no holes are available -->
  <div v-else>No holes available.</div>
</template>

<style scoped>
.highlighted {
  background-color: #3b7c7d; /* You can change the color as per your design */
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
}
.arrow-left {
  margin-top: 15px;
  margin-right: 6px;
  height: 25px;
}
.arrow-right {
  margin-top: 15px;
  margin-left: 6px;
  height: 25px;
}
</style>

<script>
import { API_URL } from "../main.js";
import HoleMap from "./HoleMap.vue";

export default {
  components: {
    HoleMap,
  },
  data() {
    return {
      players: [], // List of players
      selectedCourse: "", // Selected course initialized
      holes: [], // Initialize holes
      currentHoleIndex: 0, // Initialize current hole index
      visibleButtonIndexes: [], // Visible button indexes
    };
  },
  async created() {
    // Retrieve selected course from local storage
    this.selectedCourse = localStorage.getItem("selectedCourse");
    await this.fetchPlayerData();
    this.updateVisibleButtons();
  },
  async mounted() {
    // Re-fetch player data if not up to date
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
        // Fetch player data
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();

        // Process player data
        this.players = users.map((user) => ({
          id: user.id,
          name: user.name,
          active: user.active, // Set active property directly from API
          throws: JSON.parse(
            JSON.stringify(user[this.selectedCourse] || [])
          ).map((value) => (value !== null ? value : 0)), // Deep copy throw array and handle null values
          totalPar: 0,
          totalScore: 0,
        }));

        // Fetch selected map and course data from local storage
        const selectedMap = localStorage.getItem("selectedMap");

        // Fetch track data
        const tracksResponse = await fetch(`${API_URL}/tracks`);
        const data = await tracksResponse.json();

        // Find selected map data
        const selectedMapData = data.find((map) => map.id === selectedMap);

        // Assign holes to selected course data
        this.holes = selectedMapData.courses[this.selectedCourse];

        // Calculate total par and total score
        this.players.forEach((player) => {
          this.calculateTotalPar(player);
          this.calculateTotalScore(player);
        });
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    },

    // Method to set the current hole
    setCurrentHole(index) {
      this.currentHoleIndex = index;
    },

    // Method to switch to previous hole
    previousHole() {
      if (this.currentHoleIndex > 0) {
        this.currentHoleIndex--;
      }
    },

    // Method to switch to next hole
    nextHole() {
      if (this.currentHoleIndex < this.holes.length - 1) {
        this.currentHoleIndex++;
      }
    },

    // Method to increase the number of throws for a player on a hole
    async increaseThrow(playerIndex) {
      const player = this.activePlayers[playerIndex];
      if (player) {
        try {
          const response = await fetch(`${API_URL}/users/${player.id}`);
          const userData = await response.json();

          if (response.ok) {
            // Update throws for selected course
            userData[this.selectedCourse][this.currentHoleIndex] =
              userData[this.selectedCourse][this.currentHoleIndex] + 1 || 1;

            // Send request to update user data
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
              console.log("Player updated:", player.name);
              await this.fetchPlayerData(); // Update player data after successful update
            } else {
              console.error("Error updating player:", player.name);
            }
          } else {
            console.error("Error fetching user data:", userData.statusText);
          }
        } catch (error) {
          console.error("Error updating player:", player.name, error);
        }
      }
    },

    // Method to decrease the number of throws for a player on a hole
    async reduceThrow(playerIndex) {
      const player = this.activePlayers[playerIndex];
      if (player && player.throws[this.currentHoleIndex] > 0) {
        try {
          const response = await fetch(`${API_URL}/users/${player.id}`);
          const userData = await response.json();

          if (response.ok) {
            // Update throws for selected course
            userData[this.selectedCourse][this.currentHoleIndex] =
              userData[this.selectedCourse][this.currentHoleIndex] - 1 || 0;

            // Send request to update user data
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
              console.log("Player updated:", player.name);
              await this.fetchPlayerData(); // Update player data after successful update
            } else {
              console.error("Error updating player:", player.name);
            }
          } else {
            console.error("Error fetching user data:", userData.statusText);
          }
        } catch (error) {
          console.error("Error updating player:", player.name, error);
        }
      }
    },

    // Function to calculate the total par of a player
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

    // Function to calculate the total score of a player
    calculateTotalScore(player) {
      const throwsAsNumbers = player.throws.map((value) => parseInt(value, 10));
      player.totalScore = throwsAsNumbers.reduce((total, currentThrow) => {
        return total + currentThrow;
      }, 0);
    },

    // Function to update the total par and total score of a player
    updateScore(player) {
      this.calculateTotalPar(player);
      this.calculateTotalScore(player);
    },

    // Method to save player throw data
    async saveThrowsData(player, selectedCourse, throwsData) {
      try {
        // Compile user data for update
        const userData = {
          name: player.name,
          active: player.active,
          [selectedCourse]: throwsData,
        };

        // Send request to update user data
        const response = await fetch(`${API_URL}/users/${player.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        // Check if response was successful
        if (!response.ok) {
          throw new Error("Error saving throw data");
        }

        console.log("Throw data saved successfully");
      } catch (error) {
        console.error("Error saving throw data:", error);
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
