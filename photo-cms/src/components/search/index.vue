<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { filterRoutes } from "../../utils/route";
import path from "path-browserify";
import Fuse from "fuse.js";

const isShow = ref(false);
const search = ref("");
const searchOptions = ref([]);
const router = useRouter();
const searchSelectRef = ref(null);

const generateRoutesForFuseData = (
  routes,
  basePath = "/",
  prefixTitle = []
) => {
  let res = [];
  for (const route of routes) {
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle],
    };
    const re = /.*\/:.*/;
    if (route.meta && route.meta.title && !re.exec(route.path)) {
      // i18n.global.t(`msg.route.{route.meta.title})
      data.title = [...data.title, route.meta.title]; // i18n...
      res.push(data);
    }
    if (route.children) {
      const tempRoutes = generateRoutesForFuseData(
        route.children,
        data.path,
        data.title
      );
      if (tempRoutes.length > 0) {
        res = [...res, ...tempRoutes];
      }
    }
  }
  return res;
};
const searchPool = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes());
  console.log(generateRoutesForFuseData(fRoutes));
  return generateRoutesForFuseData(fRoutes);
});
const fuse = new Fuse(searchPool.value, {
  shouldSort: true,
  minMatchCharLength: 1,
  keys: [
    {
      name: "title",
      weight: 0.7,
    },
    {
      name: "path",
      weight: 0.3,
    },
  ],
});

const handleShowClick = () => {
  isShow.value = !isShow.value;
};

const handleQuerySearch = (query) => {
  if (query) {
    searchOptions.value = fuse.search(query);
  } else {
    searchOptions.value = [];
  }
};
const handleSelectChange = (val) => {
  router.push(val.path);
};

const onClose = () => {
  searchSelectRef.value.blur();
  isShow.value = false;
  searchOptions.value = [];
};

watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener("click", onClose);
  } else {
    document.body.removeEventListener("click", onClose);
  }
});
</script>
<template>
  <div class="cursor-pointer flex gap-1 items-center">
    <y-svg-icon
      name="IconSearch"
      class="w-6 h-6"
      @click.stop="handleShowClick"
    ></y-svg-icon>
    <el-select
      v-if="isShow"
      ref="searchSelectRef"
      v-model="search"
      filterable
      remote
      default-first-option
      :remote-method="handleQuerySearch"
      @change="handleSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join('>')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>
