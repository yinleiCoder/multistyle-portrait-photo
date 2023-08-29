import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from "./App.vue";
import router from "./router";
import customComponent from "./components/index";
import "virtual:svg-icons-register";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./styles/tailwindcss/index.css";
import "./styles/element/index.scss";
import "./styles/index.scss";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
app.use(pinia);
app.use(router);
app.use(customComponent);
app.use(ElementPlus, {
  locale: zhCn,
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
