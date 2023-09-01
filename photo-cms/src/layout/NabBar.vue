<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const router = useRouter();

// 用户的主动退出
const handleLogout = () => {
  userStore.logout();
  router.replace("/login");
};
</script>
<template>
  <div class="w-full h-full flex items-center px-2 box-border gap-2">
    <y-hamburger/>
    <y-breadcrumb/>
    <div class="ml-auto flex items-center gap-4">
      <y-search/>
      <y-screenfull/>
      <y-lang-select/>
      <el-dropdown>
        <div>
          <el-avatar
            :size="40"
            shape="square"
            :src="userStore.userRef.avatar "
            class="mr-1"
          />
          <el-icon><Tools /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/">{{ $t('message.navBar.home') }}</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout"
              >{{ $t('message.navBar.logout') }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
