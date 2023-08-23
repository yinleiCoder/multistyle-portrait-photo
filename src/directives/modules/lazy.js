import { useIntersectionObserver } from "@vueuse/core";

// 图片懒加载(vue3自定义指令)， 也可以改用写图片懒加载SDK利用data-xx配合vueuse懒加载图片
export default {
  // 在用户无法看到图片时不加载图片，可以看到图片时再去加载图片
  mounted(el) {
    // 1.拿到当前img的src
    const imgSrc = el.src;
    // 2.清空src
    el.src = "";
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 3.图片可见，加载图片
        el.src = imgSrc;
        // 4.停止监听
        stop();
      }
    });
  },
};
