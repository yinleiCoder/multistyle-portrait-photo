<script setup>
import { computed } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  fillClass: {
    // tailwindcss
    type: String,
  },
});

const symbolId = computed(() => `#icon-${props.name}`);
</script>

<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" :class="fillClass" />
  </svg>
</template>
