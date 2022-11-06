import { createApp } from "vue";
import router from "./router";
// import RegisterForm from "./views/RegisterForm.vue";
import App from "../src/App.vue";
const app = createApp(App);
app.use(router);
app.mount("#app");
