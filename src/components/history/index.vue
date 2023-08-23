<script setup>
import { useSearchStore } from "../../stores/search";

const emits = defineEmits(["itemClick"]);

const searchStore = useSearchStore();

const onClearHistory = () => searchStore.deleteAllHistory();

const onDeleteHistoryItem = (index) => searchStore.deleteHistory(index);

const onHistoryItemSearch = (item) => {
  emits("itemClick", item);
};
</script>

<template>
  <div>
    <div class="flex items-center text-xs mb-2 text-zinc-400">
      <span>最近搜索</span>
      <y-svg-icon
        class="w-4 h-4 ml-1 p-0.5 cursor-pointer duration-300 rounded hover:bg-zinc-100"
        fillClass="fill-zinc-400"
        name="IconTrash"
        @click="onClearHistory"
      ></y-svg-icon>
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="(item, index) in searchStore.histories"
        :key="index"
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1 py-0.5 text-zinc-900 font-normal rounded duration-300 hover:bg-zinc-200"
        @click="onHistoryItemSearch(item)"
      >
        <span class="text-sm">{{ item }}</span>
        <y-svg-icon
          class="w-4 h-4 p-0.5 ml-1 duration-300 rounded hover:bg-zinc-100"
          name="IconDelete"
          @click.stop="onDeleteHistoryItem(index)"
        ></y-svg-icon>
      </div>
    </div>
  </div>
</template>
