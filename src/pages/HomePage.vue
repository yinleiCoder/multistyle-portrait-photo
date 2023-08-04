<script setup>
import { ref } from "vue";
import PostList from "../components/list/index.vue";

// 弹窗popup控制
const isVisual = ref(false);
const onShowPopup = () => {
  isVisual.value = true;
};
</script>

<template>
  <div class="h-[calc(100vh-65.6px)] overflow-auto bg-white dark:bg-zinc-800 duration-500">
    <y-popup v-model="isVisual">
      <!-- @click="onShowPopup" -->
      <div>测试弹窗内容</div>
      <div>测试弹窗内容</div>
      <div>测试弹窗内容</div>
      <div>测试弹窗内容</div>
    </y-popup>
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <PostList></PostList>
    </div>
  </div>
</template>

<style scoped></style>
