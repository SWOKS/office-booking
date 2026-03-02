BEGIN;

-- ============================================
-- 1. ВСТАВКА ПОЛЬЗОВАТЕЛЕЙ (10 штук)
-- ============================================
INSERT INTO users (id, username, password, email, name, role) VALUES
(1, 'admin', 'admin123', 'admin@office.com', 'Администратор', 'admin'),
(2, 'user1', 'user123', 'user1@office.com', 'Пользователь', 'user'),
(3, 'user', '111111', 'vladimirpronicev56@gmail.com', 'Вова', 'user'),
(4, 'swoks', '123456', 'vladproni4ev@yandex.ru', 'Проничев Владимир Андреевич', 'user'),
(5, 'цццццццццццццццццццццццццццццц', 'кнопку отмена тоже сделай красной', 'wdwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww@ds', 'цццццццццццццццццццццццццццццц', 'user'),
(6, 'wwwwww', '111111', 'KondratevaTV@mail.ru', 'wwwwww', 'user'),
(7, 'ххх', 'Vvr-BsT-PHH-5j9', 'vladproni5ev@yandex.ru', 'ххх', 'user'),
(8, 'dima', '111111', 'dima@mail.ru', 'dima', 'user'),
(9, 'vova', '111111', 'vova@mail.ru', 'vova', 'user'),
(10, 'user111', '111111', 'user111@gmail.com', 'user111', 'user');

-- Сброс счетчика ID для users
SELECT setval('users_id_seq', 10);


-- ============================================
-- 2. ВСТАВКА КОМНАТ (30 штук)
-- ============================================
INSERT INTO rooms (id, name, description, capacity, price, images, amenities, available) VALUES
(1, 'Комната 1', 'Уютная переговорная для рабочих встреч и небольших презентаций', 4, 500, 
 ARRAY['/images/rooms/room-a-1.png', '/images/rooms/room-a-2.png', '/images/rooms/room-a-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Проектор', 'Доска', 'Кофе-машина'], true),

(2, 'Комната 2', 'Просторная комната с экраном для презентаций и совещаний', 8, 1200,
 ARRAY['/images/rooms/room-b-1.png', '/images/rooms/room-b-2.png', '/images/rooms/room-b-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Большой экран', 'Видеоконференция', 'Доска'], true),

(3, 'Комната 3', 'Элегантный кабинет для руководящих встреч', 6, 800,
 ARRAY['/images/rooms/room-c-1.png', '/images/rooms/room-c-2.png', '/images/rooms/room-c-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Проектор', 'Мини-холодильник', 'Доска'], true),

(4, 'Комната 4', 'Компактная переговорная для индивидуальных встреч и звонков', 2, 300,
 ARRAY['/images/rooms/room-d-1.png', '/images/rooms/room-d-2.png', '/images/rooms/room-d-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Монитор', 'Удобные кресла'], true),

(5, 'Комната 5', 'Современная конференц-зала для больших презентаций', 10, 1500,
 ARRAY['/images/rooms/room-e-1.png', '/images/rooms/room-e-2.png', '/images/rooms/room-e-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', '4K проектор', 'Видеоконференция', 'Звук', 'Белая доска'], true),

(6, 'Комната 6', 'Бюджетная комната для рабочих встреч', 3, 400,
 ARRAY['/images/rooms/room-f-1.png', '/images/rooms/room-f-2.png', '/images/rooms/room-f-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Проектор'], true),

(7, 'Комната 7', 'Удобная небольшая комната для интервью и звонков', 2, 350,
 ARRAY['/images/rooms/room-a-1.png', '/images/rooms/room-a-2.png', '/images/rooms/room-a-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Монитор', 'Кондиционер'], true),

(8, 'Комната 8', 'Яркая переговорная с естественным светом', 5, 700,
 ARRAY['/images/rooms/room-b-1.png', '/images/rooms/room-b-2.png', '/images/rooms/room-b-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Телевизор', 'Чайник'], true),

(9, 'Комната 9', 'Тихая комната для фокусной работы', 1, 250,
 ARRAY['/images/rooms/room-c-1.png', '/images/rooms/room-c-2.png', '/images/rooms/room-c-3.png'],
 ARRAY['Wi-Fi', 'Стул', 'Стол', 'Удобные кресла'], true),

(10, 'Комната 10', 'Креативное пространство для мозгового штурма', 6, 850,
 ARRAY['/images/rooms/room-d-1.png', '/images/rooms/room-d-2.png', '/images/rooms/room-d-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Доска', 'Кофе-машина'], true),

(11, 'Комната 11', 'Современный хаб для небольших команд', 8, 1100,
 ARRAY['/images/rooms/room-e-1.png', '/images/rooms/room-e-2.png', '/images/rooms/room-e-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Проектор', 'Звук'], true),

