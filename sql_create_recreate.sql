-- Удаляем старую таблицу и создаем заново без поля name
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS rooms CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

CREATE TYPE user_role AS ENUM ('admin','user');
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(150) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(254) NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (char_length(username) >= 1),
  CHECK (char_length(password) >= 6)
);

CREATE UNIQUE INDEX users_username_lower_idx ON users (lower(username));
CREATE UNIQUE INDEX users_email_lower_idx ON users (lower(email));

CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  capacity INT NOT NULL CHECK (capacity > 0),
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
  images TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  amenities TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  available BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX rooms_name_idx ON rooms (name);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  room_id INT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  username VARCHAR(150) NOT NULL,   -- ← ИЗМЕНЕНО: username вместо user_name
  room_name VARCHAR(200) NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  start_ts TIMESTAMP GENERATED ALWAYS AS (date + start_time) STORED,
  end_ts   TIMESTAMP GENERATED ALWAYS AS (date + end_time)   STORED,
  status VARCHAR(20) NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed','cancelled','pending')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (end_time > start_time),
  CHECK ((end_ts - start_ts) >= INTERVAL '30 minutes')
);

ALTER TABLE bookings
  ADD EXCLUDE USING gist (room_id WITH =, tsrange(start_ts, end_ts) WITH &&);

CREATE INDEX bookings_room_date_idx ON bookings (room_id, date);
CREATE INDEX bookings_user_idx ON bookings (user_id);