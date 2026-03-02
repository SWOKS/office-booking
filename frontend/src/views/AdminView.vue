<template>
  <div class="admin-view">
    <div class="admin-header">
      <h1>Админ-панель</h1>
    </div>

    <div class="admin-container">
      <!-- Вкладки -->
      <div class="tabs">
        <button
          class="tab"
          :class="{ active: activeTab === 'bookings' }"
          @click="activeTab = 'bookings'"
        >
          📅 Бронирования
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'rooms' }"
          @click="activeTab = 'rooms'"
        >
          🏢 Комнаты
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'users' }"
          @click="activeTab = 'users'"
        >
          👥 Пользователи
        </button>
      </div>

      <!-- Вкладка Бронирования -->
      <div v-if="activeTab === 'bookings'" class="tab-content">
        <h2>Все бронирования</h2>
        <p class="tab-subtitle">Всего: {{ bookings.length }} бронирований</p>

        <div v-if="bookings.length > 0" class="bookings-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Пользователь</th>
                <th>Комната</th>
                <th>Дата</th>
                <th>Время</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="booking in bookings"
                :key="booking.id"
                class="booking-row"
              >
                <td class="id">{{ booking.id }}</td>
                <td>{{ booking.username }}</td>
                <td>{{ booking.roomName }}</td>
                <td>{{ formatDate(booking.date) }}</td>
                <td>{{ booking.startTime }} - {{ booking.endTime }}</td>
                <td>
                  <span class="status" :class="booking.status">
                    {{
                      booking.status === "confirmed"
                        ? "✓ Подтверждено"
                        : booking.status
                    }}
                  </span>
                </td>
                <td>
                  <button
                    @click="deleteBooking(booking.id)"
                    class="btn btn-delete-small"
                  >
                    🗑️ Удалить
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p>Нет бронирований</p>
        </div>
      </div>

      <!-- Вкладка Комнаты -->
      <div v-if="activeTab === 'rooms'" class="tab-content">
        <h2>Все комнаты</h2>
        <p class="tab-subtitle">Всего: {{ rooms.length }} комнат(ы)</p>

        <div v-if="rooms.length > 0" class="rooms-admin-grid">
          <div v-for="room in rooms" :key="room.id" class="room-admin-card">
            <div class="room-admin-header">
              <h3>{{ room.name }}</h3>
              <button @click="deleteRoom(room.id)" class="btn btn-danger">
                🗑️
              </button>
            </div>
            <p class="room-admin-desc">{{ room.description }}</p>
            <div class="room-admin-info">
              <span>👥 {{ room.capacity }} чел.</span>
              <span>💰 {{ room.price }} руб/ч</span>
              <span>📋 {{ room.amenities.length }} услуг</span>
            </div>
            <div class="amenities-display">
              <span
                v-for="amenity in room.amenities"
                :key="amenity"
                class="amenity-badge"
              >
                {{ amenity }}
              </span>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Нет комнат</p>
        </div>
      </div>

      <!-- Вкладка Пользователи -->
      <div v-if="activeTab === 'users'" class="tab-content">
        <h2>Пользователи системы</h2>
        <p class="tab-subtitle">Всего: {{ users.length }} пользователей</p>

        <div v-if="users.length > 0" class="users-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Дата регистрации</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" class="user-row">
                <td class="id">{{ user.id }}</td>
                <td>
                  <code>{{ user.username }}</code>
                </td>
                <td>{{ user.email }}</td>
                <td>
                  <span class="role-badge" :class="user.role">
                    {{ user.role === "admin" ? "👑 Админ" : "👤 Пользователь" }}
                  </span>
                </td>
                <td>{{ new Date().toLocaleDateString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p>Нет пользователей</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script src="./scripts/AdminView.js"></script>

<style lang="less" src="../assets/less1/views/AdminView.less"></style>
