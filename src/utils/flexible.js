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
