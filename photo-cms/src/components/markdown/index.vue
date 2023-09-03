<script setup>
import { ref, onMounted } from "vue";
import TuiEditor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";

let tuiMarkdownEditor;
let el;
const initMarkdownEditor = () => {
  tuiMarkdownEditor = new TuiEditor({
    el,
    height: "500px",
    initialEditType: "markdown",
    previewStyle: "vertical",
  });
  tuiMarkdownEditor.getMarkdown();
};

onMounted(()=>{
    el = document.querySelector('#markdownBox')
    initMarkdownEditor()
})

const handleSubmitMarkdownContent = () => {};
</script>
<template>
  <div class="markdownContainer">
    <div id="markdownBox"></div>
    <div class="mt-2">
      <el-button type="primary" @click="handleSubmitMarkdownContent"
        >提交</el-button
      >
    </div>
  </div>
</template>
