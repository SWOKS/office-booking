import { RouterLink } from "vue-router";

// Логика главной страницы: слайдер и автопереключение
export default {
  name: "HomeView",
  components: { RouterLink },
  data() {
    return {
      currentSlide: 0,
      slides: [
        {
          title: "Профессиональные переговорные комнаты",
          description: "Идеальное место для ваших важных встреч и презентаций",
          image: "/images/slide-1.png",
        },
        {
          title: "Современное оборудование",
          description: "Все необходимое для эффективных встреч и конференций",
          image: "/images/slide-2.png",
        },
        {
          title: "Гибкие условия бронирования",
          description: "Забронируйте комнату на любое удобное для вас время",
          image: "/images/slide-3.png",
        },
      ],
      autoSlideInterval: null,
    };
  },
  mounted() {
    this.autoSlideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 5000);
  },
  beforeUnmount() {
    clearInterval(this.autoSlideInterval);
  },
    methods: {
    // Навигация слайдера через индикаторы
  },
};
