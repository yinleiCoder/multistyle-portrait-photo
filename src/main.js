import "./assets/main.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import "./styles/element/index.scss";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { useREM } from "./utils/flexible";
import customComponent from "./components/index";
import 'virtual:svg-icons-register'
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
useREM();
app.use(customComponent);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
