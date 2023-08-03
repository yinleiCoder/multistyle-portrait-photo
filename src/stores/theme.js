import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "../constants";

export const useThemeStore = defineStore("theme", () => {
  const themeType = ref(THEME_LIGHT);

  function changeThemeType(newTheme) {
    themeType.value = newTheme;
  }

  return { themeType, changeThemeType };
});
