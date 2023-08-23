<script setup>
import { useVModel } from "@vueuse/core";

const props = defineProps({
  // 控制开关
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: String,
  cancelText: {
    type: String,
    default: "取消",
  },
  confirmText: {
    type: String,
    default: "确定",
  },
  cancelHandler: {
    type: Function,
  },
  confirmHandler: {
    type: Function,
  },
  close: {
    type: Function,
  },
});

const emits = defineEmits(["update:modelValue"]);

// 控制dialog是否显示
const isVisible = useVModel(props);

const onCancelClick = () => {
  if (props.cancelHandler) {
    props.cancelHandler();
  }
  close();
};
const onConfirmClick = () => {
  if (props.confirmHandler) {
    props.confirmHandler();
  }
  close();
};

const onClose = () => {
  isVisible.value = false;
  if (props.close) {
    props.close();
  }
};
</script>

<template>
  <div>
    <!-- 蒙版 -->
    <Transition name="fade">
      <div
        v-if="isVisible"
        @click="onClose"
        class="w-screen h-screen bg-zinc-900/80 z-50 fixed top-0 left-0"
      ></div>
    </Transition>
    <!-- 内容区 -->
    <Transition name="fade">
      <div
        v-if="isVisible"
        class="overflow-x-hidden fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 px-1 py-1 rounded border bg-white dark:bg-zinc-800"
      >
        <div v-if="title" class="text-lg text-zinc-900 mb-2">{{ title }}</div>
        <div class="text-base text-zinc-900 mb-2">
          <slot></slot>
        </div>
        <div v-if="cancelHandler || confirmHandler" class="flex justify-end">
          <y-button type="info" class="mr-2" @click="onCancelClick">
            {{ cancelText }}
          </y-button>
          <y-button type="primary" @click="onConfirmClick">
            {{ confirmText }}
          </y-button>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
