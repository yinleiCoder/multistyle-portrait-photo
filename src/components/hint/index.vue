<script setup>
import { ref } from "vue";
import {watchDebounced} from '@vueuse/core'
import { loadInputHintService } from "../../api/post";

const props = defineProps({
  searchText: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["itemClick"]);

// 处理搜索提示的数据获取
const hintData = ref([]);
const getHintData = async () => {
  if (!props.searchText) return;
  const { total, data } = await loadInputHintService(props.searchText);
  hintData.value = data;
};

// 提示字点击
const onItemClick = (item) => {
  emits("itemClick", item);
};

// 关键字高亮
const highlightText = (text) => {
  const highlightStr = `<span class="text-red-400 dark:text-zinc-200 font-bold">${props.searchText}</span>`
  const re = new RegExp(props.searchText, 'gi')
  return text.replace(re, highlightStr)
}

watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  debounce: 1000,//防抖
});
</script>

<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      class="p-1 text-base text-zinc-500  rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      v-html="highlightText(item)"
      @click="onItemClick(item)"
    >
    </div>
  </div>
</template>
