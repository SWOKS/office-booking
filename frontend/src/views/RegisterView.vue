<template>
  <div class="register-container">
    <div class="register-box">
      <h1>Регистрация</h1>
      <p>Создайте новый аккаунт</p>

      <!-- Форма регистрации -->
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Имя пользователя:</label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            placeholder="Выберите имя пользователя (макс. 30 символов)"
            maxlength="30"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder="Введите email"
            maxlength="100"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Пароль:</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            placeholder="Придумайте пароль (минимум 6 символов)"
            maxlength="50"
            required
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Подтверждение пароля:</label>
          <input
            v-model="form.confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="Повторите пароль"
            required
          />
        </div>

        <!-- Сообщение об ошибке -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <!-- Сообщение об успехе -->
        <div v-if="success" class="success-message">
          {{ success }}
        </div>

        <!-- Кнопка регистрации -->
        <button type="submit" class="btn btn-register" :disabled="loading">
          {{ loading ? "Загрузка..." : "Зарегистрироваться" }}
        </button>
      </form>

      <!-- Ссылка на вход -->
      <p class="login-link">
        Уже есть аккаунт?
        <RouterLink to="/login">Войдите здесь</RouterLink>
      </p>
    </div>
  </div>

</template>

<script src="./scripts/RegisterView.js"></script>

<style lang="less" src="../assets/less1/views/RegisterView.less"></style>
