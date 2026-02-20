<template>
  <div class="room-page">
    <button class="btn btn-back top-back" @click="goBack">← Назад</button>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="room-container">
      <div class="room-gallery">
        <div class="gallery-main">
          <img v-if="room.images && room.images.length" :src="getImageSrc(room.images[currentImageIndex])" :alt="room.name + ' - ' + (currentImageIndex+1)" class="gallery-image" />
          <div v-else class="gallery-placeholder">{{ room.name.charAt(0) }}</div>
          <div class="gallery-counter">{{ currentImageIndex + 1 }} / {{ room.images.length }}</div>
          <button v-if="room.images && room.images.length > 1" class="gallery-btn prev" @click="prevImage" aria-label="Предыдущее фото">❮</button>
          <button v-if="room.images && room.images.length > 1" class="gallery-btn next" @click="nextImage" aria-label="Следующее фото">❯</button>
        </div>

        <div v-if="room.images && room.images.length > 1" class="gallery-thumbnails">
          <button v-for="(image, index) in room.images" :key="index" class="thumbnail" :class="{ active: index === currentImageIndex }" @click="currentImageIndex = index">
            <img :src="getImageSrc(image)" :alt="'thumb-'+index" class="thumbnail-img" />
          </button>
        </div>
      </div>

      <div class="room-details">
        <h2>{{ room.name }}</h2>
        <div class="room-header-info">
          <span class="price">{{ room.price }} руб/час</span>
          <span class="capacity">👥 {{ room.capacity }} человек</span>
        </div>
        <p class="description">{{ room.description }}</p>

        <div class="amenities">
          <h3>Удобства:</h3>
          <div class="amenities-list">
            <span v-for="amenity in room.amenities" :key="amenity" class="amenity-tag">✓ {{ amenity }}</span>
          </div>
        </div>

        <div class="booking-form">
          <h3>Забронировать</h3>

          <div class="form-group">
            <label for="bookingDate">Дата:</label>
            <input v-model="bookingData.date" type="date" id="bookingDate" :min="today" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="startTime">Время начала:</label>
              <input v-model="bookingData.startTime" type="time" id="startTime" required />
            </div>

            <div class="form-group">
              <label for="endTime">Время конца:</label>
              <input v-model="bookingData.endTime" type="time" id="endTime" required />
            </div>
          </div>

          <div v-if="bookingData.startTime && bookingData.endTime" class="price-calculation">
            <p v-if="durationError" class="error-text">{{ durationError }}</p>
            <div v-else>
              <p>Продолжительность: <strong>{{ formatDuration(calculateDuration()) }}</strong></p>
              <p>Итоговая стоимость: <strong class="total-price">{{ formatPrice(calculateTotalPrice()) }} руб.</strong></p>
            </div>
          </div>

          <div class="form-actions">
            <button @click="confirmBooking" class="btn btn-confirm" :disabled="!isBookingValid">Забронировать</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script src="./scripts/RoomView.js"></script>

<style lang="less" src="../assets/less1/views/RoomView.less"></style>
