import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { RouterView } from "vue-router";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    RouterView,
  },
  methods: {
    handleLogout() {
      // Удаляет данные текущего пользователя из localStorage
      localStorage.removeItem("currentUser");
      // Перенаправляет на главную страницу
      this.$router.push("/");
    },
  },
};
