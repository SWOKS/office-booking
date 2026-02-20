<template>
  <div class="home-view">
    <!-- Слайдер (Carousel) -->
    <section class="hero-slider">
      <div class="slider-container">
        <div class="slide">
          <img v-if="slides[currentSlide] && slides[currentSlide].image" :src="slides[currentSlide].image" alt="" class="slide-bg" />
          <div class="slide-overlay"></div>
          <div class="slide-content">
            <h2>{{ slides[currentSlide].title }}</h2>
            <p>{{ slides[currentSlide].description }}</p>
            <RouterLink to="/rooms" class="btn btn-primary-large">
              Выбрать комнату
            </RouterLink>
          </div>
        </div>

        <!-- Navigation arrows removed: slider uses indicators and auto-advance -->

        <!-- Индикаторы слайдов -->
        <div class="slider-indicators">
          <button
            v-for="(slide, index) in slides"
            :key="index"
            class="indicator"
            :class="{ active: index === currentSlide }"
            @click="currentSlide = index"
            :aria-label="`Слайд ${index + 1}`"
          ></button>
        </div>
      </div>
    </section>

    <!-- Информация о компании -->
    <section class="info-section">
      <div class="container">
        <h2 id="company">Добро пожаловать в OfficeBook</h2>
        <p class="intro-text">
          Современный сервис бронирования переговорных комнат в офисе. Быстро,
          удобно и надёжно организуйте свои встречи.
        </p>

        <!-- Преимущества -->
        <div class="advantages">
          <div class="advantage-card">
            <div class="advantage-icon">⚡</div>
            <h3>Быстрое бронирование</h3>
            <p>Забронируйте комнату за несколько кликов всего за 30 секунд</p>
          </div>

          <div class="advantage-card">
            <div class="advantage-icon">🔒</div>
            <h3>Безопасно</h3>
            <p>Ваши данные защищены с использованием современных технологий</p>
          </div>

          <div class="advantage-card">
            <div class="advantage-icon">💰</div>
            <h3>Выгодные цены</h3>
            <p>Конкурентные цены на все виды переговорных комнат</p>
          </div>

          <div class="advantage-card">
            <div class="advantage-icon">🎯</div>
            <h3>Полный контроль</h3>
            <p>Отслеживайте все ваши бронирования в личном кабинете</p>
          </div>

          <div class="advantage-card">
            <div class="advantage-icon">📞</div>
            <h3>Поддержка 24/7</h3>
            <p>Наша команда всегда готова помочь вам с любыми вопросами</p>
          </div>

          <div class="advantage-card">
            <div class="advantage-icon">🏆</div>
            <h3>Надёжность</h3>
            <p>Работаем более 10 лет на рынке бронирования помещений</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Категории комнат -->
    <section class="categories-section">
      <div class="container">
        <h2>Наши комнаты</h2>

        <div class="rooms-preview">
          <div class="room-card-preview">
            <div>🏢</div>
            <h3>Малые комнаты</h3>
            <p>От 2 до 4 человек</p>
            <p class="price">от 300 руб/час</p>
          </div>

          <div class="room-card-preview">
            <div>🏛️</div>
            <h3>Средние комнаты</h3>
            <p>От 6 до 8 человек</p>
            <p class="price">от 800 руб/час</p>
          </div>

          <div class="room-card-preview">
            <div>🏰</div>
            <h3>Большие залы</h3>
            <p>От 10 человек</p>
            <p class="price">от 1500 руб/час</p>
          </div>
        </div>

        <div class="view-all-rooms">
          <RouterLink to="/rooms" class="btn btn-primary">
            Посмотреть все комнаты
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Как это работает -->
    <section class="how-it-works">
      <div class="container">
        <h2>Как это работает?</h2>

        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Зарегистрируйтесь</h3>
            <p>Создайте аккаунт или войдите в систему</p>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <h3>Выберите комнату и время</h3>
            <p>Просмотрите комнаты, укажите дату и время встречи</p>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <h3>Подтвердите бронь</h3>
            <p>Нажмите кнопку "Забронировать" и готово!</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script src="./scripts/HomeView.js"></script>

<style lang="less" src="../assets/less1/views/HomeView.less"></style>
