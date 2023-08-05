<script setup>
import TheAvatar from "../components/TheAvatar.vue";
</script>

<template>
  <div>
    <div class="profileContainer">
      <TheAvatar
        class="userAvatar"
        :width="186"
        :height="186"
        :borderWidth="2"
      />
      <div class="profile">
        <p class="name">
          <span>尹磊</span>
          <router-link to="/profile/edit">编辑个人资料</router-link>
        </p>
        <p class="handle">@yin_lei</p>
        <div class="description">
          <pre>
                        98年骚男
                        毕业于计算机学院软件工程专业
                    </pre
          >
          <p class="website">https://www.yinlei.online/</p>
        </div>
      </div>
    </div>
    <div class="tabs">
      <div class="tab active">
        <p>我的</p>
      </div>
      <div class="tab">
        <p>赞过</p>
      </div>
      <div class="tab">
        <p>收藏</p>
      </div>
    </div>
    <div class="tabContent">
      <p>162条写真</p>
      <div class="posts">
        <img
          v-lazy
          src="https://img.zcool.cn/community/016ykrjhezviroy1fhqyrz3238.jpeg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp"
          alt=""
          class="postImage"
          v-for="n in 9"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.profileContainer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10vw;
}

.profileContainer .userAvatar {
  justify-self: end;
}

.profile .name {
  display: flex;
  align-items: center;
  column-gap: 20px;
}

.profile .name > span {
  font-size: 26px;
  font-weight: bold;
}

.profile .name > a {
  color: #000;
  border: 1px solid #000;
  border-radius: 8px;
  padding: 4px 6px;
  text-decoration: none;
  transition: all 0.3s;
}

.profile .name > a:hover {
  background: #000;
  color: #fff;
  box-shadow: 4px 6px 10px rgba(0, 0, 0, 0.3);
}

.profile .handle {
  margin-top: 4px;
  color: #84848484;
}

.profile .description {
  margin-top: 10px;
  margin-bottom: 10px;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(3, 88px);
  justify-content: center;
  margin-top: 7vmin;
  margin-bottom: 10px;
}

.tab {
  text-align: center;
  padding: 6px 0;
  cursor: pointer;
  border: 1px solid #000;
}

.tab.active {
  background: #000;
}

.tab:first-child {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-right: none;
}

.tab:last-child {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  border-left: none;
}

.tab.active > p {
  color: #fff;
}

.tabContent > p {
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.posts {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.postImage {
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
}
</style>
