<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Вход в систему</h1>

      <!-- Форма входа -->
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Имя пользователя:</label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            placeholder="Введите имя пользователя"
            maxlength="30"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Пароль:</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            placeholder="Введите пароль"
            maxlength="50"
            required
          />
        </div>

        <!-- Сообщение об ошибке -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <!-- Кнопка входа -->
        <button type="submit" class="btn btn-login" :disabled="loading">
          {{ loading ? "Загрузка..." : "Вход" }}
        </button>
      </form>

      <!-- Ссылка на регистрацию -->
      <p class="register-link">
        Нет аккаунта?
        <RouterLink to="/register">Зарегистрируйтесь здесь</RouterLink>
      </p>
    </div>
  </div>

</template>

<script src="./scripts/LoginView.js"></script>

<style lang="less" src="../assets/less1/views/LoginView.less"></style>
