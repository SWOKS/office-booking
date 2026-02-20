// Обрабатывает форму входа и работу со стором
import { inject } from "vue";

export default {
  name: "LoginView",
  data() {
    return {
      form: { username: "", password: "" },
      error: "",
      loading: false,
    };
  },
  setup() {
    const store = inject("store");
    return { store };
  },
  methods: {
    async login() {
      this.error = "";
      this.loading = true;
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.form.username,
            password: this.form.password,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          this.store.login(data);
          alert(`Добро пожаловать, ${data.name}!`);
          this.$router.push("/");
        } else {
          this.error = data.error || "Ошибка входа";
        }
      } catch (error) {
        console.error("Ошибка при входе:", error);
        this.error = "Ошибка при подключении к серверу";
      } finally {
        this.loading = false;
      }
    },
  },
};
