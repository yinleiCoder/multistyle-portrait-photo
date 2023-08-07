import "./assets/main.css";
import "./styles/element/index.scss";
import "./styles/tailwindcss/index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import customComponent from "./components/index";
import "virtual:svg-icons-register";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(customComponent); // 全局自动化组件注册
app.use(ElementPlus, {
  locale: zhCn,
});

app.mount("#app");
