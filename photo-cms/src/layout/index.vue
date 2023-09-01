<script setup>
import { onMounted, computed } from "vue";
import { useUserStore } from "../stores/user";
import { useAppStore } from "../stores/app";
import NabBar from "./NabBar.vue";
import SideBar from "./SideBar/index.vue";
import Main from "./Main.vue";

const userStore = useUserStore();
const appStore = useAppStore();

onMounted(async () => {
  await userStore.getUserInfo();
});

const asideWidth = computed(() => {
  return appStore.sidebarOpened ? "180px" : "64px";
});
</script>
<template>
  <div class="box relative w-full h-screen">
    <el-container style="height: 100vh">
      <el-aside :width="asideWidth" class="duration-500">
        <SideBar />
      </el-aside>
      <el-container>
        <el-header>
          <NabBar />
        </el-header>
        <el-main>
          <y-tags />
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
:deep(.el-header),
:deep(.el-main) {
  margin: 0;
  padding: 0;
}

:deep(.el-aside) {
  background-color: #f2b9b2;
  color: #000;
}

:deep(.el-menu) {
  border-right: none;
}

:deep(.el-breadcrumb) {
  font-size: 12px !important;
}
</style>
