<!-- Корневой компонент приложения -->
<template>
  <div id="app" class="app-container">
    <!-- Хедер -->
    <Header @logout="handleLogout" />

    <!-- Основное содержимое для роутера -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- Футер -->
    <Footer />
  </div>
</template>

<script src="./scripts/App.js"></script>
