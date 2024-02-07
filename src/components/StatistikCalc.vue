<template>
  <div>
    <div v-for="user in activeUsers" :key="user.id">
      <p>{{ user.name }}</p>
      <p>{{ user[selectedCourse].index }}</p>
      <!-- <p>{{ user.active }}</p>  -->
      <!-- <p>{{ activeUsers }}</p> -->
      <div v-for="(holes, index) in user[selectedCourse]" :key="holes">
        <p>{{ index + 1 }}</p>
      </div>
      <!-- <p>{{ user.blue }}</p> -->
      <p>{{ user[selectedCourse].toString() }}</p>
      <p>{{ selectedCourse }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeUsers: [],
      selectedCourse: "",
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
        });
    },
  },
};
</script>
