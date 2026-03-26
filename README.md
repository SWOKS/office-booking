# 🏢 OfficeBook

Веб-приложение для бронирования переговорных комнат в офисе.

## Возможности

Пользователь:
- Регистрация и вход
- Просмотр доступных комнат
- Бронирование по дате и времени
- Просмотр своих бронирований

Администратор:
- Просмотр всех пользователей
- Контроль всех бронирований

## Технологии

Frontend:
- Vue 3
- Vue Router
- LESS

Backend:
- Node.js
- Express
- PostgreSQL
- Swagger (API документация)

## Структура проекта

office-booking/
├── frontend/   # Vue приложение
├── backend/    # Node.js сервер
└── README.md

## Запуск проекта

1. Клонировать репозиторий:

git clone <repo-url>
cd office-booking

2. Запустить backend:

cd backend
npm install
npm run dev

Сервер: http://localhost:3000  
Swagger: http://localhost:3000/api-docs  

3. Запустить frontend:

cd frontend
npm install
npm run dev

Frontend: http://localhost:8080  

## Настройка базы данных

Создать файл .env в папке backend:

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=office_booking
PORT=3000

## Сборка

Frontend:
npm run build

Backend:
node server.js

## Лицензия

MIT