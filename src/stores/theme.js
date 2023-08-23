import { defineStore } from "pinia";
import { ref } from "vue";
import { THEME_LIGHT } from "../constants";

export const useThemeStore = defineStore("theme", () => {
  // 当前主题类型
  const themeType = ref(THEME_LIGHT);

  function changeThemeType(newTheme) {
    themeType.value = newTheme;
  }

  return { themeType, changeThemeType };
}, {
  persist: true,
});
