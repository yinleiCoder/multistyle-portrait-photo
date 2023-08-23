<script setup>
import { ref, onMounted, watch } from "vue";
import request from "../api/ajax.js";
import { getToken } from "../utils/token";
import { updateUserInfoService, getUserInfoService } from "../api/user";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

onMounted(async () => {
  // 先查用户的详细信息再更新到userStore()中
  userStore.updateUserInfo(await getUserInfoService(userStore.user._id));
});

// 头像上传
const isDialogVisible = ref(false);
const imageUrl = ref(userStore.user.avatar);
const avatarTarget = ref(null); // 调用element ui 手动上传文件
const currentBlob = ref("");

const handleAvatarSelectedChange = (uploadFile, uploadFiles) => {
  const blob = URL.createObjectURL(uploadFile.raw);
  currentBlob.value = blob;
  isDialogVisible.value = true;
};

const handleCroppedImage = (blob) => {
  isDialogVisible.value = false;
  // 把数据上传到后端拿到url
  avatarTarget.value.handleStart(blob);
  avatarTarget.value.submit();
};

const handleAvatarSuccess = (response, uploadFile) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw)
  imageUrl.value = response.url;
};

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    console.error("Avatar picture must be JPG / png format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    console.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

// 数据本地的双向同步
const changeStoreUserInfo = (key, value) => {
  userStore.updateUserInfo({
    ...userStore.user,
    [key]: value,
  });
};

watch(imageUrl, (newImg) => {
  changeStoreUserInfo("avatar", newImg);
});

// 发送保存的数据到服务器
const changeProfileToServer = async () => {
  updateUserInfoService(userStore.user);
};
</script>

<template>
  <div class="h-screen box-border">
    <div
      class="relative max-w-screen-lg mx-auto xl:px-4 p-2 md:border md:rounded-md md:shadow-xl md:translate-y-[30%]"
    >
      <div
        class="h-full w-full text-base max-sm:mt-8 xl:text-center flex gap-10 items-center max-md:flex-col max-md:items-start"
      >
        <!-- 头像 -->
        <div
          class="relative w-[50px] h-[50px] md:w-[100px] md:h-[100px] group xl:cursor-pointer max-md:mb-4"
        >
          <img
            :src="imageUrl"
            class="rounded-full shrink-0 object-cover shadow-2xl w-full h-full block animate-bounce"
            :alt="userStore.user.username"
          />
          <el-upload
            ref="avatarTarget"
            class="avatar-uploader"
            :action="request.defaults.baseURL + '/upload'"
            :headers="{ Authorization: `Bearer ${getToken()}` }"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="handleAvatarSelectedChange"
            :auto-upload="false"
          >
            <el-button
              type="primary"
              class="bg-black hover:bg-transparent hover:text-black hover:border hover:border-black duration-300"
              >更换头像</el-button
            >
          </el-upload>
        </div>
        <div class="flex-1 grid grid-cols-1  sm:grid-cols-[auto_1fr] gap-2 max-md:w-full">
          <!-- 用户信息 -->
          <span class="block font-normal dark:text-zinc-300 xl:mb-0"
            >用户名</span
          >
          <y-input
            class="flex-1"
            max="10"
            :modelValue="userStore.user.username"
            @update:modelValue="changeStoreUserInfo('username', $event)"
          ></y-input>
          <span
            class="block font-normal whitespace-nowrap dark:text-zinc-300 xl:mb-0"
            >简介</span
          >
          <y-input
            class="flex-1"
            max="50"
            type="textarea"
            :modelValue="userStore.user.headline"
            @update:modelValue="changeStoreUserInfo('headline', $event)"
          ></y-input>
          <span
            class="block font-normal whitespace-nowrap dark:text-zinc-300 xl:mb-0"
            >地址</span
          >
          <y-input
            class="flex-1"
            max="10"
            :modelValue="userStore.user.location"
            @update:modelValue="changeStoreUserInfo('location', $event)"
          ></y-input>
          <span
            class="block font-normal whitespace-nowrap dark:text-zinc-300 xl:mb-0"
            >社交链</span
          >
          <y-input
            class="flex-1"
            max="10"
            :modelValue="userStore.user.social_link"
            @update:modelValue="changeStoreUserInfo('social_link', $event)"
          ></y-input>
          <span
            class="block font-normal whitespace-nowrap dark:text-zinc-300 xl:mb-0"
            >性别</span
          >
          <div class="genderRadios">
            <input type="radio" name="gender" id="M" value="M" />
            男
            <input type="radio" name="gender" id="F" value="F" />
            女
          </div>
          <!-- 保存修改 -->
          <y-button
            class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800"
            @click="changeProfileToServer"
            >保存</y-button
          >
        </div>
      </div>
    </div>
  </div>
  <y-dialog title="裁剪头像" v-model="isDialogVisible">
    <y-cropper
      :blob="currentBlob"
      @croppedImage="handleCroppedImage"
    ></y-cropper>
  </y-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
