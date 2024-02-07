<template>
  <div>
    <table>
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
    </table>

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
table {
  border: 3px solid red;
  margin-inline: auto;
  border-collapse: collapse;
}
td,
th {
  border: 1px solid black;
}
thead {
  background-color: yellow;
}
.loecher {
  min-width: 18px;
  max-width: 18px;
}
</style>
