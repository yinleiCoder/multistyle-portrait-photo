<script setup>
import { useFullscreen } from "@vueuse/core";

const { isFullscreen, enter, exit, toggle } = useFullscreen();
</script>
<template>
  <div @click="toggle">
    <y-svg-icon
      :name="isFullscreen ? 'IconOffscreen' : 'IconFullscreen'"
      class="w-6 h-6 cursor-pointer"
    ></y-svg-icon>
  </div>
</template>
