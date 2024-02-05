<template>
  <div>
    <h1>add Players</h1>
    <ul>
      <input
        v-model="newUser"
        @keyup.enter="keySubmit"
        placeholder="Enter name"
      />
      <li v-for="(user, index) in data" :key="user.id">
        Player {{ index + 1 }}: {{ user.name }}
        <span @click="removeUser(user.id)"> [X]</span>
      </li>
    </ul>
    <h3>Add User</h3>
    <button>Löschen</button>
    <button class="button-hell" @click="addUser" :disabled="btnDisabled">
      Hinzufügen
    </button>
  </div>
</template>

<script>
import { API_URL } from "../main.js";

export default {
  data() {
    return {
      data: [],
      newUser: "",
      btnDisabled: false,
      hoveredUserId: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(`${API_URL}/users`);
        const jsonData = await response.json();

        this.data = jsonData.map((user) => ({ id: user.id, name: user.name }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async addUser() {
      if (this.data.length <= 6) {
        try {
          const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.newUser,
            }),
          });

          if (response.ok) {
            console.log("User added successfully");
            this.fetchData();
          } else {
            console.error("Failed to add name:", response.statusText);
          }
        } catch (error) {
          console.error("Error adding name:", error);
        }
        this.newUser = "";
      } else {
        this.btnDisabled = true;
      }
    },
    keySubmit() {
      this.addUser();
      this.newUser = "";
    },
    async removeUser(userId) {
      this.data = this.data.filter((user) => user.id !== userId);
      try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log("User removed successfully.");
        } else {
          console.error("Failed to remove:", response.statusText);
        }
      } catch (error) {
        console.error("Error removing user:", error);
      }
      if (this.data.length <= 6) {
        this.btnDisabled = false;
      }
    },
  },
};
</script>
