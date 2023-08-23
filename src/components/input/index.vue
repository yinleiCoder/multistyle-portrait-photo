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
    default: "",
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
      class="duration-300 outline-0 dark:bg-zinc-500 p-1 text-base rounded-md bg-zinc-100 w-full"
    />
    <!-- 多行 -->
    <textarea
      v-if="type === TYPE_TEXTAREA"
      class="duration-300 outline-0 dark:bg-zinc-500 p-1 text-base rounded-md bg-zinc-100 w-full"
      v-model="text"
      rows="3"
      :maxlength="max"
    ></textarea>
    <!-- 最大字符数 -->
    <span
      v-if="max"
      class="absolute right-2 bottom-1 text-zinc-400 text-sm"
      :class="{ 'text-red-600': currentNumber === parseInt(max) }"
      >{{ currentNumber }}/{{ max }}</span
    >
  </div>
</template>
