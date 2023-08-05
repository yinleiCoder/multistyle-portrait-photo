import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { loadPostsService } from "../api/post";

export const usePostStore = defineStore("post", () => {
  const postList = ref([]);
  const total = ref(-1);

  async function loadAllPosts({ page, per_page, q }) {
    const posts = await loadPostsService(page, per_page, q);
    postList.value = posts.data;
    total.value = posts.total;
  }

  async function loadMorePosts({ page, per_page, q }) {
    const posts = await loadPostsService(page, per_page, q);
    postList.value.push(...posts.data);
  }

  return { total, postList, loadAllPosts, loadMorePosts };
});
