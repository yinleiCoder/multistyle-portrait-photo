<script>
const options = {
    aspectRatio: 1 / 1,
    crop(event) {
      console.log(event.detail.x);
      console.log(event.detail.y);
      console.log(event.detail.width);
      console.log(event.detail.height);
      console.log(event.detail.rotate);
      console.log(event.detail.scaleX);
      console.log(event.detail.scaleY);
    },
  }
</script>

<script setup>
import { ref, onMounted } from "vue";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";

defineProps({
  blob: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(['croppedImage'])

// 处理图片裁剪
let cropper;
const imageTarget = ref(null);
onMounted(() => {
  cropper = new Cropper(imageTarget.value, options);
});

// 拿到裁剪的图片
const onConfirmClick = () => {
    cropper.getCroppedCanvas().toBlob(blob => {
        emits('croppedImage', blob)
    })
};
</script>

<template>
  <div class="flex flex-col items-center">
    <img :src="blob" ref="imageTarget" />
    <y-button class="mt-4 w-[80%] xl:1/2" @click="onConfirmClick"
      >保存裁剪</y-button>
  </div>
</template>
