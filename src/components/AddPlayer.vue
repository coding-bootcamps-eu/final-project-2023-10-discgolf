<template>
  <!-- Formular zum Hinzufügen, Bearbeiten und Löschen von Spielern -->
  <div>
    <!-- Eingabefeld zum Hinzufügen neuer Spieler -->
    <input
      v-model.trim="newUserName"
      @keyup.enter="addNewUser"
      placeholder="Geben Sie den Spielernamen ein"
    />
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

    <button class="button-ganz-hell" @click="removeSelectedUsers">Löschen</button>
    <!-- Schaltfläche zum Bestätigen der Spieler -->
    <button class="button-hell" @click="confirmPlayers">Hinzufügen</button>

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
