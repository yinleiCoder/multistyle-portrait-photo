<script setup>
import SideBarMenu from "./SideBarMenu.vue";
import {useAppStore} from '../../stores/app'

const appStore = useAppStore();

</script>
<template>
  <div>
    <div class="flex justify-center items-center p-4">
      <y-svg-icon name="IconLogo" class="w-12 h-12"></y-svg-icon>
      <span v-if="appStore.sidebarOpened" class="font-bold ml-1">人像匠心</span>
    </div>
    <el-scrollbar>
      <SideBarMenu></SideBarMenu>
    </el-scrollbar>
  </div>
</template>
