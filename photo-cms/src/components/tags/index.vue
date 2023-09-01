<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "../../stores/app";
import ContextMenu from "./ContextMenu.vue";
import { genMenui18nTitle } from "../../utils/i18n.js";

const isVisible = ref(false);
const appStore = useAppStore();
const route = useRoute();

const isActive = (tag) => {
  return tag.path === route.path;
};

const handleCloseTag = (index) => {
  appStore.removeTags({
    type: "index",
    index,
  });
};

const contextMenuStyle = ref({
  left: 0,
  top: 0,
});
const selectedIndex = ref(0);
const handleOpenMenu = (e, index) => {
  const { x, y } = e;
  contextMenuStyle.value.left = x + "px";
  contextMenuStyle.value.top = y + "px";
  selectedIndex.value = index;
  isVisible.value = true;
};

const closeMenu = () => {
  isVisible.value = false;
};

watch(isVisible, (val) => {
  if (val) {
    document.body.addEventListener("click", closeMenu);
  } else {
    document.body.removeEventListener("click", closeMenu);
  }
});
</script>
<template>
  <div class="p-2 border-b flex items-center gap-2">
    <router-link
      v-for="(tag, index) in appStore.tagsViewList"
      :key="tag.fullPath"
      :to="{ path: tag.fullPath }"
      class="flex items-center border p-1 rounded duration-200 relative"
      :class="{
        'bg-zinc-800': isActive(tag),
        'text-white': isActive(tag),
        'bg-zinc-200/70': !isActive(tag),
      }"
      @contextmenu.prevent="handleOpenMenu($event, index)"
      ><span>{{ genMenui18nTitle(tag.meta.title) }}</span
      ><el-icon
        class="ml-1"
        v-show="!isActive(tag)"
        @click.prevent.stop="handleCloseTag(index)"
        ><CircleClose /></el-icon
    ></router-link>
    <ContextMenu
      v-show="isVisible"
      :style="contextMenuStyle"
      :index="selectedIndex"
    ></ContextMenu>
  </div>
</template>
