// Загружает и управляет данными админ-панели
import { RouterLink } from "vue-router";

export default {
  name: "AdminView",
  components: { RouterLink },
  data() {
    return {
      bookings: [],
      rooms: [],
      users: [],
      activeTab: "bookings",
      loading: false,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      try {
        const bookingsResponse = await fetch(
          "http://localhost:3000/api/bookings"
        );
        if (bookingsResponse.ok) this.bookings = await bookingsResponse.json();
        const roomsResponse = await fetch("http://localhost:3000/api/rooms");
        if (roomsResponse.ok) this.rooms = await roomsResponse.json();
        try {
          const usersResponse = await fetch("http://localhost:3000/api/users");
          if (usersResponse.ok) this.users = await usersResponse.json();
        } catch {
          this.users = [];
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        alert("Ошибка при загрузке данных");
      } finally {
        this.loading = false;
      }
    },
    deleteBooking(bookingId) {
      if (confirm("Вы уверены, что хотите удалить это бронирование?")) {
        this.bookings = this.bookings.filter((b) => b.id !== bookingId);
        alert("Бронирование удалено (только из интерфейса, файл не изменён)");
      }
    },
    deleteRoom(roomId) {
      if (confirm("Вы уверены, что хотите удалить эту комнату?")) {
        this.rooms = this.rooms.filter((r) => r.id !== roomId);
        alert("Комната удалена (только из интерфейса, файл не изменён)");
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString + "T00:00:00");
      return date.toLocaleDateString("ru-RU");
    },
  },
};
