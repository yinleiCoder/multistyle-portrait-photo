<script setup>
import { ref, watch, onUnmounted, computed } from "vue";
import dayjs from "./time";

// 倒计时组件
const props = defineProps({
  time: {
    type: Number,
    required: true,
  },
  format: {
    //dayjs
    type: String,
    default: "HH:mm:ss",
  },
});

const emits = defineEmits(["finish", "change"]);

const duration = ref(0);
const INTERVAL_DURATION = 1000;

// 开始倒计时
let interval;
const start = () => {
  close();
  interval = setInterval(() => {
    durationFn();
  }, INTERVAL_DURATION);
};

// 执行倒计时
const durationFn = () => {
  duration.value -= INTERVAL_DURATION;
  emits("change");
  if (duration.value <= 0) {
    duration.value = 0;
    emits("finish");
    close();
  }
};

// 显示的时间格式
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format);
});

// 结束倒计时
const close = () => {
  if (interval) {
    clearInterval(interval);
  }
};

onUnmounted(() => {
  close();
});

watch(
  () => props.time,
  (newTime) => {
    duration.value = newTime;
    start();
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <slot>
      <p class="font-bold text-2xl text-red-600">{{ showTime }}</p>
    </slot>
  </div>
</template>
