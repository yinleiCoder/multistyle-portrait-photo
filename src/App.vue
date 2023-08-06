<script setup>
import NavBar from "./components/NavBar.vue";
import TheLayout from "./components/TheLayout.vue";
</script>

<template>
  <template v-if="$route.name !== 'login'">
    <header class="header">
      <NavBar />
    </header>
    <TheLayout>
      <router-view></router-view>
    </TheLayout>
  </template>
  <template v-else>
    <router-view></router-view>
  </template>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
