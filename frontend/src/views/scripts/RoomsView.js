// Описывает логику фильтрации и сортировки комнат
import PriceSlider from '../../components/PriceSlider.vue';

export default {
  name: "RoomsView",
  components: { PriceSlider },
  data() {
    return {
      rooms: [],
      selectedPrice: 3000,
      selectedCapacities: [],
      currentSort: "popular",
      
      loading: true,
      error: null,
    };
  },
  computed: {
    filteredRooms() {
      let filtered = this.rooms;
      filtered = filtered.filter((room) => room.price <= this.selectedPrice);

      if (this.selectedCapacities.length > 0) {
        filtered = filtered.filter((room) => {
          for (let capacity of this.selectedCapacities) {
            if (capacity === "2-4" && room.capacity >= 2 && room.capacity <= 4)
              return true;
            if (capacity === "6-8" && room.capacity >= 6 && room.capacity <= 8)
              return true;
            if (capacity === "10+" && room.capacity >= 10) return true;
          }
          return false;
        });
      }

      switch (this.currentSort) {
        case "cheaper":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "expensive":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "popular":
        default:
          break;
      }

      return filtered;
    },
    maxPrice() {
      return 3000;
    }
  },
  mounted() {
    this.loadRooms();
  },
  methods: {
    async loadRooms() {
      try {
        const response = await fetch("http://localhost:3000/api/rooms");
        if (response.ok) this.rooms = await response.json();
        else this.error = "Не удалось загрузить комнаты";
        // Убедимся, что выбранная цена не превышает максимума после загрузки
        this.selectedPrice = Math.min(this.selectedPrice, this.maxPrice);
      } catch (error) {
        console.error("Ошибка при загрузке комнат:", error);
        this.error = "Ошибка при подключении к серверу";
      } finally {
        this.loading = false;
      }
    },
    sortRooms(sortType) {
      this.currentSort = sortType;
    },
    resetFilters() {
      this.selectedPrice = this.maxPrice;
      this.selectedCapacities = [];
      this.currentSort = "popular";
    },
    selectRoom(room) {
      // Переход на страницу отдельной комнаты по имени маршрута 'room'
      // (раньше функция выполняла именно этот переход; при переносе в отдельный скрипт
      // была заменена на выставление выбранной комнаты для модалки — вернём навигацию)
      this.$router.push({ name: 'room', params: { id: room.id } });
    },
    normalizeImage(image) {
      // Нормализует путь до изображения, корректируя старые абсолютные пути
      if (!image) return '';
      if (typeof image === 'string' && image.startsWith('/')) return image;
      const idx = String(image).indexOf('/public/');
      if (idx !== -1) return image.slice(idx + '/public'.length);
      return image;
    },
    
  },
};
