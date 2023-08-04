import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";

// 动态指定rem基准值
export const useREM = () => {
  const MAX_FONT_SIZE = 16;
  document.addEventListener("DOMContentLoaded", () => {
    const html = document.querySelector("html");
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize;
    html.style.fontSize = `${fontSize}px`;
  });
};

const { width } = useWindowSize();
// 判断当前是否是移动设备
export const isMobileTerminal = computed(() => {
  return width.value < 475;
});
