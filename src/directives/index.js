import lazy from "./modules/lazy";

// 自定义指令，全局使用
export default {
  install(app) {
    const directives = import.meta.globEager("./modules/*.js");
    for (const [key, value] of Object.entries(directives)) {
      const arr = key.split("/");
      const name = arr[arr.length - 1].replace(".js", "");
      app.directive(name, value.default);
    }
  },
};
