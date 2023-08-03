<script setup>
import {ref} from 'vue'
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";

const isVisual = ref(false)
const onShowPopup = () => {
  isVisual.value = true 
}
</script>

<template>
  <div>
    <y-popup v-model="isVisual">
      <div>测试弹窗内容</div>
      <div>测试弹窗内容</div>
      <div>测试弹窗内容</div>
      <div>测试弹窗内容</div>
    </y-popup>
    <PostList>
      <PostItem @click="onShowPopup" v-for="n in 10" />
    </PostList>
  </div>
</template>

<style scoped></style>
