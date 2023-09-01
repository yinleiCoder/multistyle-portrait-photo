import { createI18n } from "vue-i18n";
import zhLocale from "./lang/zh";
import enLocale from "./lang/en";

const messages = {
  en: {
    message: {
      ...enLocale
    },
  },
  zh: {
    message: {
      ...zhLocale 
    },
  },
};

const locale = "zh";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale,
  fallbackLocale: "en",
  messages,
});

export default i18n;
