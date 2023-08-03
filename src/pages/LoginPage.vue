<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const isLogin = ref(true);

const username = ref("");
const password = ref("");

const userStore = useUserStore();
const router = useRouter();

async function register() {
  await userStore.registerUser({
    username: username.value,
    password: password.value,
  });
  router.replace("/");
}

async function login() {
  await userStore.loginUser({
    username: username.value,
    password: password.value,
  });
  router.replace("/");
}
</script>

<template>
  <div class="loginForm">
    <form @submit.prevent>
      <input type="text" placeholder="用户名" v-model="username" />
      <input type="password" placeholder="密码" v-model="password" />
      <button
        type="submit"
        class="loginButton"
        @click="isLogin ? login() : register()"
      >
        {{ isLogin ? "登录" : "注册" }}
      </button>
      <p @click="isLogin = !isLogin" class="info">
        {{ isLogin ? "还没有账号？点击注册" : "已有帐号？点击登录" }}
      </p>
    </form>
  </div>
</template>

<style scoped>
.loginForm > form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  align-items: center;
  height: 100vh;
}

.loginButton {
  background-color: #000;
  color: #fff;
  border-radius: 6px;
  padding: 6px 8px;
}
</style>
