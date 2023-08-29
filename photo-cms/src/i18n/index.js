import { createI18n } from "vue-i18n";
import zhLocale from "./lang/zh";
import enLocale from "./lang/en";
// 1. Ready translated locale messages
// The structure of the locale message is the hierarchical object structure with each locale as the top property
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
// 2. Create i18n instance with options
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale,
  fallbackLocale: "en",
  messages,
});

export default i18n;
