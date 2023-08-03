<script setup>
import { watch } from "vue";
import { useScrollLock } from "@vueuse/core";
const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean,
  },
});

const emits = defineEmits(["update:modelValue"]);

// 锁定滚动
const isLocked = useScrollLock(document.body);
watch(
  () => props.modelValue,
  (val) => {
    isLocked.value = val;
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <Teleport to="body">
    <!-- 蒙版 -->
    <Transition name="fade">
      <div
        v-if="modelValue"
        class="mask"
        @click="emits('update:modelValue', false)"
      ></div>
    </Transition>
    <!-- 内容 -->
    <Transition name="popup-down-up">
      <div v-if="modelValue" class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0" v-bind="$attrs">
        <slot></slot>
      </div>
    </Transition>
  </Teleport>
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

.mask {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 40;
  position: fixed;
  top: 0;
  left: 0;
}

.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
