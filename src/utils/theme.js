import { watch } from "vue";
import { useThemeStore } from "../stores/theme";
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "../constants";

// 监听系统主题变更
let matchMedia;
const watchSystemThemeChange = () => {
  if (matchMedia) return;
  matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM);
  };
};

// 通过tailwindcss变更主题
const changeTheme = (theme) => {
  // html的class
  let themeClassName = "";
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = "light";
      break;
    case THEME_DARK:
      themeClassName = "dark";
      break;
    case THEME_SYSTEM:
      watchSystemThemeChange();
      themeClassName = matchMedia.matches ? "dark" : "light";
      break;
  }
  // 这是tailwindcss手动改变主题的方式
  document.querySelector("html").className = themeClassName;
};

// 初始化主题并监听状态管理中的主题改变
export default () => {
  const themeStore = useThemeStore();
  // 1.当主题发生改变/进入web时，可以进行html tailwindcss darkmode配置
  watch(() => themeStore.themeType, changeTheme, {
    immediate: true,
  });
};
