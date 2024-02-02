<template>
  <div>
    <div v-for="(player, playerIndex) in players" :key="playerIndex">
      <h2>{{ player.name }}'s Scores:</h2>
      <div v-if="player.redCourses.length > 0">
        <ul>
          <li v-for="(course, index) in player.redCourses" :key="index">
            {{ course.title }} - Par {{ course.par }}
            <input
              type="number"
              v-model="player.throws[index]"
              min="0"
              @input="updateScore(player)"
            />
          </li>
        </ul>
        <p>Total</p>
        <p>Par: {{ player.totalPar }}</p>
        <p>Score: {{ player.totalScore }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      players: [
        {
          name: "Hans Peter",
          redCourses: [],
          throws: [],
          totalPar: 0,
          totalScore: 0,
        },
        // Todo: implement Player from ## Playerpage ## here
        // Todo: automatically implement chosen Course from ## Course Page ##
      ],
    };
  },
  mounted() {
    this.players.forEach((player, playerIndex) => {
      const savedThrows = JSON.parse(
        localStorage.getItem(`player${playerIndex}Throws`)
      );
      if (savedThrows) {
        player.throws = savedThrows;
      }

      fetch("http://localhost:3000/tracks")
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched data:", data);
          player.redCourses = data[0].courses.red;
          console.log(`${player.name}'s Red courses:`, player.redCourses);
          if (!savedThrows) {
            player.throws = new Array(player.redCourses.length).fill(0);
          }
          // Test
          this.calculateTotalPar(player);
          this.calculateTotalScore(player);
        });
    });
  },
  methods: {
    calculateTotalPar(player) {
      const throwsAsNumbers = player.throws.map((value) => parseInt(value, 10));
      player.totalPar = throwsAsNumbers.reduce((total, currentThrow, index) => {
        return total + currentThrow - player.redCourses[index].par;
      }, 0);
    },
    calculateTotalScore(player) {
      const throwsAsNumbers = player.throws.map((value) => parseInt(value, 10));
      player.totalScore = throwsAsNumbers.reduce((total, currentThrow) => {
        return total + currentThrow;
      }, 0);
    },
    updateScore(player) {
      this.calculateTotalPar(player);
      this.calculateTotalScore(player);

      // localStorage ( Save Throws )
      localStorage.setItem(
        `player${this.players.indexOf(player)}Throws`,
        JSON.stringify(player.throws)
      );
    },
  },
};
</script>
