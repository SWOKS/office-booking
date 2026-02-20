<template>
  <div class="price-slider">
    <input
      type="range"
      :min="0"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="onInput"
      class="range-input"
      :style="rangeStyle"
    />
  </div>
</template>

<script>
export default {
  name: 'PriceSlider',
  props: {
    modelValue: { type: Number, default: 0 },
    max: { type: Number, default: 3000 },
    step: { type: Number, default: 50 }
  },
  computed: {
    percent() {
      const m = this.max || 1;
      return Math.min(100, Math.max(0, (this.modelValue / m) * 100));
    },
    rangeStyle() {
      return {
        backgroundImage: 'linear-gradient(to right, rgb(167,201,87), rgb(167,201,87))',
        backgroundSize: `${this.percent}% 100%`,
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgb(239,239,239)'
      };
    }
  },
  methods: {
    onInput(e) {
      const v = Number(e.target.value || 0);
      this.$emit('update:modelValue', v);
    }
  }
};
</script>

<style scoped>
.range-input {
  appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
}
.range-input::-webkit-slider-runnable-track {
  height: 10px;
  border-radius: 6px;
  background: transparent;
}
.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgb(113,82,150); /* thumb color */
  border: 3px solid white;
  margin-top: -6px; /* center the thumb */
  box-shadow: 0 2px 6px rgba(0,0,0,0.25);
}
.range-input::-moz-range-track {
  height: 10px;
  border-radius: 6px;
  background: transparent;
}
.range-input::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgb(113,82,150);
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0,0,0,0.25);
}
</style>
