<template>
  <div>
    <!-- <table>
      <thead>
        <tr>
          <th>Spieler</th>
          <th
            class="loecher"
            v-for="(loecher, index) in lochanzahl[selectedCourse]"
            :key="loecher"
          >
            {{ index + 1 }}
          </th>
          <th>Ges</th>
        </tr>
      </thead>

      <tr v-for="(user, index) in activeUsers" :key="user.id">
        <th>{{ user.name }}</th>
        <td v-for="loecher in user[selectedCourse]" :key="loecher">
          {{ loecher }}
        </td>
        <th>{{ summieren(index) }}</th>
      </tr>
    </table> -->
    <div class="hey">
      <div class="bahn">
        <h3>Bahn</h3>
        <div
          class="einzel-bahnen"
          v-for="(loecher, index) in lochanzahl[selectedCourse]"
          :key="loecher"
        >
          <p class="bold">{{ index + 1 }}</p>
        </div>
        <h4>Ges:</h4>
      </div>
      <div
        class="bahn-element"
        v-for="(user, index) in activeUsers"
        :key="user.id"
      >
        <h3>{{ user.name }}</h3>
        <p v-for="loecher in user[selectedCourse]" :key="loecher">
          {{ loecher }}
        </p>
        <h4 class="gesamt">{{ summieren(index) }}</h4>
      </div>
    </div>

    <!-- <div v-for="(loecher, index) in lochanzahl[selectedCourse]" :key="loecher">
      <p>{{ index + 1 }}</p>
    </div>
    <p>totalScore</p>
    <div v-for="user in activeUsers" :key="user.id">
      <p>{{ user.name }}</p>
      <p>{{ user[selectedCourse].index }}</p>
       <p>{{ user.active }}</p>  -->
    <!-- <p>{{ activeUsers }}</p> -->
    <!-- <div v-for="(holes, index) in user[selectedCourse]" :key="holes">
        <p>{{ index + 1 }}</p>
      </div> -->
    <!-- <p>{{ user.blue }}</p> -->
    <!-- <p>{{ user[selectedCourse].toString() }}</p>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeUsers: [],
      selectedCourse: "",
      lochanzahl: "",
    };
  },
  created() {
    this.selectedCourse = localStorage.getItem("selectedCourse");

    this.fetchActiveUsers();
  },
  methods: {
    fetchActiveUsers() {
      fetch("http://localhost:3000/users")
        .then((response) => response.json())
        .then((data) => {
          this.activeUsers = data.filter((user) => user.active);
          this.lochanzahl = data[0];
        });
    },
    summieren(index) {
      let summe = 0;
      const user = this.activeUsers[index][this.selectedCourse];
      for (let i = 0; i < user.length; i++) {
        summe += user[i];
      }
      return summe;
    },
  },
};
</script>
<style scoped>
.hey {
  display: flex;
  background-color: var(--dunkelgruen);
  width: 90%;
  margin-inline: auto;
  border-radius: 15px;
  color: var(--dunkelgruen);
  justify-content: center;
}
.bahn {
  margin: 0;
  padding: 0;
  justify-content: center;
  margin-left: 10px;
}
.bahn div {
  background-color: var(--hellgruen);
  border-radius: 6px;
}
.bahn-element p {
  margin: 0;
  padding: 0;
  margin-top: 5px;
  margin-left: 10px;
  min-width: 50px;
  background-color: var(--hellgruen);
  border-radius: 6px;
}
.einzel-bahnen p {
  margin: 0;
  padding: 0;
  margin-top: 5px;
}
.gesamt {
  margin: 0;
  margin-top: 23px;
  background-color: var(--hellgruen);
  margin-left: 10px;
  border-radius: 6px;
}

.bahn h3 {
  color: var(--hellgruen);
}
.bahn-element h3 {
  color: var(--hellgruen);
  justify-content: center;
  min-width: 60px;
  max-width: 60px;
  margin-left: 10px;
  overflow: hidden;
}
.bahn h4 {
  color: var(--hellgruen);
}
.bold {
  font-weight: 700;
}
</style>
