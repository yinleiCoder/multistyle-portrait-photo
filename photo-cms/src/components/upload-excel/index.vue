<script setup>
import { ref } from "vue";
import * as XLSX from "xlsx";
import { ElMessage } from "element-plus";
import { getHeaderRow, isExcel } from "./parse";

const props = defineProps({
  //上传前回调
  beforeUpload: Function,
  //上传后回调
  onSuccess: Function,
});

const loading = ref(false);
const excelUploadTarget = ref(null);

const handleUploadExcel = () => {
  excelUploadTarget.value.click();
};

const handleUploadChange = (e) => {
  const files = e.target.files;
  const rawFile = files[0];
  if (!rawFile) return;
  upload(rawFile);
};

// 异步读取excel数据
const readerData = (rawFile) => {
  loading.value = true;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // 1. 获取到解析后的数据
      const data = e.target.result;
      // 2. 利用XLSX对数据进行解析
      const workBook = XLSX.read(data, { type: "array" });
      // 3. 获取第一张sheet名称
      const firstSheetName = workBook.SheetNames[0];
      // 4. 读取sheet1的数据
      const workSheet = workBook.Sheets[firstSheetName];
      // 5. 解析数据表头
      const header = getHeaderRow(workSheet);
      // 6. 解析数据体
      const bodys = XLSX.utils.sheet_to_json(workSheet);
      // 7. 传入解析后的数据
      generateData({
        header,
        bodys,
      });
      // 8. 处理loading
      loading.value = false;
      // 9. 处理成功的回调
      resolve();
    };
    reader.readAsArrayBuffer(rawFile);
  });
};

const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData);
};

const upload = (rawFile) => {
  excelUploadTarget.value.value = null;
  if (!props.beforeUpload) {
    readerData(rawFile);
    return;
  }
  const beforeHandler = props.beforeUpload(rawFile);
  if (beforeHandler) {
    readerData(rawFile);
  }
};

const handleDrop = (e) => {
  if (loading.value) return;
  const files = e.dataTransfer.files;
  if (files.length !== 1) {
    ElMessage.error("必须要有一个文件");
    return;
  }
  const rawFile = files[0];
  if (!isExcel(rawFile)) {
    ElMessage.error("必须是excel文件");
    return;
  }
  upload(rawFile);
};
const handleDragover = (e) => {
  e.dataTransfer.dropEffect = "copy";
};
</script>
<template>
  <div class="w-full flex justify-center items-center gap-2">
    <div
      class="flex-1 py-20 flex justify-center items-center border border-main border-dashed rounded"
    >
      <el-button :loading="loading" type="primary" @click="handleUploadExcel">{{
        $t("message.uploadExcel.upload")
      }}</el-button>
      <input
        ref="excelUploadTarget"
        class="relative hidden"
        type="file"
        accept=".xlsx, .xls"
        @change="handleUploadChange"
      />
    </div>
    <div
      class="flex-1 py-20 flex flex-col justify-center items-center border border-main border-dashed rounded"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <el-icon><UploadFilled /></el-icon>
      {{ $t("message.uploadExcel.drop") }}
    </div>
  </div>
</template>
