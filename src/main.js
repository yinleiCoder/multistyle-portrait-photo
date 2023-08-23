import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./styles/element/index.scss";
import "./styles/tailwindcss/index.scss";
import "driver.js/dist/driver.css";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createHead } from "@unhead/vue";
import { VueRecaptchaPlugin } from "vue-recaptcha";
import { useREM } from "./utils/flexible";
import useTheme from "./utils/theme";
import customComponent from "./components/index";
import "virtual:svg-icons-register";
import customDirective from "./directives/index";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
useREM();
useTheme();
app.use(customComponent);
app.use(customDirective);
app.use(ElementPlus);
app.use(createHead());
app.use(VueRecaptchaPlugin, {
  v3SiteKey: "6LdDWoQnAAAAAC5jdVS3cHg15CAKmp2r5hK2mQm-",
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
