<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <el-icon :size="20">
    <component :is="icon"></component>
  </el-icon>
  <span>{{ title }}</span>
</template>
