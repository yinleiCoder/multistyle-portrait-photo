import { defineAsyncComponent } from "vue";

// 自定义插件，以便全局使用components下的组件，不用手动引入
export default {
  // 全局插件：https://cn.vuejs.org/guide/reusability/plugins.html
  install(app, options) {
    // app.component("y-svg-icon", SvgIcon);
    // app.component("y-popup", Popup);

    // 通过vite进行通用组件自动注册
    const components = import.meta.glob("./*/index.vue");
    for (const [fullPath, fn] of Object.entries(components)) {
      const componentName = `y-${fullPath.replace("./", "").split("/")[0]}`;
      app.component(componentName, defineAsyncComponent(fn));
    }
  },
};
