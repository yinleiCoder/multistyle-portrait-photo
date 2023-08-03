<script setup>
import TheAvatar from "../components/TheAvatar.vue";
</script>

<template>
  <div class="postItem">
    <img
      src="https://img.zcool.cn/community/01c15d64a23ed1000cd3100090a88f.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp"
      alt=""
    />
    <div class="postInfo">
      <div class="postDesc">
        <p>啦啦啦</p>
      </div>
      <div class="postMeta">
        <div class="userInfo">
          <TheAvatar class="avatar" />
          <span class="username">yin lei</span>
        </div>
        <span class="postPubDate">刚刚发布</span>
        <div class="postActions">
          <span>99w Likes</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.postInfo {
  padding: 12px;
}

.postItem {
  border: 2px solid #000;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.postItem > img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  cursor: pointer;
}

.postMeta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "user actions"
    "pubDate actions";
  row-gap: 6px;
}

.postMeta .userInfo {
  grid-area: user;
  display: flex;
  align-items: center;
  column-gap: 10px;
}

.postMeta .userInfo .username {
  font-weight: bold;
  font-size: 1rem;
}

.postMeta .postPubDate {
  grid-area: pubDate;
  color: #9f9f9f;
  font-size: 14px;
}

.postActions {
  grid-area: actions;
  justify-self: end;
}

.postDesc {
  white-space: pre-line;
}
</style>
