import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", () => {
  const histories = ref([]);
  const searchText = ref("");

  // 新增搜索历史
  function addHistory(newHistory) {
    const isFindIndex = histories.value.findIndex(
      (item) => item === newHistory
    );
    if (isFindIndex !== -1) {
      histories.value.splice(isFindIndex, 1);
    }
    histories.value.unshift(newHistory);
  }

  // 单个删除
  function deleteHistory(index) {
    histories.value.splice(index, 1);
  }

  // 全部删除
  function deleteAllHistory() {
    histories.value = [];
  }

  // 多组件联动，修改search text
  function changeSearchText(newSearchText) {
    searchText.value = newSearchText;
  }

  return {
    searchText,
    histories,
    addHistory,
    deleteHistory,
    deleteAllHistory,
    changeSearchText,
  };
});
