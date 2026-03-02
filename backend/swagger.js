const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '🏢 Office Booking API',
      version: '1.0.0',
      description: `
# API системы бронирования переговорных комнат

## Возможности:
- 🔐 Аутентификация и регистрация пользователей
- 📅 Бронирование комнат по времени
- 👥 Админ-панель для управления
- 🏠 Просмотр доступных комнат

## Технологии:
- Backend: Node.js + Express
- Database: PostgreSQL
- Documentation: Swagger/OpenAPI 3.0
      `,
      contact: {
        name: 'Владимир Проничев',
        email: 'vladproni4ev@yandex.ru'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Локальный сервер разработки'
      }
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            username: { type: 'string', example: 'admin' },
            email: { type: 'string', example: 'admin@office.com' },
            name: { type: 'string', example: 'Администратор' },
            role: { type: 'string', example: 'admin', enum: ['admin', 'user'] },
            created_at: { type: 'string', format: 'date-time' }
          }
        },
        Room: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Комната 1' },
            description: { type: 'string', example: 'Уютная переговорная для рабочих встреч' },
            capacity: { type: 'integer', example: 4 },
            price: { type: 'number', example: 500 },
            images: { 
              type: 'array', 
              items: { type: 'string' },
              example: ['/images/rooms/room-a-1.png', '/images/rooms/room-a-2.png']
            },
            amenities: { 
              type: 'array', 
              items: { type: 'string' },
              example: ['Wi-Fi', 'Стол', 'Проектор']
            },
            available: { type: 'boolean', example: true }
          }
        },
        Booking: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            roomId: { type: 'integer', example: 1 },
            userId: { type: 'integer', example: 2 },
            userName: { type: 'string', example: 'Пользователь' },
            roomName: { type: 'string', example: 'Переговорная А' },
            date: { type: 'string', format: 'date', example: '2026-01-25' },
            startTime: { type: 'string', example: '10:00' },
            endTime: { type: 'string', example: '11:00' },
            status: { type: 'string', example: 'confirmed', enum: ['confirmed', 'cancelled', 'pending'] },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Ошибка' }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string', example: 'admin' },
            password: { type: 'string', example: 'admin123' }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['username', 'password', 'email', 'name'],
          properties: {
            username: { type: 'string', example: 'newuser' },
            password: { type: 'string', example: 'password123' },
            email: { type: 'string', example: 'user@example.com' },
            name: { type: 'string', example: 'Имя пользователя' }
          }
        },
        CreateBookingRequest: {
          type: 'object',
          required: ['roomId', 'userId', 'userName', 'roomName', 'date', 'startTime', 'endTime'],
          properties: {
            roomId: { type: 'integer', example: 1 },
            userId: { type: 'integer', example: 2 },
            userName: { type: 'string', example: 'Пользователь' },
            roomName: { type: 'string', example: 'Переговорная А' },
            date: { type: 'string', format: 'date', example: '2026-01-25' },
            startTime: { type: 'string', example: '10:00' },
            endTime: { type: 'string', example: '11:00' }
          }
        }
      }
    }
  },
  apis: ['./server.js']
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;