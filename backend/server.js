const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Пути к JSON файлам данных
const roomsPath = path.join(__dirname, 'data', 'rooms.json');
const bookingsPath = path.join(__dirname, 'data', 'bookings.json');
const usersPath = path.join(__dirname, 'data', 'users.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Вспомогательные функции для работы с файлами
const readFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Ошибка при чтении файла ${filePath}:`, error);
    return [];
  }
};

const writeFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Ошибка при записи в файл ${filePath}:`, error);
    return false;
  }
};

// ==================== МАРШРУТЫ ДЛЯ КОМНАТ ====================

// Получить все комнаты
app.get('/api/rooms', (req, res) => {
  try {
    const rooms = readFile(roomsPath);
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении комнат' });
  }
});

// Получить информацию о конкретной комнате
app.get('/api/rooms/:id', (req, res) => {
  try {
    const rooms = readFile(roomsPath);
    const room = rooms.find(r => r.id === parseInt(req.params.id));
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ error: 'Комната не найдена' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении комнаты' });
  }
});

// ==================== МАРШРУТЫ ДЛЯ БРОНИРОВАНИЙ ====================

// Получить все бронирования
app.get('/api/bookings', (req, res) => {
  try {
    const bookings = readFile(bookingsPath);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении бронирований' });
  }
});

// Создать новое бронирование
app.post('/api/bookings', (req, res) => {
  try {
    const { roomId, userId, userName, roomName, date, startTime, endTime } = req.body;

    // Валидация входных данных
    if (!roomId || !userId || !userName || !roomName || !date || !startTime || !endTime) {
      return res.status(400).json({ error: 'Не все необходимые поля заполнены' });
    }

    const bookings = readFile(bookingsPath);

    // Вспомогательная функция: "HH:MM" -> минуты с начала дня
    const toMinutes = (t) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };

    const newStart = toMinutes(startTime);
    const newEnd = toMinutes(endTime);

    if (newEnd <= newStart) {
      return res.status(400).json({ error: 'Неверный интервал времени' });
    }

    // Проверка конфликта времени: используем полуоткрытые интервалы [start, end)
    const conflict = bookings.some(booking => {
      if (booking.roomId !== roomId) return false;
      if (booking.date !== date) return false;
      if (booking.status !== 'confirmed') return false;
      const existingStart = toMinutes(booking.startTime);
      const existingEnd = toMinutes(booking.endTime);
      // Пересечение есть, если newStart < existingEnd && newEnd > existingStart
      return newStart < existingEnd && newEnd > existingStart;
    });

    if (conflict) {
      return res.status(409).json({ error: 'Это время уже занято' });
    }

    // Создание нового бронирования
    const newBooking = {
      id: bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1,
      roomId,
      userId,
      userName,
      roomName,
      date,
      startTime,
      endTime,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    
    if (writeFile(bookingsPath, bookings)) {
      res.status(201).json(newBooking);
    } else {
      res.status(500).json({ error: 'Ошибка при сохранении бронирования' });
    }
  } catch (error) {
    console.error('Ошибка при создании бронирования:', error);
    res.status(500).json({ error: 'Ошибка при создании бронирования' });
  }
});

// Получить бронирования пользователя
app.get('/api/bookings/user/:userId', (req, res) => {
  try {
    const bookings = readFile(bookingsPath);
    const userBookings = bookings.filter(b => b.userId === parseInt(req.params.userId));
    res.json(userBookings);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении бронирований пользователя' });
  }
});

// ==================== МАРШРУТЫ ДЛЯ АУТЕНТИФИКАЦИИ ====================

// Получить всех пользователей (для админки)
app.get('/api/users', (req, res) => {
  try {
    const users = readFile(usersPath);
    // Не отправляем пароли
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);
    res.json(usersWithoutPasswords);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении пользователей' });
  }
});

// Регистрация пользователя
app.post('/api/auth/register', (req, res) => {
  try {
    const { username, password, email, name } = req.body;

    // Валидация
    if (!username || !password || !email || !name) {
      return res.status(400).json({ error: 'Не все поля заполнены' });
    }

    const users = readFile(usersPath);

    // Проверка существования пользователя
    if (users.some(u => u.username === username || u.email === email)) {
      return res.status(409).json({ error: 'Пользователь с таким именем или email уже существует' });
    }

    // Создание нового пользователя
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      username,
      password, // В реальном приложении нужно хешировать пароль!
      email,
      name,
      role: 'user'
    };

    users.push(newUser);

    if (writeFile(usersPath, users)) {
      const { password, ...userWithoutPassword } = newUser;
      res.status(201).json(userWithoutPassword);
    } else {
      res.status(500).json({ error: 'Ошибка при сохранении пользователя' });
    }
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    res.status(500).json({ error: 'Ошибка при регистрации' });
  }
});

// Вход пользователя
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Не все поля заполнены' });
    }

    const users = readFile(usersPath);
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
    }
  } catch (error) {
    console.error('Ошибка при входе:', error);
    res.status(500).json({ error: 'Ошибка при входе' });
  }
});

// Получить информацию о пользователе по ID
app.get('/api/auth/user/:id', (req, res) => {
  try {
    const users = readFile(usersPath);
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении информации о пользователе' });
  }
});

// ==================== ЗАПУСК СЕРВЕРА ====================

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
  console.log(`📝 API доступен по адресу http://localhost:${PORT}/api`);
});