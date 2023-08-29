<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAppStore } from "../../stores/app";
import { filterRoutes, generateMenus } from "../../utils/route";
import SideBarItem from "./SideBarItem.vue";

const appStore = useAppStore();
const router = useRouter();
const route = useRoute();
const routes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes());
  return generateMenus(fRoutes);
});
// console.log(JSON.stringify(routes.value, null, 2));
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});
</script>
<template>
  <el-menu
    :default-active="activeMenu"
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