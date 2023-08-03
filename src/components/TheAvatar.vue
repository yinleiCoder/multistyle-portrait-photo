<script setup>
import defaultAvatar from "../assets/defaultAvatar.png";
defineProps({
  src: String,
  width: {
    type: Number,
    default: 34,
  },
  height: {
    type: Number,
    default: 34,
  },
});
</script>

<template>
  <img :src="src || defaultAvatar" alt="avatar" class="avatar" />
</template>

<style scoped>
.avatar {
  width: v-bind(width + "px");
  height: v-bind(height + "px");
  border-radius: 50%;
  background: transparent;
  object-fit: cover;
  object-position: center center;
}
</style>