(12, 'Комната 12', 'Мини-офис для конфиденциальных встреч', 3, 450,
 ARRAY['/images/rooms/room-f-1.png', '/images/rooms/room-f-2.png', '/images/rooms/room-f-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Мини-холодильник'], true),

(13, 'Комната 13', 'Просторная переговорная с возможностью видеозвонков', 12, 1600,
 ARRAY['/images/rooms/room-a-1.png', '/images/rooms/room-b-2.png', '/images/rooms/room-c-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Видеоконференция', 'Большой экран', 'Звук'], true),

(14, 'Комната 14', 'Уютный кабинет с мягкими креслами', 4, 600,
 ARRAY['/images/rooms/room-d-1.png', '/images/rooms/room-e-2.png', '/images/rooms/room-f-3.png'],
 ARRAY['Wi-Fi', 'Удобные кресла', 'Кофе-машина', 'Чайник'], true),

(15, 'Комната 15', 'Переговорная с большим столом для командной работы', 10, 1400,
 ARRAY['/images/rooms/room-a-2.png', '/images/rooms/room-b-1.png', '/images/rooms/room-c-1.png'],
 ARRAY['Wi-Fi', 'Большой экран', 'Стол', 'Стулья', 'Доска'], true),

(16, 'Комната 16', 'Небольшая переговорная в тихом уголке офиса', 3, 420,
 ARRAY['/images/rooms/room-b-3.png', '/images/rooms/room-c-2.png', '/images/rooms/room-d-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Монитор'], true),

(17, 'Комната 17', 'Комната для презентаций и обучений', 15, 2000,
 ARRAY['/images/rooms/room-e-1.png', '/images/rooms/room-e-2.png', '/images/rooms/room-e-3.png'],
 ARRAY['Wi-Fi', '4K проектор', 'Звук', 'Видеоконференция', 'Стулья'], true),

(18, 'Комната 18', 'Небольшая переговорная с экраном', 6, 750,
 ARRAY['/images/rooms/room-f-1.png', '/images/rooms/room-f-2.png', '/images/rooms/room-f-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Телевизор'], true),

(19, 'Комната 19', 'Кабинет для переговоров с руководством', 6, 900,
 ARRAY['/images/rooms/room-a-3.png', '/images/rooms/room-b-3.png', '/images/rooms/room-c-2.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Мини-холодильник', 'Доска'], true),

(20, 'Комната 20', 'Яркая и просторная для тренингов', 18, 2200,
 ARRAY['/images/rooms/room-d-1.png', '/images/rooms/room-e-2.png', '/images/rooms/room-f-1.png'],
 ARRAY['Wi-Fi', 'Проектор', 'Звук', 'Видеоконференция', 'Стулья'], true),

(21, 'Комната 21', 'Удобная переговорная рядом с коворкинг-зоной', 4, 550,
 ARRAY['/images/rooms/room-a-1.png', '/images/rooms/room-b-1.png', '/images/rooms/room-c-1.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Кофе-машина'], true),

(22, 'Комната 22', 'Тихая комната для планерок и созвонов', 5, 650,
 ARRAY['/images/rooms/room-d-2.png', '/images/rooms/room-e-3.png', '/images/rooms/room-f-2.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Монитор'], true),

(23, 'Комната 23', 'Переговорная с мягкой мебелью для неформальных встреч', 6, 780,
 ARRAY['/images/rooms/room-a-2.png', '/images/rooms/room-b-2.png', '/images/rooms/room-c-2.png'],
 ARRAY['Wi-Fi', 'Удобные кресла', 'Чайник', 'Доска'], true),

(24, 'Комната 24', 'Маленькая переговорная для быстрых встреч', 2, 320,
 ARRAY['/images/rooms/room-d-3.png', '/images/rooms/room-e-1.png', '/images/rooms/room-f-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья'], true),

(25, 'Комната 25', 'Переговорная с возможностью гибкой расстановки мебели', 9, 1300,
 ARRAY['/images/rooms/room-a-3.png', '/images/rooms/room-b-1.png', '/images/rooms/room-c-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Большой экран'], true),

(26, 'Комната 26', 'Кабинет с кондиционером и уютной атмосферой', 4, 600,
 ARRAY['/images/rooms/room-d-1.png', '/images/rooms/room-d-2.png', '/images/rooms/room-d-3.png'],
 ARRAY['Wi-Fi', 'Кондиционер', 'Стол', 'Стулья'], true),

(27, 'Комната 27', 'Большая переговорная для собраний отделов', 20, 2600,
 ARRAY['/images/rooms/room-e-1.png', '/images/rooms/room-e-2.png', '/images/rooms/room-e-3.png'],
 ARRAY['Wi-Fi', 'Проектор', 'Звук', 'Видеоконференция', 'Стулья'], true),

(28, 'Комната 28', 'Маленькая переговорная для собеседований', 2, 300,
 ARRAY['/images/rooms/room-f-1.png', '/images/rooms/room-f-2.png', '/images/rooms/room-f-3.png'],
 ARRAY['Wi-Fi', 'Стол', 'Стулья', 'Телевизор'], true),

