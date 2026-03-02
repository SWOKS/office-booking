require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// ==================== ПОДКЛЮЧЕНИЕ К БАЗЕ ДАННЫХ ====================
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Ошибка подключения к БД:', err.stack);
  } else {
    console.log('✅ Успешное подключение к PostgreSQL');
  }
  if (release) release();
});

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/public')));

// ==================== SWAGGER ДОКУМЕНТАЦИЯ ====================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================
const formatTime = (time) => {
  if (!time) return '';
  if (time.length === 5) return time;
  return time.split(':').slice(0, 2).join(':');
};

const formatDate = (date) => {
  if (!date) return '';
  if (date instanceof Date) return date.toISOString().split('T')[0];
  if (date.includes('T')) return date.split('T')[0];
  return date;
};

const formatBooking = (booking) => ({
  id: booking.id,
  roomId: booking.room_id,
  userId: booking.user_id,
  userName: booking.username,
  roomName: booking.room_name,
  date: formatDate(booking.date),
  startTime: formatTime(booking.start_time),
  endTime: formatTime(booking.end_time),
  status: booking.status,
  createdAt: booking.created_at
});

const formatRoom = (room) => ({
  id: room.id,
  name: room.name,
  description: room.description,
  capacity: room.capacity,
  price: parseFloat(room.price),
  images: Array.isArray(room.images) ? room.images : [],
  amenities: Array.isArray(room.amenities) ? room.amenities : [],
  available: room.available,
  createdAt: room.created_at
});

// ==================== МАРШРУТЫ ДЛЯ КОМНАТ ====================

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Получить все доступные комнаты
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Список комнат
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */
app.get('/api/rooms', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rooms WHERE available = true ORDER BY id');
    res.json(result.rows.map(formatRoom));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении комнат' });
  }
});

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Получить комнату по ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Информация о комнате
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Комната не найдена
 */
app.get('/api/rooms/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rooms WHERE id = $1', [parseInt(req.params.id)]);
    if (result.rows.length > 0) {
      res.json(formatRoom(result.rows[0]));
    } else {
      res.status(404).json({ error: 'Комната не найдена' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении комнаты' });
  }
});

// ==================== МАРШРУТЫ ДЛЯ БРОНИРОВАНИЙ ====================

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Получить все бронирования
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Список бронирований
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */
app.get('/api/bookings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings ORDER BY id DESC');
    res.json(result.rows.map(formatBooking));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении бронирований' });
  }
});

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Создать новое бронирование
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBookingRequest'
 *     responses:
 *       201:
 *         description: Бронирование создано
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Ошибка валидации
 *       409:
 *         description: Время уже занято
 */
app.post('/api/bookings', async (req, res) => {
  try {
    const { roomId, userId, userName, roomName, date, startTime, endTime } = req.body;

    if (!roomId || !userId || !userName || !roomName || !date || !startTime || !endTime) {
      return res.status(400).json({ error: 'Не все необходимые поля заполнены' });
    }

    const toMinutes = (t) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };

    if (toMinutes(endTime) <= toMinutes(startTime)) {
      return res.status(400).json({ error: 'Неверный интервал времени' });
    }

    const conflictCheck = await pool.query(
      `SELECT * FROM bookings 
       WHERE room_id = $1 AND date = $2 AND status = 'confirmed'
       AND NOT (end_time <= $3::time OR start_time >= $4::time)`,
      [roomId, date, startTime, endTime]
    );

    if (conflictCheck.rows.length > 0) {
      return res.status(409).json({ error: 'Это время уже занято' });
    }

    const result = await pool.query(
      `INSERT INTO bookings (room_id, user_id, username, room_name, date, start_time, end_time, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'confirmed', NOW()) RETURNING *`,
      [roomId, userId, userName, roomName, date, startTime, endTime]
    );

    res.status(201).json(formatBooking(result.rows[0]));
  } catch (error) {
    console.error(error);
    if (error.code === '23P01') {
      return res.status(409).json({ error: 'Конфликт бронирований' });
    }
    res.status(500).json({ error: 'Ошибка при создании бронирования' });
  }
});

/**
 * @swagger
 * /api/bookings/user/{userId}:
 *   get:
 *     summary: Получить бронирования пользователя
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Список бронирований пользователя
 */
app.get('/api/bookings/user/:userId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM bookings WHERE user_id = $1 ORDER BY id DESC',
      [parseInt(req.params.userId)]
    );
    res.json(result.rows.map(formatBooking));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении бронирований' });
  }
});

// ==================== МАРШРУТЫ ДЛЯ АУТЕНТИФИКАЦИИ ====================

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Вход пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Успешный вход
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Неверные данные
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Не все поля заполнены' });
    }

    const result = await pool.query(
      'SELECT * FROM users WHERE TRIM(username) = TRIM($1) AND TRIM(password) = TRIM($2)',
      [username, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при входе' });
  }
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Пользователь создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       409:
 *         description: Пользователь существует
 */
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, email, name } = req.body;
    if (!username || !password || !email || !name) {
      return res.status(400).json({ error: 'Не все поля заполнены' });
    }

    const existing = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Пользователь уже существует' });
    }

    const result = await pool.query(
      `INSERT INTO users (username, password, email, name, role)
       VALUES ($1, $2, $3, $4, 'user') RETURNING id, username, email, name, role, created_at`,
      [username, password, email, name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при регистрации' });
  }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Получить всех пользователей
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email, name, role, created_at FROM users ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении пользователей' });
  }
});

/**
 * @swagger
 * /api/auth/user/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Информация о пользователе
 */
app.get('/api/auth/user/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, name, role, created_at FROM users WHERE id = $1',
      [parseInt(req.params.id)]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении пользователя' });
  }
});

// ==================== ЗАПУСК СЕРВЕРА ====================
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
  console.log(`📚 Swagger документация: http://localhost:${PORT}/api-docs`);
  console.log(`💾 База данных: ${process.env.DB_NAME}`);
});