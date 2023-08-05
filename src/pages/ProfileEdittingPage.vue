<script setup>
import { ref } from "vue";
import request from "../api/ajax.js";
import { getToken } from "../utils/token";
import TheAvatar from "../components/TheAvatar.vue";
import TheButton from "../components/TheButton.vue";
// 头像上传
const imageUrl = ref("");

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

// 写真照片上传
const fileList = ref([
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};
</script>

<template>
  <div>
    <h2 class="title">编辑个人资料</h2>
    <form class="profileForm">
      <div class="changeAvatar">
        <TheAvatar :src="imageUrl" :width="48" :height="48" />
        <el-upload
          class="avatar-uploader"
          :action="request.defaults.baseURL + '/upload'"
          :headers="{ Authorization: `Bearer ${getToken()}` }"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button type="primary">更换头像</el-button>
        </el-upload>
      </div>
      <label for="username">用户名：</label>
      <input type="text" />
      <label for="name">昵称：</label>
      <input type="text" />
      <label for="intro">简介：</label>
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <label for="mobilePhone">手机号: </label>
      <input type="text" />
      <label for="sex">性别：</label>
      <div class="genderRadios">
        <input type="radio" name="gender" id="M" value="M" />
        男
        <input type="radio" name="gender" id="F" value="F" />
        女
      </div>
      <label for="website">网站：</label>
      <input type="text" />
      <label for="website">照片墙:</label>
      <div>
        <el-upload
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img v-lazy w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>
      <div class="actions">
        <TheButton type="reset" reverse>取消</TheButton>
        <TheButton type="submit">确认</TheButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.changeAvatar {
  display: flex;
  align-items: center;
  position: relative;
  column-gap: 10px;
}

.profileForm {
  display: grid;
  grid-template-columns: max-content 1fr;
  row-gap: 10px;
  margin-top: 10px;
}

.profileForm > label {
  grid-column: 1/2;
  justify-self: end;
  position: relative;
  top: 6px;
}

.profileForm .actions {
  grid-column: 1/3;
  justify-self: end;
  display: flex;
  gap: 10px;
}

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
