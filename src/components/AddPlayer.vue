<template>
  <!-- Formular zum Hinzufügen, Bearbeiten und Löschen von Spielern -->
  <div class="form">
    <!-- Eingabefeld zum Hinzufügen neuer Spieler -->
    <input
      v-model.trim="newUserName"
      @keyup.enter="addNewUser"
      placeholder="Geben Sie den Spielernamen ein"
    /><br />
    <!-- Schaltfläche zum Hinzufügen neuer Spieler -->
    <button @click="addNewUser">Spieler hinzufügen</button>

    <!-- Liste der vorhandenen Spieler -->
    <ul>
      <li v-for="user in data" :key="user.id">
        <!-- Bearbeitbare Eingabefelder für den Spielernamen -->
        <span v-if="user.editable">
          <input
            type="text"
            v-model="user.name"
            @keyup.enter="confirmEdit(user.id)"
          />
        </span>
        <!-- Anzeige des Spielernamens mit Schaltfläche zum Bearbeiten -->
        <span v-else @click="toggleEdit(user.id)">{{ user.name }}</span>
        <!-- Checkbox zur Auswahl des Spielers -->
        <input
          type="checkbox"
          v-model="user.selected"
          @change="toggleActive(user)"
        />
      </li>
    </ul>
    <div class="buttons">
      <button class="button-ganz-hell" @click="removeSelectedUsers">
        Löschen
      </button>
      <!-- Schaltfläche zum Bestätigen der Spieler -->
      <button to="/scores" class="button-hell" @click="confirmPlayers"
        >Hinzufügen</button>
    </div>
  </div>
</template>

<script>
import { API_URL } from "../main.js";

