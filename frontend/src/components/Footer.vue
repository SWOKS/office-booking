<template>
  <footer class="footer" id="contacts">
    <div class="footer-container">
      <!-- Контакты -->
      <section class="footer-section">
        <h3>📞 Контакты</h3>
        <div class="contact-info">
          <p>
            <strong>Адрес:</strong><br />
            ул. Офисная, д. 42, Москва, 123456
          </p>
          <p>
            <strong>Телефон:</strong><br />
            +7 (495) 123-45-67
          </p>
          <p>
            <strong>Email:</strong><br />
            info@officebook.ru
          </p>
          <p>
            <strong>Режим работы:</strong><br />
            Работаем круглосуточно, 7 дней в неделю
          </p>
        </div>
      </section>

      <!-- Информация -->
      <section class="footer-section">
        <h3>ℹ️ Информация</h3>
        <ul>
          <li><RouterLink to="/#company">О компании</RouterLink></li>
        </ul>
      </section>

      <!-- Услуги -->
      <section class="footer-section">
        <h3>🏢 Наши услуги</h3>
        <ul>
          <li><a href="/rooms">Забронировать комнату</a></li>
        </ul>
      </section>

      <!-- Соцсети -->
      <section class="footer-section">
        <h3>🌐 Следите за нами</h3>
        <div class="social-links">
          <a href="https://www.instagram.com/" class="social-icon" target="_blank" rel="noopener">Instagram</a>
          <a href="https://t.me/" class="social-icon" target="_blank" rel="noopener">Telegram</a>
          <a href="https://vk.com/" class="social-icon" target="_blank" rel="noopener">VKontakte</a>
        </div>
      </section>
    </div>

    <!-- Нижняя панель подвала -->
    <div class="footer-bottom">
      <p>
        &copy; 2026 OfficeBook. Все права защищены. | Разработано с ❤️ для ваших
        встреч
      </p>
    </div>
  </footer>

</template>

<script src="./scripts/Footer.js"></script>

<style lang="less" src="../assets/less1/components/Footer.less"></style>
