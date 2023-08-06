<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrMsg,
  defineRule,
} from "vee-validate";
import { useRecaptchaProvider, useChallengeV3 } from "vue-recaptcha";
import { useUserStore } from "../stores/user";
import { LOGIN_TYPE_USERNAME } from "../constants";

onMounted(() => {
  useRecaptchaProvider();
});

const isLogin = ref(true);

const loginForm = ref({
  username: "",
  password: "",
  confirmPassword: "",
});

const userStore = useUserStore();
const router = useRouter();

const challengeV3Response = ref();
const challengeV3Verified = computed(() => !!challengeV3Response.value);
const onLoginHandle = async () => {
  if (isLogin.value) {
    await userStore.loginUser({
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME,
    });
  } else {
    await userStore.registerUser({
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME,
    });
  }
  router.replace("/");
};

const validateUsername = (val) => {
  if (!val) {
    return "用户名为必填项";
  }
  if (val.length < 2 || val.length > 10) {
    return "2到10位普通字符";
  }
  return true;
};
const validatePassword = (val) => {
  if (!val) {
    return "密码为必填项";
  }
  if (val.length < 6 || val.length > 16) {
    return "6到16位密码，字母加数字";
  }
  return true;
};
const validateConfirmPassword = (confirmPassword, passwords) => {
  if (!confirmPassword) {
    return "确认密码为必填项";
  }
  if (confirmPassword !== passwords[0]) {
    return "两次输入的密码必须一致";
  }
  return true;
};
defineRule("validateConfirmPassword", validateConfirmPassword);


</script>

<template>
  <div
    class="relative h-screen bg-white dark:zinc-800 text-center xl:bg-zinc-200 flex justify-center items-center"
  >
    <div
      class="block px-3 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:py-4 xl:rounded xl:shadow-lg"
    >
      <div class="flex items-center justify-center gap-x-1 mb-4">
        <y-svg-icon name="IconLogo" class="w-12 h-12"></y-svg-icon>
        <span class="text-lg font-bold">人像匠心</span>
      </div>
      <VeeForm @submit="onLoginHandle">
        <VeeField
          type="text"
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 mb-4 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          placeholder="用户名"
          v-model="loginForm.username"
          name="username"
          autocomplete="on"
          :rules="validateUsername"
        />
        <VeeErrMsg
          name="username"
          class="text-sm mb-2 text-left block text-red-600"
        />
        <VeeField
          type="password"
          class="mb-4 dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          placeholder="密码"
          v-model="loginForm.password"
          name="password"
          autocomplete="on"
          :rules="validatePassword"
        />
        <VeeErrMsg
          name="password"
          class="text-sm mb-2 text-left block text-red-600"
        />
        <VeeField
          v-if="!isLogin"
          type="password"
          class="mb-4 dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900"
          placeholder="确认密码"
          v-model="loginForm.confirmPassword"
          name="confirmPassword"
          autocomplete="on"
          rules="validateConfirmPassword:@password"
        />
        <VeeErrMsg
          v-if="!isLogin"
          name="confirmPassword"
          class="text-sm mb-2 text-left block text-red-600"
        />
        <p
          @click="isLogin = !isLogin"
          class="pb-6 leading-[0px] text-right cursor-pointer hover:text-red-400 text-sm duration-300"
        >
          {{ isLogin ? "还没有账号？点击注册" : "已有帐号？点击登录" }}
        </p>
        <ChallengeV3 v-model="challengeV3Response" action="submit">
          <y-button class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800">{{
            isLogin ? "登录" : "注册"
          }}</y-button>
        </ChallengeV3>
        <div>response: {{ challengeV3Response }}</div>
      </VeeForm>
      <!-- 第三方登录 -->
      <div class="flex justify-around mt-4" v-if="isLogin">
        <!-- QQ -->
        <y-svg-icon class="cursor-pointer w-10 h-10" name="IconQQ"></y-svg-icon>
        <!-- wechat -->
        <y-svg-icon
          class="cursor-pointer w-10 h-10"
          name="IconWechat"
        ></y-svg-icon>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
