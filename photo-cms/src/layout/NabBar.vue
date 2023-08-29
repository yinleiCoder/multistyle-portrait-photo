<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const router = useRouter();
const handleLogout = () => {
  userStore.logout();
  router.replace("/login");
};
</script>
<template>
  <div class="w-full h-full shadow flex items-center px-2 box-border gap-2">
    <y-hamburger/>
    <y-breadcrumb/>
    <div class="ml-auto">
      <el-dropdown>
        <div>
          <el-avatar
            :size="40"
            shape="square"
            :src="userStore.avatar"
            class="mr-2"
          />
          <el-icon><Tools /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/">主页</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
