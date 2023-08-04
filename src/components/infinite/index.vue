<script setup>
import { ref, watch } from "vue";
import { useVModel, useIntersectionObserver } from "@vueuse/core";

const props = defineProps({
  // 处于加载状态
  modelValue: {
    type: Boolean,
    required: true,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["onLoad", "update:modelValue"]);

// 处理loading状态
const loading = useVModel(props);

const loadingTarget = ref(null);
const targetIsIntersecting = ref(false);
useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
  targetIsIntersecting.value = isIntersecting;
  emitLoad();
});

watch(loading, (val) => {
  emitLoad();
});

const emitLoad = () => {
  // 加载更多的视图可见时，处理加载更多数据的逻辑
  setTimeout(() => {
    if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
      loading.value = true;
      emits("onLoad");
    }
  }, 100);
};
</script>

<template>
  <!-- 长列表无限滚动 -->
  <div>
    <slot></slot>
    <div ref="loadingTarget" class="py-4">
      <!-- 加载更多 -->
      <y-svg-icon
        v-show="loading"
        class="w-8 h-8 mx-auto animate-spin"
        name="IconLoading"
      ></y-svg-icon>
      <!-- 没有更多数据 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        后台已经没有更多数据！
      </p>
    </div>
  </div>
</template>

<style scoped></style>
