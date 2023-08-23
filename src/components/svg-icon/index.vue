<script setup>
import { computed } from "vue";
const props = defineProps({
  name: {// icons目录下的文件名,交由Vite自动处理
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  fillClass: {// tailwindcss
    type: String,   
  }
});

const symbolId = computed(() => `#icon-${props.name}`);
</script>

<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" :class="fillClass" />
  </svg>
</template>