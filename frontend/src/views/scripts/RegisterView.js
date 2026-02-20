// Обрабатывает форму регистрации и отправляет запрос на сервер
import { RouterLink } from "vue-router";

export default {
  name: "RegisterView",
  components: { RouterLink },
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      error: "",
      success: "",
      loading: false,
    };
  },
  methods: {
    async register() {
      this.error = "";
      this.success = "";
      if (this.form.password !== this.form.confirmPassword) {
        this.error = "Пароли не совпадают";
        return;
      }
      if (this.form.password.length < 6) {
        this.error = "Пароль должен содержать минимум 6 символов";
        return;
      }
      this.loading = true;
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                  name: this.form.username,
                  username: this.form.username,
                  email: this.form.email,
                  password: this.form.password,
                }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          this.success = "Регистрация успешна! Переходим на страницу входа...";
          this.form = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          };
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        } else {
          this.error = data.error || "Ошибка регистрации";
        }
      } catch (error) {
        console.error("Ошибка при регистрации:", error);
        this.error = "Ошибка при подключении к серверу";
      } finally {
        this.loading = false;
      }
    },
  },
};
