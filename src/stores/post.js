import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { loadPostsService } from "../api/post";

export const usePostStore = defineStore("post", () => {
  const postList = ref([]);
  const total = ref(-1);
  // 首页网络加载过了帖子详情，所以直接获取帖子
  const currentPostId = ref(null);

  async function loadAllPosts({ page, per_page, q }) {
    const posts = await loadPostsService(page, per_page, q);
    postList.value = posts.data;
    total.value = posts.total;
  }

  async function loadMorePosts({ page, per_page, q }) {
    const posts = await loadPostsService(page, per_page, q);
    postList.value.push(...posts.data);
  }

  const currentDetailPost = computed(() => {
    return postList.value.find((post) => post._id === currentPostId.value);
  });

  return {
    total,
    currentPostId,
    postList,
    loadAllPosts,
    loadMorePosts,
    currentDetailPost,
  };
});
