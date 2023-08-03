<script>
import { computed } from "vue";
const typeEnum = {
  primary: "txt-white bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700",
  main: "text-white bg-main dark:bg-zinc-900 hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700",
  info: "text-zinc-800 dark:text-zinc-300 bg-zinc-200  dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700",
};
const sizeEnum = {
  default: {
    button: "w-8 h-8 text-base",
    icon: "",
  },
  "icon-default": {
    button: "w-8 h-8",
    icon: "w-4 h-4",
  },
  small: {
    button: "w-7 h-3 text-base",
    icon: "",
  },
  "icon-small": {
    button: "w-3 h-3",
    icon: "w-1.5 h-1.5",
  },
};
</script>
<script setup>
// 1. 构建type风格可选项和size大小
// 2. 通过props让开发者控制按钮
// 4. 依据当前数据，实现视图
const props = defineProps({
  icon: String,
  iconColor: String,
  iconClass: String,
  type: {
    type: String,
    default: "main",
    validator(val) {
      const keys = Object.keys(typeEnum);
      const isValid = keys.includes(val);
      if (!isValid) {
        throw new Error(`传入的type必须是${keys.join("、")}中的一个`);
      }
      return isValid;
    },
  },
  size: {
    type: String,
    default: "default",
    validator(val) {
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes("icon"));
      const isValid = keys.includes(val);
      if (!isValid) {
        throw new Error(`传入的size必须是${keys.join("、")}中的一个`);
      }
      return isValid;
    },
  },
  isActiveAnim: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
// 3. 区分icon button和text button
const sizeKey = computed(() => {
  return props.icon ? `icon-${props.size}` : props.size;
});

// 5. 处理点击事件
const emits = defineEmits(['click'])
const onBtnClick = () => {
  if(props.loading) return
  emits('click')
}
</script>

<template>
  <button
    class="text-sm text-center rounded duration-500 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      {
        'active:scale-105': isActiveAnim,
      },
    ]"
    @click.stop="onBtnClick"
  >
    <y-svg-icon
      v-if="loading"
      name="IconLoading"
      class="w-2 h-2 animate-spin mr-1"
    ></y-svg-icon>
    <y-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></y-svg-icon>
    <slot v-else/>
  </button>
</template>

<style scoped></style>
