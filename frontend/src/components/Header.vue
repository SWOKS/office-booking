<template>
  <header class="header">
    <div class="header-container">
      <div>
        <RouterLink to="/" class="logo">🏢 OfficeBook</RouterLink>
      </div>

      <nav class="nav-menu">
        <RouterLink
          to="/"
          class="nav-link"
          :class="{ active: $route.path === '/' }"
          >Главная</RouterLink
        >
        <RouterLink
          to="/rooms"
          class="nav-link"
          :class="{ active: $route.path === '/rooms' }"
          >Комнаты</RouterLink
        >
        <a href="#" @click.prevent="scrollToContacts" class="nav-link"
          >Контакты</a
        >
      </nav>

      <div class="auth-section" v-if="store.currentUser">
        <div class="user-info">
          <span class="user-name" :title="store.currentUser.username">{{ store.currentUser.username }}</span>
          <span
            class="user-role"
            :class="{ admin: store.currentUser.role === 'admin' }"
          >
            {{
              store.currentUser.role === "admin"
                ? "Администратор"
                : "Пользователь"
            }}
          </span>
        </div>
        <RouterLink
          v-if="store.currentUser.role === 'admin'"
          to="/admin"
          class="btn btn-secondary"
          >Админ-панель</RouterLink
        >
        <button @click="handleLogout" class="btn btn-danger">
          Выйти
        </button>
      </div>

      <div class="auth-section" v-else>
        <RouterLink to="/login" class="btn btn-outline">Вход</RouterLink>
        <RouterLink to="/register" class="btn btn-outline">Регистрация</RouterLink>
      </div>
    </div>
  </header>
</template>

<script src="./scripts/Header.js"></script>

<style lang="less" src="../assets/less1/components/Header.less"></style>

