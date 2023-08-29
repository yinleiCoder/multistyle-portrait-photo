<script setup>
import { computed } from "vue";
import { useAppStore } from "../../stores/app";

const appStore = useAppStore();
const icon = computed(() => {
  return appStore.sidebarOpened ? "IconFold" : "IconUnfold";
});

const handleToggleClick = () => {
  appStore.triggerSidebarOpened();
};
</script>
<template>
  <div @click="handleToggleClick">
    <y-svg-icon :name="icon" class="w-6 h-6 cursor-pointer"></y-svg-icon>
  </div>
</template>
