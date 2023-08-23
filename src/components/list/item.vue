<script setup>
import { ref } from "vue";
import { useFullscreen } from "@vueuse/core";
import { randomRGB } from "../../utils/color";
import { weiboShare } from "../../utils/share";

const props = defineProps({
  post: {
    type: Object,
    default: {},
  },
  width: {
    type: Number,
  },
});

const emits = defineEmits("onGoPostDetail");

// 全屏
const imgTarget = ref(null);
const { enter: onEnterFullScreen } = useFullscreen(imgTarget);

// 微博分享
const onWeiboShare = () => {
  weiboShare();
};

// 进入帖子详情
const onGoToPostDetail = () => {
  emits("onGoPostDetail", {
    postId: props.post._id,
  });
};
</script>

<template>
  <div class="dark:bg-zinc-800 rounded pb-1">
    <div
      class="relative w-full rounded cursor-pointer group"
      :style="{
        backgroundColor: randomRGB(),
      }"
      @click="onGoToPostDetail"
    >
      <img
        ref="imgTarget"
        class="w-full rounded object-contain"
        :src="post.images[0]"
        :alt="post.title"
      />
      <!-- 遮罩 -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <!-- 微博分享 -->
        <y-button
          class="absolute top-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          icon="IconShare"
          @click="onWeiboShare"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        ></y-button>
        <!-- 全屏 -->
        <y-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          icon="IconFullScreen"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          size="small"
          @click="onEnterFullScreen"
        ></y-button>
      </div>
    </div>
    <!-- 帖子及作者信息 -->
    <p class="text-sm p-1 font-bold text-zinc-900 dark:text-zinc-300">
      {{ post.title }}
    </p>
    <div class="flex items-center p-1 gap-2">
      <img
        class="h-6 w-6 rounded object-cover"
        :src="post.owner.avatar"
        :alt="post.owner.username"
      />
      <span>{{ post.owner.username }}</span>
    </div>
  </div>
</template>
