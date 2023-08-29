<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

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
  <el-breadcrumb separator="/" class="">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
        :to="{ path: `${item.path}` }"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </transition-group>
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