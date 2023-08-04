import request from "./ajax";

export async function loadPostsService(page, per_page) {
  const posts = await request.get(
    `/rest/posts?page=${page}&per_page=${per_page}&q=`
  );
  return posts;
}
