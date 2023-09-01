<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { genMenui18nTitle } from "../../utils/i18n.js";
/**
 * 动态面包屑：
 * 1. 创建、渲染基本的面包屑组件
 * 2. 计算面包屑的数据结构
 * 3. 根据数据渲染动态面包屑
 */
const route = useRoute();
const breadcrumbData = ref([]);
const generateBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  );
};

watch(
  route,
  () => {
    generateBreadcrumbData();
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <el-breadcrumb separator="/">
    <TransitionGroup name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
        :to="{ path: `${item.path}` }"
        >{{ genMenui18nTitle(item.meta.title) }}</el-breadcrumb-item
      >
    </TransitionGroup>
  </el-breadcrumb>
</template>
<style scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
