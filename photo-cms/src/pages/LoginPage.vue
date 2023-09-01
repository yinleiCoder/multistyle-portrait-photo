<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { useI18n } from "vue-i18n";

const userStore = useUserStore();
const router = useRouter();
const i18n = useI18n()

const loginForm = ref({
  username: "尹磊",
  password: "123456",
});

// 表单校验
const validatePass = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error(i18n.t("message.login.passwordRule")));
  } else {
    callback();
  }
};
const loginRules = ref({
  username: [{ required: true, message: i18n.t('message.login.usernameRule'), trigger: "blur" }],
  password: [{ required: true, trigger: "blur", validator: validatePass }],
});

const loading = ref(false);
const loginFormRef = ref(null);
const handleLogin = () => {
  // 1.进行表单校验
  loginFormRef.value.validate((valid) => {
    if (!valid) return;
    // 2.触发登录动作
    loading.value = true;
    userStore
      .login(loginForm.value)
      .then(() => {
        loading.value = false;
        // 3.登录后处理
        router.replace("/");
      })
      .catch((err) => {
        ElMessage.error(err);
        loading.value = false;
      });
  });
};
</script>
<template>
  <div
    class="w-full h-screen bg-gray-200 overflow-hidden flex justify-center items-center"
  >
    <el-form
      ref="loginFormRef"
      class="w-[500px] max-w-full p-2"
      :model="loginForm"
      :rules="loginRules"
    >
      <el-form-item prop="username">
        <el-icon><User /></el-icon>
        <el-input
          v-model="loginForm.username"
          class="flex-1"
          placeholder="用户名"
          name="username"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-icon><Lock /></el-icon>
        <el-input
          v-model="loginForm.password"
          class="flex-1"
          placeholder="密码"
          name="password"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button
          class="w-full"
          type="primary"
          :loading="loading"
          @click="handleLogin"
          >{{ $t("message.login.btnTitle") }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
:deep(.el-form-item__content) {
  gap: 8px;
}
</style>
