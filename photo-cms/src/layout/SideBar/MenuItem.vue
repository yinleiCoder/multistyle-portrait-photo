<script setup>
import { genMenui18nTitle } from "../../utils/i18n.js";
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
  <el-icon :size="18">
    <component :is="icon"></component>
  </el-icon>
  <span>{{ genMenui18nTitle(title) }}</span>
</template>
