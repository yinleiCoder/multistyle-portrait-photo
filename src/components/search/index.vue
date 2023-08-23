<script setup>
import { ref, watch } from "vue";
import { useVModel, onClickOutside } from "@vueuse/core";

// 1.输入内容实现双向数据绑定
// 2.输入按钮在hover时展示
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const inputValue = useVModel(props);

const emits = defineEmits([
  "update:modelValue",
  "search",
  "clear",
  "input",
  "focus",
  "blur",
]);

// 3.一键清空文本功能
const onClearClick = () => {
  inputValue.value = "";
  emits("clear", "");
};

// 4.触发搜索
const onSearchHandle = () => {
  emits("search", inputValue.value);
};

// 5.控制下拉展示区的展示
const isFocus = ref(false);
const containerTarget = ref(null);
const onFocusHandle = () => {
  isFocus.value = true;
  emits("focus");
};
onClickOutside(containerTarget, () => {
  isFocus.value = false;
});

// 6.事件处理
const onBlurHandle = () => {
  emits("blur");
};

watch(inputValue, (val) => {
  emits("input", val);
});
</script>

<template>
  <div
    class="group relative rounded-xl border-black dark:border-zinc-200 duration-300 "
    ref="containerTarget"
  >
    <!-- 搜索框 -->
    <div>
      <y-svg-icon
        class="w-4 h-4 absolute translate-y-[-50%] top-[50%] left-4"
        name="IconSearch"
      ></y-svg-icon>
      <input
        class="block w-full h-[44px] pl-10 outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide font-normal text-sm border border-zinc-100 dark:border-zinc-700 focus:border-green-400 duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700"
        type="text"
        placeholder="搜索"
        v-model="inputValue"
        @keyup.enter="onSearchHandle"
        @focus="onFocusHandle"
        @blur="onBlurHandle"
      />
      <y-svg-icon
        class="h-4 w-4 absolute translate-y-[-50%] top-[50%] right-12 cursor-pointer duration-500"
        name="IconDelete"
        v-show="inputValue"
        @click="onClearClick"
      ></y-svg-icon>
      <div
        class="opacity-0 h-[55%] w-[1px] absolute translate-y-[-50%] top-[50%] right-[70px] duration-500 bg-gray-300 group-hover:opacity-100"
      ></div>
      <y-button
        class="opacity-0 absolute translate-y-[-50%] top-[50%] right-3 rounded-full duration-500 group-hover:opacity-100"
        icon="IconSearch"
        iconColor="#fff"
        @click="onSearchHandle"
      ></y-button>
    </div>
    <!-- 下拉区 -->
    <Transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-3000 hover:shadow-2xl"
      >
        <slot name="dropdown"></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