(29, 'Комната 29', 'Креативная комната с доской и маркерами', 7, 900,
 ARRAY['/images/rooms/room-a-1.png', '/images/rooms/room-b-2.png', '/images/rooms/room-c-1.png'],
 ARRAY['Wi-Fi', 'Доска', 'Стол', 'Стулья', 'Кофе-машина'], true),

(30, 'Комната 30', 'Просторная конференц-зала с отличной видимостью', 16, 2100,
 ARRAY['/images/rooms/room-d-2.png', '/images/rooms/room-e-2.png', '/images/rooms/room-f-2.png'],
 ARRAY['Wi-Fi', 'Большой экран', 'Звук', 'Стулья', 'Проектор'], true);

-- Сброс счетчика ID для rooms
SELECT setval('rooms_id_seq', 30);


-- ============================================
-- 3. ВСТАВКА БРОНИРОВАНИЙ (20 штук)
-- ============================================
INSERT INTO bookings (id, room_id, user_id, user_name, room_name, date, start_time, end_time, status, created_at) VALUES
(1, 1, 2, 'Пользователь', 'Переговорная А', '2026-01-25', '10:00', '11:00', 'confirmed', '2026-01-22T10:00:00Z'),
(2, 1, 2, 'Пользователь', 'Переговорная А', '2026-01-22', '20:00', '23:00', 'confirmed', '2026-01-22T11:53:10.024Z'),
(3, 2, 3, 'Вова', 'Переговорная Б', '2026-01-22', '20:11', '23:11', 'confirmed', '2026-01-22T12:11:54.748Z'),
(4, 5, 1, 'Администратор', 'Переговорная Д', '2026-01-23', '15:13', '19:13', 'confirmed', '2026-01-22T12:13:46.252Z'),
(5, 5, 2, 'Пользователь', 'Переговорная Д', '2026-01-22', '19:14', '20:14', 'confirmed', '2026-01-22T14:14:23.841Z'),
(6, 1, 5, 'цццццццццццццццццццццццццццццц', 'Переговорная А', '2026-01-28', '20:57', '22:57', 'confirmed', '2026-01-22T15:59:45.967Z'),
(7, 1, 2, 'Пользователь', 'Переговорная А', '2026-01-29', '21:04', '23:04', 'confirmed', '2026-01-22T16:04:58.074Z'),
(8, 3, 2, 'Пользователь', 'Переговорная В', '2026-01-31', '13:11', '23:15', 'confirmed', '2026-01-22T16:12:06.332Z'),
(9, 4, 2, 'Пользователь', 'Переговорная Г', '2026-02-01', '20:34', '23:34', 'confirmed', '2026-01-22T16:34:48.975Z'),
(10, 2, 2, 'Пользователь', 'Переговорная Б', '2026-02-07', '06:51', '12:51', 'confirmed', '2026-01-22T16:51:31.816Z'),
(11, 2, 1, 'Администратор', 'Переговорная Б', '2026-02-02', '02:24', '11:24', 'confirmed', '2026-01-22T17:24:44.354Z'),
(12, 1, 1, 'Администратор', 'Переговорная А', '2026-01-29', '02:51', '04:51', 'confirmed', '2026-01-22T17:51:46.476Z'),
(13, 1, 1, 'Администратор', 'Переговорная А', '2026-11-11', '11:52', '12:52', 'confirmed', '2026-01-22T23:53:14.986Z'),
(14, 1, 1, 'Администратор', 'Переговорная А', '2026-02-01', '00:22', '14:22', 'confirmed', '2026-01-23T16:23:02.009Z'),
(15, 1, 1, 'Администратор', 'Переговорная А', '2026-02-06', '04:02', '07:02', 'confirmed', '2026-01-23T20:02:56.453Z'),
(16, 1, 1, 'Администратор', 'Переговорная А', '2026-02-08', '03:47', '07:47', 'confirmed', '2026-01-23T20:47:43.378Z'),
(17, 2, 1, 'Администратор', 'Переговорная Б', '2026-02-01', '05:25', '06:25', 'confirmed', '2026-01-23T21:25:12.422Z'),
(18, 1, 5, 'цццццццццццццццццццццццццццццц', 'Переговорная А', '2026-04-03', '03:16', '06:16', 'confirmed', '2026-01-23T22:16:58.948Z'),
(19, 2, 1, 'Администратор', 'Переговорная Б', '2026-05-20', '03:41', '06:41', 'confirmed', '2026-01-23T23:41:14.987Z'),
(20, 2, 2, 'Пользователь', 'Комната 2', '2026-04-30', '15:37', '17:37', 'confirmed', '2026-01-24T08:37:58.375Z');

-- Сброс счетчика ID для bookings
SELECT setval('bookings_id_seq', 20);

COMMIT;