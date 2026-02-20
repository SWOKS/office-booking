// Логика страницы комнаты: загрузка, галерея и форма бронирования
export default {
  name: "RoomView",
  data() {
    return {
      room: null,
      loading: true,
      error: null,
      currentImageIndex: 0,
      bookingData: {
        date: "",
        startTime: "",
        endTime: "",
      },
    };
  },
  computed: {
    today() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    isBookingValid() {
      if (!this.bookingData.date || !this.bookingData.startTime || !this.bookingData.endTime) return false;
      if (this.bookingData.startTime >= this.bookingData.endTime) return false;
      const minutes = this.calculateDuration();
      return minutes >= 30;
    },
    durationError() {
      if (!this.bookingData.startTime || !this.bookingData.endTime) return "";
      const minutes = this.calculateDuration();
      if (minutes < 30) return "⚠️ Минимальное время бронирования - 30 минут";
      return "";
    },
  },
  methods: {
    goBack() {
      this.$router.push({ name: 'rooms' });
    },
    prevImage() {
      if (!this.room || !this.room.images || !this.room.images.length) return;
      this.currentImageIndex = (this.currentImageIndex - 1 + this.room.images.length) % this.room.images.length;
    },
    nextImage() {
      if (!this.room || !this.room.images || !this.room.images.length) return;
      this.currentImageIndex = (this.currentImageIndex + 1) % this.room.images.length;
    },
    calculateDuration() {
      if (!this.bookingData.startTime || !this.bookingData.endTime) return 0;
      const toMinutes = (time) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
      };
      const start = toMinutes(this.bookingData.startTime);
      const end = toMinutes(this.bookingData.endTime);
      return Math.max(end - start, 0);
    },
    calculateTotalPrice() {
      const minutes = this.calculateDuration();
      if (minutes <= 0) return 0;
      const blocks = Math.ceil(minutes / 30);
      const hours = (blocks * 30) / 60;
      return Math.round(hours * this.room.price);
    },
    formatPrice(price) {
      if (price === 0) return "0";
      return Math.round(price).toLocaleString("ru-RU");
    },
    formatDuration(minutes) {
      if (minutes === 0) return "0 минут";
      if (minutes < 60) return `${minutes} минут`;
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;
      if (m === 0) return `${h} час${h > 1 ? "ов" : ""}`;
      return `${h} ч ${m} мин`;
    },
    async confirmBooking() {
      if (!this.isBookingValid) {
        alert("Пожалуйста, заполните все поля корректно");
        return;
      }

      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        alert("Пожалуйста, войдите в систему для бронирования");
        this.$router.push({ name: 'login' });
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomId: this.room.id,
            userId: currentUser.id,
            userName: currentUser.name,
            roomName: this.room.name,
            date: this.bookingData.date,
            startTime: this.bookingData.startTime,
            endTime: this.bookingData.endTime,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert("Комната успешно забронирована!");
          this.$router.push({ name: 'rooms' });
        } else {
          alert(data.error || "Ошибка при бронировании");
        }
      } catch (error) {
        console.error("Ошибка при бронировании:", error);
        alert("Ошибка при подключении к серверу");
      }
    },
    chooseRoom() {
      const el = document.querySelector('.booking-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const firstInput = el.querySelector('input');
        if (firstInput) firstInput.focus();
      } else {
        // В fallback перенаправляет на список комнат
        this.$router.push({ name: 'rooms' });
      }
    },
    getImageSrc(image) {
      if (!image) return '';
      if (image.startsWith('/')) return image;
      const idx = image.indexOf('/public/');
      if (idx !== -1) return image.slice(idx + '/public'.length);
      return image;
    },
    async loadRoom() {
      try {
        const id = this.$route.params.id;
        const res = await fetch(`http://localhost:3000/api/rooms/${id}`);
        if (res.ok) {
          this.room = await res.json();
        } else {
          this.error = 'Комната не найдена';
        }
      } catch (e) {
        console.error(e);
        this.error = 'Ошибка при загрузке комнаты';
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.loadRoom();
  },
};
