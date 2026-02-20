// Точка входа приложения
import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router/router";
// Импорт глобальных стилей (LESS)
import "./assets/less1/main.less";
// Подключает jQuery в глобальную область
import $ from "jquery";
window.$ = window.jQuery = $;

// Глобальное реактивное состояние приложения
const store = reactive({
  currentUser: null,

  init() {
    const user = localStorage.getItem("currentUser");
    this.currentUser = user ? JSON.parse(user) : null;
  },

  login(user) {
    this.currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(user));
  },

  logout() {
    this.currentUser = null;
    localStorage.removeItem("currentUser");
  },
});

store.init();

const app = createApp(App);
app.use(router);
app.provide("store", store); // Доступно во всех компонентах
app.mount("#app");
