<script setup>
import {ref} from 'vue'
import { ElMessage } from 'element-plus'
const onSuccess = ({header, bodys}) => {
    console.log(bodys)
    // todo: upload excel data to server
    ElMessage({
    message: '上传成功',
    type: 'success',
  })
}
</script>
<template>
    <y-upload-excel :onSuccess="onSuccess"/>
</template>