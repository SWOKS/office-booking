const API_BASE_URL = "http://localhost:3000/api";

// Работа с комнатами

export const roomsAPI = {
  // Запрос списка всех комнат
  async getAllRooms() {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error("Ошибка при загрузке комнат");
    } catch (error) {
      console.error("Ошибка при получении списка комнат:", error);
      throw error;
    }
  },

  // Запрос данных комнаты по ID
  async getRoomById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${id}`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error("Комната не найдена");
    } catch (error) {
      console.error("Ошибка при получении данных комнаты:", error);
      throw error;
    }
  },
};

// Работа с бронированиями

export const bookingsAPI = {
  // Запрос списка бронирований
  async getAllBookings() {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error("Ошибка при загрузке бронирований");
    } catch (error) {
      console.error("Ошибка при получении бронирований:", error);
      throw error;
    }
  },

  // Запрос бронирований конкретного пользователя
  async getUserBookings(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/user/${userId}`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error("Ошибка при загрузке бронирований пользователя");
    } catch (error) {
      console.error("Ошибка при получении бронирований пользователя:", error);
      throw error;
    }
  },

  // Создание нового бронирования
  async createBooking(bookingData) {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      }
      throw new Error(data.error || "Ошибка при создании бронирования");
    } catch (error) {
      console.error("Ошибка при создании бронирования:", error);
      throw error;
    }
  },
};

// Работа с аутентификацией

export const authAPI = {
  // Регистрация пользователя
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      }
      throw new Error(data.error || "Ошибка при регистрации");
    } catch (error) {
      console.error("Ошибка при регистрации пользователя:", error);
      throw error;
    }
  },

  // Авторизация пользователя
  async login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      }
      throw new Error(data.error || "Ошибка при входе");
    } catch (error) {
      console.error("Ошибка при входе пользователя:", error);
      throw error;
    }
  },

  // Получение информации о пользователе
  async getUserInfo(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/user/${userId}`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error("Пользователь не найден");
    } catch (error) {
      console.error("Ошибка при получении информации о пользователе:", error);
      throw error;
    }
  },

  // Получение списка пользователей (для админов)
  async getAllUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (response.ok) {
        return await response.json();
      }
      throw new Error("Ошибка при загрузке пользователей");
    } catch (error) {
      console.error("Ошибка при получении списка пользователей:", error);
      throw error;
    }
  },
};

// Работа с локальным хранилищем

export const storageAPI = {
  // Сохраняет текущего пользователя в localStorage
  setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  },

  // Возвращает текущего пользователя из localStorage
  getCurrentUser() {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  },

  // Удаляет текущего пользователя из localStorage
  clearCurrentUser() {
    localStorage.removeItem("currentUser");
  },

  // Проверяет, авторизован ли пользователь
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  },

  // Проверяет, является ли текущий пользователь администратором
  isAdmin() {
    const user = this.getCurrentUser();
    return user ? user.role === "admin" : false;
  },
};

export default {
  roomsAPI,
  bookingsAPI,
  authAPI,
  storageAPI,
};
