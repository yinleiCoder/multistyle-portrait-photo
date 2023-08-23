<script>
export default {
  name: 'PostList'
}
</script>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { usePostStore } from "../../stores/post";
import { useSearchStore } from "../../stores/search";
import { isMobileTerminal } from "../../utils/flexible";
import PostItem from "./item.vue";

const postStore = usePostStore();
const searchStore = useSearchStore();
const router = useRouter();

let query = {
  page: 1,
  per_page: 10,
  q: "",
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

const resetQuery = (newQuery) => {
  query = { ...query, ...newQuery };
  isFinished.value = false;
  postStore.postList = [];
};

watch(
  () => searchStore.searchText,
  (val) => {
    resetQuery({
      page: 1,
      q: val,
    });
    getPostsData();
  }
);

// 统一接管进入详情页，主动介入浏览器堆栈管理
const onGoToPostDetail = (data) => {
  postStore.currentPostId = data.postId;
  // 修改浏览器的URL并不会跳转页面
  // history.pushState(null, null, `/posts/${data.postId}`)
  router.push(`/posts/${data.postId}`);
};
</script>

<template>
  <y-infinite v-model="loading" :isFinished="isFinished" @onLoad="getPostsData">
    <y-waterfall
      class="w-full"
      :data="postStore.postList"
      nodeKey="_id"
      :column="isMobileTerminal ? 2 : 5"
      :picturePreReading="true"
    >
      <template v-slot="{ item, width, index }">
        <PostItem
          :post="item"
          :width="width"
          :key="item._id"
          @onGoPostDetail="onGoToPostDetail"
        />
      </template>
    </y-waterfall>
  </y-infinite>
</template>

<style scoped></style>
