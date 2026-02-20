/**
 * Vue CLI конфигурация
 * Поддержка LESS препроцессора и другие настройки
 */

const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,

  // Используем стандартную конфигурацию Vue CLI для LESS

  // Конфигурация девелопмент сервера
  devServer: {
    port: 8080,
    host: "localhost",
    https: false,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  },
  // Отключаем lintOnSave, чтобы проверка не блокировала компиляцию в процессе разработки
  lintOnSave: false,

  // Оптимизация продакшена
  productionSourceMap: false,

  // Конфигурация CSS
  css: {
    extract: {
      ignoreOrder: true,
    },
  },
});
