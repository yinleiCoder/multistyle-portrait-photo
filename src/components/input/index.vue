<script>
//单行Input
const TYPE_TEXT = "text";
//多行Input
const TYPE_TEXTAREA = "textarea";
</script>
<script setup>
import { useVModel } from "@vueuse/core";
import { computed } from "vue";
const props = defineProps({
  modelValue: {
    // 双向绑定
    type: String,
    required: true,
    default: '',
  },
  type: {
    // input类型
    type: String,
    default: TYPE_TEXT,
  },
  max: {
    // 最大字符数
    type: [String, Number],
  },
});

const emits = defineEmits(["update:modelValue"]);

const text = useVModel(props);

const currentNumber = computed(() => {
  return text.value.length;
});

</script>

<template>
  <div class="relative leading-[0px]">
    <!-- 单行 -->
    <input
      v-if="type === TYPE_TEXT"
      type="text"
      v-model="text"
      :maxlength="max"
      class="border-zinc-800 dark:border-zinc-400 dark:bg-zinc-800 duration-300 dark:text-zinc-200 border-2 outline-0 py-0.5 px-1 text-base rounded-md focus:border-red-300 w-full caret-orange-300"
    />
    <!-- 多行 -->
    <textarea
      v-if="type === TYPE_TEXTAREA"
      class="border-zinc-800 dark:border-zinc-400 dark:bg-zinc-800 duration-300 dark:text-zinc-200 border-2 outline-0 py-0.5 px-1 text-base rounded-md focus:border-red-300 w-full caret-orange-300"
      v-model="text"
      rows="3"
      :maxlength="max"
    ></textarea>
    <!-- 最大字符数 -->
    <span
      v-if="max"
      class="absolute right-2 bottom-1 text-zinc-400 text-sm"
      :class="{ 'text-red-600': currentNumber === parseInt(max) }"
    >{{ currentNumber }}/{{ max }}</span>
  </div>
</template>
