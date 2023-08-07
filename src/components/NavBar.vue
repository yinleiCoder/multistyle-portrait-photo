<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { useThemeStore } from "../stores/theme";
import { useSearchStore } from "../stores/search";
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "../constants";
import defaultAvatar from "../assets/defaultAvatar.png";

const userStore = useUserStore();
const themeStore = useThemeStore();
const searchStore = useSearchStore();
const router = useRouter();

// 输入框
const inputValue = ref("");
const onSearchHandle = (val) => {
  inputValue.value = val;
  if (val) {
    searchStore.addHistory(val);
    searchStore.changeSearchText(val);
  }
};
const onClearSearch = () => {
  searchStore.changeSearchText("");
};

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
    id: 0,
    title: "个人中心",
    icon: "IconProfile",
    path: "/profile",
  },
  {
    id: 1,
    title: "赞助",
    icon: "IconSupportMoney",
    path: "/sponsor",
  },
  {
    id: 2,
    title: "退出登录",
    icon: "IconLogout",
    path: "",
  },
];

const onUserItemClick = async (item) => {
  if (item.id === 2) {
    await userStore.logoutUser();
    router.replace("/login");
    return;
  }
  router.push(item.path);
};
</script>

<template>
  <nav
    class="w-full bg-white dark:bg-zinc-800 border-b-2 dark:border-b-zinc-700 px-6 py-2 flex items-center gap-4 duration-500"
  >
    <!-- logo -->
    <router-link
      to="/"
      class="flex items-center gap-1 cursor-pointer guide-home"
    >
      <y-svg-icon name="IconLogo" class="w-10 h-10"></y-svg-icon>
      <div
        class="inline-block font-semibold whitespace-nowrap dark:text-zinc-200 max-md:hidden"
      >
        人像匠心
      </div>
    </router-link>
    <!-- 输入框 -->
    <div class="w-full guide-search">
      <y-search
        v-model="inputValue"
        @search="onSearchHandle"
        @clear="onClearSearch"
      >
        <template #dropdown>
          <div>
            <!-- 搜索提示 -->
            <y-hint
              :searchText="inputValue"
              v-show="inputValue"
              @itemClick="onSearchHandle"
            ></y-hint>
            <!-- 搜索历史 -->
            <y-history
              v-show="!inputValue"
              @itemClick="onSearchHandle"
            ></y-history>
          </div>
        </template>
      </y-search>
    </div>
    <!-- 发布帖子 -->
    <router-link to="/posts/new"
      ><y-svg-icon
        class="guide-push w-6 h-6 cursor-pointer rounded-sm duration-500 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900 shrink-0"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
        name="IconPostEdit"
      ></y-svg-icon
    ></router-link>
    <!-- 主题设置 -->
    <y-popover placement="bottom-left">
      <template #reference>
        <y-svg-icon
          :name="svgIconName"
          class="guide-theme w-6 h-6 cursor-pointer rounded-sm duration-500 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900 shrink-0"
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
    <y-popover class="flex items-center shrink-0" placement="bottom-left">
      <template #reference>
        <div
          class="guide-my relative flex items-center p-0.5 rounded cursor-pointer duration-200 outline-none hover:bg-zinc-200 dark:hover:bg-zinc-900"
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
          @click="onUserItemClick(item)"
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
