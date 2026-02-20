<template>
  <div class="rooms-view">
    <div class="rooms-container">
      <!-- Левая панель - фильтры -->
      <aside class="filters-panel">
        <h3>Фильтры</h3>

        <!-- Фильтр по цене -->
        <div class="filter-group">
          <div class="price-label">
            <span>Цена (руб/ч)</span>
            <span class="price-value">{{ selectedPrice }}</span>
          </div>
          <price-slider v-model="selectedPrice" :max="maxPrice" />
          <div class="price-info">
            <span class="price-min">0 руб/ч</span>
            <span class="price-max">3000 руб/ч</span>
          </div>
        </div>

        <!-- Фильтр по количеству человек -->
        <div class="filter-group">
          <label class="filter-label">Вместимость:</label>
          <div class="capacity-checkboxes">
            <div class="checkbox-item">
              <input 
                v-model="selectedCapacities" 
                type="checkbox" 
                value="2-4"
                id="cap-2-4"
              />
              <label for="cap-2-4">2-4 человека</label>
            </div>
            <div class="checkbox-item">
              <input 
                v-model="selectedCapacities" 
                type="checkbox" 
                value="6-8"
                id="cap-6-8"
              />
              <label for="cap-6-8">6-8 человек</label>
            </div>
            <div class="checkbox-item">
              <input 
                v-model="selectedCapacities" 
                type="checkbox" 
                value="10+"
                id="cap-10"
              />
              <label for="cap-10">10+ человек</label>
            </div>
          </div>
        </div>

        <!-- Кнопка очистки фильтров -->
        <button @click="resetFilters" class="btn btn-primary btn-clear">
          Очистить фильтры
        </button>
      </aside>

      <!-- Основная часть - комнаты -->
      <section class="rooms-section">
        <!-- Кнопки сортировки -->
        <div class="sort-buttons">
          <div>Найдено комнат: {{ filteredRooms.length }}</div>
          <div class="sort-controls">
            <button
              @click="sortRooms('popular')"
              class="sort-btn"
              :class="{ active: currentSort === 'popular' }"
            >
              ⭐ Популярные
            </button>
            <button
              @click="sortRooms('cheaper')"
              class="sort-btn"
              :class="{ active: currentSort === 'cheaper' }"
            >
              💰 Дешевле
            </button>
            <button
              @click="sortRooms('expensive')"
              class="sort-btn"
              :class="{ active: currentSort === 'expensive' }"
            >
              👑 Дороже
            </button>
          </div>
        </div>

        <!-- Список комнат -->
        <div v-if="filteredRooms.length > 0" class="rooms-grid">
          <article
            v-for="room in filteredRooms"
            :key="room.id"
            class="room-card"
            @click="selectRoom(room)"
          >
            <div class="room-image">
              <img v-if="room.images && room.images.length" :src="normalizeImage(room.images[0])" :alt="room.name" />
              <div v-else>{{ room.name.charAt(0) }}</div>
              <div class="room-price">{{ room.price }} руб/ч</div>
            </div>
            <div class="room-info">
              <h3 class="room-name">{{ room.name }}</h3>
              <p class="room-capacity">{{ room.capacity }} человек</p>
              <p class="description">{{ room.description }}</p>
              <button class="btn btn-primary">Подробнее</button>
            </div>
          </article>
        </div>

        <!-- Пустой результат -->
        <div v-else>
          <p>Комнат не найдено согласно выбранным фильтрам</p>
          <button @click="resetFilters" class="btn btn-primary btn-clear">
            Очистить фильтры
          </button>
        </div>
      </section>
    </div>

    
  </div>
</template>

<script src="./scripts/RoomsView.js"></script>

<style lang="less" src="../assets/less1/views/RoomsView.less"></style>

