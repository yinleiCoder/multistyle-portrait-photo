<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useAppStore } from "../../stores/app";

const appStore = useAppStore();
const i18n = useI18n();

const language = computed(() => appStore.language);
const handleModifyLanguage = (lang) => {
  i18n.locale.value = lang;
  appStore.setLanguage(lang);
};
</script>
<template>
  <el-dropdown trigger="click" @command="handleModifyLanguage">
    <div>
      <el-tooltip content="国际化" effect="light">
        <y-svg-icon name="IconLang" class="w-6 h-6 hover:bg-zinc-200 duration-300 rounded"/>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >简体中文</el-dropdown-item
        >
        <el-dropdown-item divided :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
