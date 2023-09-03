<script setup>
import { ref } from "vue";

const title = ref("");
const activeName = ref("markdown");
</script>
<template>
  <el-card>
    <el-input
      v-model="title"
      placeholder="文章标题"
      maxlength="20"
      clearable
    ></el-input>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Markdown" name="markdown">
        <y-markdown />
      </el-tab-pane>
      <el-tab-pane label="Editor" name="editor">
        <y-editor />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
