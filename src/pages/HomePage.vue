<script setup>
import PostList from "../components/list/index.vue";
</script>

<template>
  <div
    class="max-h-screen overflow-auto duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-400/70 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <div class="max-w-screen-xl mx-auto relative max-xl:px-2">
      <PostList />
    </div>
    <Teleport to="body">
      <y-float-area></y-float-area>
    </Teleport>
  </div>
</template>
