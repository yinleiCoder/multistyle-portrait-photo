<script setup>
import SideBarMenu from "./SideBarMenu.vue";
</script>
<template>
  <div>
    <div class="flex justify-center items-center p-2 duration-500">
      <y-svg-icon name="IconLogo" class="w-12 h-12 duration-500"></y-svg-icon>
    </div>
    <el-scrollbar>
      <SideBarMenu></SideBarMenu>
    </el-scrollbar>
  </div>
</template>
