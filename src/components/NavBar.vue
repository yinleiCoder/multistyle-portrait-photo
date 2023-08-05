<script setup>
import { ref, computed } from "vue";
import TheAvatar from "./TheAvatar.vue";
import defaultAvatar from "../assets/defaultAvatar.png";
import { useUserStore } from "../stores/user";
import { useThemeStore } from "../stores/theme";
import { useRouter } from "vue-router";
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "../constants";

const router = useRouter();
const userStore = useUserStore();
const themeStore = useThemeStore();

// 输入框
const inputValue = ref("");

// 主题
const themeArr = [
  {
    id: "0",
    type: THEME_LIGHT,
    icon: "IconThemeLight",
    name: "light",
  },
  {
    id: "1",
    type: THEME_DARK,
    icon: "IconDark",
    name: "dark",
  },
  {
    id: "2",
    type: THEME_SYSTEM,
    icon: "IconSystem",
    name: "system",
  },
];
// 1.监听主题的切换行为
// 2.根据行为保存当前需要展示的主题到状态管理中
const onItemClick = (themeItem) => {
  themeStore.changeThemeType(themeItem.type);
};
// 3.根据状态管理中保存的当前主题，展示当前主题下的显示图标
const svgIconName = computed(() => {
  const findTheme = themeArr.find((item) => {
    return item.type === themeStore.themeType;
  });
  return findTheme?.icon;
});
// 4.根据状态管理中保存的当前主题，修改html中的class进行tailwindcss darkmode切换

// 个人中心
const menuArr = [
  {
    id: "0",
    title: "个人资料",
    icon: "IconProfile",
    path: "/profile",
  },
  {
    id: "1",
    title: "升级vip",
    icon: "IconUpgradeVIP",
    path: "/member",
  },
  {
    id: "2",
    title: "退出登录",
    icon: "IconLogout",
    path: "",
  },
];

async function logout() {
  await userStore.logoutUser();
  router.push("/login");
}
</script>

<template>
  <nav
    class="w-full bg-white dark:bg-zinc-800 border-b-2 dark:border-b-zinc-700 px-6 py-2 flex items-center gap-2 duration-500"
  >
    <!-- logo -->
    <router-link to="/" class="flex items-center gap-1">
      <y-svg-icon name="IconLogo" class="w-10 h-10"></y-svg-icon>
      <div class="inline-block font-semibold whitespace-nowrap">人像匠心</div>
    </router-link>
    <!-- 输入框 -->
    <div class="w-full">
      <y-search v-model="inputValue">
        <template #dropdown>
          <div>
            <p>弹窗内容测试</p>
          </div>
        </template>
      </y-search>
    </div>
    <!-- 主题设置 -->
    <y-popover placement="bottom-left">
      <template #reference>
        <y-svg-icon
          :name="svgIconName"
          class="w-6 h-6 cursor-pointer rounded-sm duration-500 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></y-svg-icon>
      </template>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center cursor-pointer rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
          v-for="item in themeArr"
          :key="item.id"
          @click="onItemClick(item)"
        >
          <y-svg-icon
            :name="item.icon"
            class="w-4 h-4 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></y-svg-icon>
          <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
            item.name
          }}</span>
        </div>
      </div>
    </y-popover>
    <!-- 用户个人中心 -->
    <y-popover class="flex items-center" placement="bottom-left">
      <template #reference>
        <div
          class="relative flex items-center p-0.5 rounded cursor-pointer duration-200 outline-none hover:bg-zinc-200 dark:hover:bg-zinc-900"
        >
          <img
            v-lazy
            class="w-8 h-8 object-cover rounded"
            :src="userStore.user.avatar || defaultAvatar"
          />
          <y-svg-icon
            name="IconVIP"
            class="h-6 w-6 absolute right-[-25%] bottom-[-20%]"
          >
          </y-svg-icon>
        </div>
      </template>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center cursor-pointer rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
          v-for="item in menuArr"
          :key="item.id"
        >
          <y-svg-icon
            :name="item.icon"
            class="w-4 h-4 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></y-svg-icon>
          <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
            item.title
          }}</span>
        </div>
      </div>
      <!-- <li><router-link to="/profile">个人主页</router-link></li>
          <li @click="logout">退出登录</li> -->
    </y-popover>
  </nav>
</template>
