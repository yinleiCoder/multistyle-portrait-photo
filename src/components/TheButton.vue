<script setup>
defineProps({
  color: {
    type: String,
    default: "primary",
  },
  reverse: Boolean,
});
</script>

<template>
  <button class="button" :class="{ primary: color === 'primary', reverse }">
    <slot></slot>
  </button>
</template>

<style scoped>
.button {
  border-radius: 8px;
  padding: 10px 32px;
  border: none;
  outline: none;
  color: #fff;
  font-size: 16px;
}

.button.primary {
    background: #000;
}

.button.reverse {
    background: none;
    border: 1px solid #000;
    color: initial;
}
</style>
