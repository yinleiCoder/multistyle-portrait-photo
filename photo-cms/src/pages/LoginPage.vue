<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const loginForm = ref({
  username: "尹磊哥哥",
  password: "123456",
});

const validatePass = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error("密码不能少于6位"));
  } else {
    callback();
  }
};
// 表单校验
const loginRules = ref({
  username: [{ required: true, message: "用户名为必填项", trigger: "blur" }],
  password: [{ required: true, trigger: "blur", validator: validatePass }],
});

const loading = ref(false);
const loginFormRef = ref(null);

const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (!valid) return;
    loading.value = true;
    userStore
      .login(loginForm.value)
      .then(() => {
        loading.value = false;
        router.replace('/')
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
      class="w-[520px] max-w-full p-2"
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
          >登 录</el-button
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
