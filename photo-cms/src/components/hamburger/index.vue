<script setup>
import { computed } from "vue";
import { useAppStore } from "../../stores/app";

const appStore = useAppStore();

const icon = computed(() => {
  return appStore.sidebarOpened ? "IconFold" : "IconUnfold";
});

const handleToggleFold = () => {
  appStore.triggerSidebarOpened();
};
</script>
<template>
  <div @click="handleToggleFold">
    <y-svg-icon :name="icon" class="w-6 h-6 cursor-pointer hover:bg-zinc-200 rounded duration-300"></y-svg-icon>
  </div>
</template>
