import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Global css
import "./assets/global.css";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
