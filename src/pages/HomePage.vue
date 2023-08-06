<script setup>
import { ref } from "vue";
import PostList from "../components/list/index.vue";
</script>

<template>
  <div
    class="h-[calc(100vh-65.6px)] overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-400 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
  >
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <PostList></PostList>
    </div>
    <Teleport to="body">
      <y-float-area></y-float-area>
    </Teleport>
  </div>
</template>

<style scoped></style>
