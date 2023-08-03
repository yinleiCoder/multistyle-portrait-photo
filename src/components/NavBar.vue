<script setup>
import { ref } from "vue";
import TheAvatar from "./TheAvatar.vue";
import { useUserStore } from "../stores/user";
import router from "../router";

const showDropdown = ref(false);
const userStore = useUserStore();

async function logout() {
  await userStore.logoutUser();
  router.push('/login')
}
</script>

<template>
  <nav class="navbar">
    <router-link to="/">
      <img src="../assets/logo.svg" alt="人像匠心" />
    </router-link>
    <div class="searchInput">
      <input type="text" />
      <y-svg-icon name="IconSearch"></y-svg-icon>
    </div>
    <div class="navItems">
      <button>
        <y-svg-icon name="IconPublish"></y-svg-icon>
      </button>
      <div class="profileDropDown">
        <TheAvatar :src="userStore.user.avatar" @click="showDropdown = !showDropdown" />
        <div
          class="dropdownMenu"
          v-if="showDropdown"
          @click="showDropdown = false"
        >
          <ul class="profileMenu">
            <li><router-link to="/profile">个人主页</router-link></li>
            <li @click="logout">退出登录</li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  width: 90vw;
  height: 60px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}

.navbar svg {
  width: 38px;
  height: 38px;
}

.navbar img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.searchInput {
  position: relative;
}

.searchInput input {
  width: 100%;
  padding: 12px;
  padding-left: 36px;
  border-radius: 8px;
  border: 1px solid #000;
  background-color: transparent;
  outline: none;
}

.searchInput > svg {
  position: absolute;
  height: 60%;
  top: 20%;
  left: 0;
}

.navItems {
  justify-self: end;
  display: flex;
  gap: 24px;
  align-items: center;
}

.navItems > button {
  border: none;
  background: none;
  cursor: pointer;
}

.profileDropDown {
  position: relative;
  cursor: pointer;
}

.profileMenu {
  position: absolute;
  width: max-content;
  padding: 24px 26px;
  list-style: none;
  background-color: #fff;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  right: 0;
  display: grid;
  row-gap: 18px;
  transform: translateY(18px);
}

.profileMenu::before {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  top: -12px;
  right: 10px;
  border-bottom: 12px solid #fff;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
}

.profileMenu a {
  text-decoration: none;
  cursor: pointer;
  color: #000;
}

.profileMenu a:visited {
  color: initial;
}
</style>
