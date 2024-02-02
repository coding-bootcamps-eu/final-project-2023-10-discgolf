import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Globale Konstante für die URL der API
// Kann später durch die URL des Servers ersetzt werden
export const API_URL = "http://localhost:3000";

createApp(App).use(router).mount("#app");
