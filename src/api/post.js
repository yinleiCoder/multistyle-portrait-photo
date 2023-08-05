import request from "./ajax";

// 加载全部帖子
export async function loadPostsService(page=1, per_page=10, q='') {
  const posts = await request.get(
    `/rest/posts?page=${page}&per_page=${per_page}&q=${q}`
  );
  return posts;
}

// 获取搜索提示
export async function loadInputHintService(q, page=1, per_page=10, ) {
  const result = await request.get(
    `/rest/posts?page=${page}&per_page=${per_page}&q=${q}`
  );
  const tips = {};
  tips.total = result.total;
  tips.data = result.data.map((post) => post.title);
  return tips;
}
