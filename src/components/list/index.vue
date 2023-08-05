<script setup>
import { ref, onMounted, watch } from "vue";
import { usePostStore } from "../../stores/post";
import PostItem from "./item.vue";
import { isMobileTerminal } from "../../utils/flexible";

const postStore = usePostStore();

let query = {
  page: 1,
  per_page: 10,
};

onMounted(() => {
  // getPostsData();
});

const loading = ref(false);
const isFinished = ref(false);
const getPostsData = async () => {
  if (isFinished.value) return;
  if (postStore.postList.length > 0) {
    query.page += 1;
  }
  if (query.page === 1) {
    postStore.loadAllPosts(query);
  } else {
    postStore.loadMorePosts(query);
  }
  if (postStore.postList.length === postStore.total) {
    isFinished.value = true;
  }
  loading.value = false;
};
</script>

<template>
  <y-infinite v-model="loading" :isFinished="isFinished" @onLoad="getPostsData">
    <y-waterfall
      class="px-1 w-full"
      :data="postStore.postList"
      nodeKey="_id"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="true"
    >
      <template v-slot="{ item, width, index }">
        <PostItem :post="item" :width="width" :key="item._id" />
      </template>
    </y-waterfall>
  </y-infinite>
</template>

<style scoped></style>
