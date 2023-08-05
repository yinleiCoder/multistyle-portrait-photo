<script setup>
import { randomRGB } from "../../utils/color";
defineProps({
  post: {
    type: Object,
    default: {},
  },
  width: {
    type: Number,
  },
});
</script>

<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div class="relative w-full rounded cursor-zoom-in group" :style="{
      backgroundColor: randomRGB()
    }">
      <img
        class="w-full rounded bg-transparent object-cover"
        :src="post.images[0]"
        :alt="post.title"
      />
      <!-- 遮罩 -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <!-- 分享 -->
        <y-button class="absolute top-1.5 left-1.5">分享</y-button>
        <!-- 点赞 -->
        <y-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="IconHeart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        ></y-button>
        <!-- 下载 -->
        <y-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          icon="IconDownload"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          size="small"
        ></y-button>
        <!-- 全屏 -->
        <y-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          icon="IconFullScreen"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          size="small"
        ></y-button>
      </div>
    </div>
    <!-- 帖子及作者信息 -->
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
      {{ post.title }}
    </p>
    <div class="flex items-center mt-1 px-1 gap-2">
      <img
        class="h-6 w-6 rounded"
        :src="post.owner.avatar"
        :alt="post.owner.username"
      />
      <span>{{ post.owner.username }}</span>
    </div>
  </div>
</template>
