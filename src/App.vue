<script setup>
import NavBar from "./components/NavBar.vue";
import TheLayout from "./components/TheLayout.vue";
</script>

<template>
  <template v-if="$route.name !== 'login'">
    <header class="sticky top-0 left-0 right-0 z-20">
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
</style>
