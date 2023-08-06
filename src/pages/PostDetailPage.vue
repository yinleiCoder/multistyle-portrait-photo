<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { saveAs } from "file-saver";
import { usePostStore } from "../stores/post";

const route = useRoute();
const postStore = usePostStore();

const postId = ref(route.params.id);

// 当前被选中的图片
const currentSelectedIndex = ref(0);
const onItemSelectedClick =(index) => {
  currentSelectedIndex.value = index
}

// 弹窗popup控制
const isVisual = ref(false);
const onShowPopup = (index) => {
  isVisual.value = true;
  currentSelectedIndex.value = index
};
const onClosePopup = () => {
  isVisual.value = false;
};

// 下载图片
const onDownloadImage = (image) => {
  saveAs(image);
};
</script>

<template>
  <div class="w-full bg-white dark:bg-zinc-800 duration-500">
    <div class="w-full max-w-screen-lg mx-auto relative max-lg:px-2">
      <h1 class="font-bold text-4xl pt-4 mb-4 dark:text-zinc-100">
        {{ postStore.currentDetailPost.title }}
      </h1>
      <div class="flex justify-start items-center mb-4 select-none">
        <y-svg-icon
          class="w-4 h-4 mr-2 animate-bounce"
          name="IconIdentify"
        ></y-svg-icon>
        <span class="text-zinc-400">{{ postId }}</span>
      </div>
      <div class="mb-4 flex gap-x-2 items-center">
        <img
          class="w-10 h-10 object-cover rounded-full shadow-lg border-2 border-black cursor-pointer"
          :src="postStore.currentDetailPost.owner.avatar"
        />
        <span class="font-bold tracking-widest">{{
          postStore.currentDetailPost.owner.username
        }}</span>
      </div>
      <div class="mb-4 text-base font-sans dark:text-zinc-200">
        {{ postStore.currentDetailPost.content }}
      </div>
      <div
        v-for="(item, index) in postStore.currentDetailPost.images"
        :key="index"
      >
        <img
          v-lazy
          @click="onShowPopup(index)"
          :src="item"
          class="mt-2 cursor-zoom-in rounded"
        />
      </div>
      <div class="flex justify-center my-6">
        <y-svg-icon name="IconLike" class="w-10 h-10"></y-svg-icon>
      </div>
    </div>
    <!-- 弹窗用网格显示图片 -->
    <y-popup v-model="isVisual" class="flex overflow-hidden z-100">
      <div class="flex-1 flex justify-center items-center relative">
        <div class="absolute inset-0 bg-black z-1"></div>
        <div class="relative max-h-full">
          <img
            :src="postStore.currentDetailPost.images[currentSelectedIndex]"
            class="relative max-w-full max-h-screen z-1 inline-block"
          />
          <div
            class="z-2 flex flex-wrap justify-start items-start absolute top-2 left-2"
          >
            <!-- 下载按钮 -->
            <y-button
              class="bg-zinc-100/60"
              type="info"
              icon="IconDownload"
              iconClass="fill-zinc-900 dark:fill-zinc-200"
              size="default"
              @click="onDownloadImage(postStore.currentDetailPost.images[0])"
            ></y-button>
          </div>
        </div>
      </div>
      <div class="w-[380px] px-6 py-4 bg-zinc-800 text-zinc-100">
        <div class="h-full relative">
          <div
            class="mb-4 flex gap-x-2 items-center border-b-2 py-2 border-zinc-600"
          >
            <img
              class="w-10 h-10 object-cover rounded-full cursor-pointer"
              :src="postStore.currentDetailPost.owner.avatar"
            />
            <span class="font-bold tracking-widest">{{
              postStore.currentDetailPost.owner.username
            }}</span>
          </div>
          <h3 class="font-normal text-base mb-4 text-zinc-100">
            {{ postStore.currentDetailPost.title }}
          </h3>
          <div class="relative min-h-[113px] h-[calc(((100%-94px)-88px)-70px)]">
            <div
              class="w-full h-full overflow-x-hidden overflow-y-auto relative"
            >
              <div class="flex flex-wrap justify-start gap-2 items-start">
                <span
                  class="w-[103px] h-[103px] rounded-md cursor-pointer relative after:block after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-md after:bg-black/40 hover:after:bg-transparent hover:after:border-2 hover:after:border-solid hover:after:border-zinc-100"
                  v-for="(item, index) in postStore.currentDetailPost.images"
                  @click="onItemSelectedClick(index)"
                >
                  <img
                    class="w-full h-full object-cover rounded-md"
                    :src="item"
                  />
                </span>
              </div>
            </div>
            <div
              class="w-full h-[60px] pointer-events-none bg-gradient-to-b from-transparent to-zinc-800 absolute bottom-2"
            ></div>
          </div>
          <div class="flex justify-center my-4">
            <y-svg-icon name="IconLike" class="w-10 h-10"></y-svg-icon>
          </div>
        </div>
        <y-svg-icon
          name="IconDelete"
          class="w-8 h-8 fixed right-2 top-2 z-1 cursor-pointer"
          @click="onClosePopup"
        ></y-svg-icon>
      </div>
    </y-popup>
  </div>
</template>

<style scoped></style>
