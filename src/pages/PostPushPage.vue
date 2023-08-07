<script lang="ts" setup>
import { ref } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";

const postForm = ref({
  title: "",
  content: "",
  images: [],
});

const beforeImgsUpload = (rawFile) => {
  if (
    rawFile.type !== "image/jpeg" &&
    rawFile.type !== "image/png" &&
    rawFile.type !== "image/gif"
  ) {
    console.error("图片格式必须是JPEG、PNG或GIF!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 10) {
    console.error("单个图片文件不能大于10M");
    return false;
  }
  return true;
};
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};
const handlePreview = (file) => {
  console.log(file);
};
</script>
<template>
  <div class="w-full h-[calc(100vh-60px)] dark:bg-zinc-800">
    <div class="w-full mx-auto relative p-3 flex flex-col gap-2">
      <span class="font-bold">标题</span>
      <y-input max="20" v-model="postForm.title"></y-input>
      <span class="font-bold">正文内容</span>
      <y-rich-text-editor></y-rich-text-editor>
      <!-- <y-input
        class=""
        max="100"
        v-model="postForm.content"
        type="textarea"
      ></y-input> -->
      <span class="font-bold">上传图片</span>
      <el-upload
        class="postUpload"
        drag
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
        list-type="picture"
        :limit="50"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-upload="beforeImgsUpload"
        accept="image/jpeg,image/png,image/gif"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖拽图片到这里或 <span class="font-bold">点击上传</span>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            请上传JPEG、PNG、GIF等类型图片且单个图片不要大于10M，其他格式图片及文件会上传失败！
          </div>
        </template>
      </el-upload>
    </div>
  </div>
</template>

<style scoped></style>
