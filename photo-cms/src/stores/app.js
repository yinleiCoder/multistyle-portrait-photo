import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore(
  "app",
  () => {
    const sidebarOpened = ref(true);
    const language = ref("zh");
    const tagsViewList = ref([]);

    function triggerSidebarOpened() {
      sidebarOpened.value = !sidebarOpened.value;
    }

    function setLanguage(lang) {
      language.value = lang;
    }

    function addTag(tag) {
      const isFind = tagsViewList.value.find((item) => {
        return item.path === tag.path;
      });
      if (!isFind) {
        tagsViewList.value.push(tag);
      }
    }

    function removeTags(payload) {
      if (payload.type === "index") {
        tagsViewList.value.splice(payload.index, 1);
      } else if (payload.type === "other") {
        tagsViewList.value.splice(
          payload.index + 1,
          tagsViewList.value.length - payload.index + 1
        );
        tagsViewList.value.splice(0, payload.index);
      } else if (payload.type === "right") {
        tagsViewList.value.splice(
          payload.index + 1,
          tagsViewList.value.length - payload.index + 1
        );
      }
    }

    return {
      sidebarOpened,
      language,
      tagsViewList,
      setLanguage,
      triggerSidebarOpened,
      addTag,
      removeTags
    };
  },
  {
    persist: true,
  }
);
