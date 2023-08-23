<script setup>
import { onMounted } from "vue";
import { driver } from "driver.js";
import steps from "./steps";
import { USER_FEEDBACK_LINK } from "../../constants";

let driverObj = null;
onMounted(() => {
  driverObj = driver({
    showProgress: true,
    allowClose: true,
    nextBtnText: "下一步",
    prevBtnText: "上一步",
    doneBtnText: "已完成",
    steps,
  });

});

// 开始功能引导
const onStartGuide = () => {
    driverObj.drive();
}

// 用户反馈
const onGoToFeedback = () => {
  window.open(USER_FEEDBACK_LINK, '_blank')
}
</script>
<template>
  <div class="fixed bottom-10 right-8">
    <!-- 引导页 -->
    <div
      class="guide-btn w-8 h-8 mb-2 bg-white dark:bg-zinc-800 border border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-300 hover:shadow-lg group"
      @click="onStartGuide"
    >
      <y-svg-icon
        name="IconGuide"
        class="w-6 h-6"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
      ></y-svg-icon>
    </div>
    <!-- 反馈页 -->
    <y-popover class="flex items-center" placement="top-left">
      <template #reference>
        <div
          class="guide-feedback w-8 h-8 mb-2 bg-white dark:bg-zinc-800 border border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-300 hover:shadow-lg group"
        >
          <y-svg-icon
            name="IconFeedback"
            class="w-6 h-6"
          ></y-svg-icon>
        </div>
      </template>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          @click="onGoToFeedback"
        >
          <y-svg-icon
            name="IconAvatarBoy21"
            class="w-6 h-6 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></y-svg-icon>
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">吐槽反馈</span>
        </div>
      </div>
    </y-popover>
  </div>
</template>
