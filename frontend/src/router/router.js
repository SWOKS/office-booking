import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RoomsView from "../views/RoomsView.vue";
import AdminView from "../views/AdminView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import RoomView from "../views/RoomView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: false },
  },
  {
    path: "/rooms",
    name: "rooms",
    component: RoomsView,
    meta: { requiresAuth: false },
  },
  {
    path: '/rooms/:id',
    name: 'room',
    component: RoomView,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: { requiresAuth: false },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // Сбрасывает позицию скролла при навигации
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

// Навигационный guard проверяет доступ к маршрутам
router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  // Проверяет требование авторизации
  if (to.meta.requiresAuth && !currentUser) {
    next("/login");
    return;
  }

  // Проверяет требование прав администратора
  if (to.meta.requiresAdmin && (!currentUser || currentUser.role !== "admin")) {
    next("/");
    return;
  }

  next();
});

export default router;
