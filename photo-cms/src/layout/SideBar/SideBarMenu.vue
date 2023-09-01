<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAppStore } from "../../stores/app";
import { filterRoutes, generateMenus } from "../../utils/route";
import SideBarItem from "./SideBarItem.vue";

const appStore = useAppStore();
const route = useRoute();
const router = useRouter();

const routes = computed(() => {
  // 获取完整的结构化路由表
  const fRoutes = filterRoutes(router.getRoutes());
  return generateMenus(fRoutes);
});
// 默认激活项
const activeMenuItem = computed(() => {
  const { path } = route;
  return path;
});
</script>
<template>
  <el-menu
    :default-active="activeMenuItem"
    unique-opened
    :collapse="!appStore.sidebarOpened"
    background-color="#f2b9b2"
    text-color="#000"
    active-text-color="#fff"
    router
  >
    <SideBarItem v-for="item in routes" :key="item.path" :route="item" />
  </el-menu>
</template>