export default {
  data() {
    return {
      data: [], // Liste der Spieler
      newUserName: "", // Neuer Spielername
    };
  },
  async created() {
    // Daten abrufen, wenn das Komponente erstellt wird
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const selectedCourse = localStorage.getItem("selectedCourse");
        const selectedMap = localStorage.getItem("selectedMap");

        // Kursdaten basierend auf der ausgewählten Karte abrufen
        const response = await fetch(`${API_URL}/tracks`);
        const trackData = await response.json();

        if (Array.isArray(trackData) && trackData.length > 0) {
          const selectedMapData = trackData.find(
            (map) => map.id === selectedMap
          );

          if (selectedMapData) {
            const courseData = selectedMapData.courses[selectedCourse];

            if (courseData) {
              // Spielerdaten abrufen
              const usersResponse = await fetch(`${API_URL}/users`);
              const usersData = await usersResponse.json();

              // Spielerdaten initialisieren
              this.data = usersData.map((user) => ({
                id: user.id,
                name: user.name,
                editable: false,
                active: user.active,
                selected: user.active,
                [selectedCourse]: Array(courseData.length).fill(0),
              }));
            } else {
              console.error(
                "Fehler: Kursdaten nicht gefunden für den ausgewählten Kurs:",
                selectedCourse
              );
            }
          } else {
            console.error(
              "Fehler: Kartendaten nicht gefunden für die ausgewählte Karte:",
              selectedMap
            );
          }
        } else {
          console.error(
            "Fehler: Ungültiges Format der Streckendaten:",
            trackData
          );
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    },

    // Neuen Benutzer hinzufügen
    async addNewUser() {
      if (this.newUserName.trim() !== "") {
        try {
          const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: this.newUserName.trim(),
              active: false,
            }),
          });

          if (response.ok) {
            console.log("Spieler erfolgreich hinzugefügt");
            this.fetchData();
            this.newUserName = "";
          } else {
            console.error(
              "Fehler beim Hinzufügen des Spielers:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Fehler beim Hinzufügen des Spielers:", error);
        }
      }
    },

    // Bearbeitungsmodus für Spieler umschalten
    async toggleEdit(userId) {
      const user = this.data.find((u) => u.id === userId);
      if (user) {
        user.editable = !user.editable;
      }
    },

    // Bestätigen der Bearbeitung des Spielerbenutzernamens
    async confirmEdit(userId) {
      const user = this.data.find((u) => u.id === userId);
      if (user) {
        user.editable = false;
        try {
          // Benutzerdaten einschließlich Punktzahlen für alle Kurse abrufen
          const response = await fetch(`${API_URL}/users/${userId}`);
          const userData = await response.json();

          if (response.ok) {
            // Benutzernamen aktualisieren
            userData.name = user.name;

            // Anfrage zum Aktualisieren der Benutzerdaten senden
            const updateResponse = await fetch(`${API_URL}/users/${userId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });

            if (!updateResponse.ok) {
              console.error(
                "Fehler beim Aktualisieren des Spielers:",
                updateResponse.statusText
              );
            }
          } else {
            console.error(
              "Fehler beim Abrufen der Benutzerdaten:",
              userData.statusText
            );
          }
        } catch (error) {
          console.error("Fehler beim Aktualisieren des Spielers:", error);
        }
      }
    },
    // Ausgewählte Spieler entfernen
    async removeSelectedUsers() {
      const selectedUsers = this.data.filter((user) => user.selected);
      for (const user of selectedUsers) {
        try {
          const response = await fetch(`${API_URL}/users/${user.id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            console.log("Spieler erfolgreich entfernt:", user.name);
            const index = this.data.findIndex((u) => u.id === user.id);
            if (index !== -1) {
              this.data.splice(index, 1);
            }
          } else {
            console.error(
              "Fehler beim Entfernen des Spielers:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Fehler beim Entfernen des Spielers:", error);
        }
      }
    },

    async confirmPlayers() {
      const selectedCourse = localStorage.getItem("selectedCourse");

      for (const user of this.data) {
        try {
          // Aktivitätsstatus des Benutzers basierend auf seiner Auswahl aktualisieren
          user.active = user.selected;

          // Existierende Benutzerdaten inklusive Punktzahlen für alle Kurse abrufen
          const response = await fetch(`${API_URL}/users/${user.id}`);
          const userData = await response.json();

          if (response.ok) {
            // Punktzahlen für den ausgewählten Kurs aktualisieren
            userData[selectedCourse] = user[selectedCourse] || [];

            // Aktivitätsstatus in den Benutzerdaten aktualisieren
            userData.active = user.active;

            // Anfrage zum Aktualisieren der Benutzerdaten senden
            const updateResponse = await fetch(`${API_URL}/users/${user.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });

            if (updateResponse.ok) {
              console.log("Spieler aktualisiert:", user.name);
            } else {
              console.error(
                "Fehler beim Aktualisieren des Spielers:",
                user.name
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
            user.name,
            error
          );
        }
      }

      // Nachdem alle Spieler aktualisiert wurden, zu /scores navigieren
      this.$router.push("/scores");
    },

    // Spielerauswahl umschalten
    toggleSelected(user) {
      console.log("Auswahl für umschalten:", user.name);
      user.selected = !user.selected;
      console.log("Status der Spielerwahl:", user.selected);
    },

    // Aktivitätsstatus des Spielers umschalten
    toggleActive(user) {
      user.active = user.selected;
    },
  },
};
</script>

<style scoped>
.form input {
  height: 40px;
  border-radius: 15px;
  background-color: #d4eae3;
  width: 70%;
  text-align: center;
}
.form button {
  text-decoration: none;
  padding: 9px 12px;
  box-shadow: 0 1px 2px var(--dunkelgruen);
  margin-top: 20px;
  background-color: #afdacc;
  border: 1px groove var(--dunkelgruen);
  box-shadow: 0 1px 2px var(--dunkelgruen);
  border-radius: 10px;
  color: var(--dunkelgruen);
}
.buttons {
  position: absolute;
  top: 600px;
  margin: auto;
  left: 65px;
}
.button-hell {
  text-decoration: none;
  padding: 12px;
  box-shadow: 0 1px 2px var(--dunkelgruen);
  width: 150px;
}
.button-ganz-hell {
  text-decoration: none;
  padding: 12px;
  box-shadow: 0 1px 2px var(--dunkelgruen);
  margin-right: 20px;
  width: 120px;
}
</style>
