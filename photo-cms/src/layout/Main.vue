<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "../stores/app";
import { isTags } from "../utils/tags";

const appStore = useAppStore();
const route = useRoute();

const getTitle = (route) => {
  let title = "";
  if (!route.meta) {
    const pathArr = route.path.split("/");
    title = pathArr[pathArr.length - 1];
  } else {
    title = route.meta.title;
  }
  return title;
};

watch(
  route,
  (to, from) => {
    if (!isTags(to.path)) return;
    const { fullPath, meta, name, params, path, query } = to;
    appStore.addTag({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to),
    });
  },
  {
    immediate: true,
  }
);

watch(appStore.language, (val) => {
  appStore.tagsViewList.forEach((route, index) => {
    appStore.translateTags({
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    })
  });
}, {
  immediate: true,
})
</script>
<template>
  <router-view v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <KeepAlive>
        <div :key="route.name" class="p-2">
          <component :is="Component" :key="route.path" />
        </div>
      </KeepAlive>
    </Transition>
  </router-view>
</template>
<style scoped>
.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>