<script>
// 解决慢速移动时气泡消失
const DELAY_TIME = 1000;
//1.指定展示所选位置的常量
const PROP_TOP_LEFT = "top-left";
const PROP_TOP_RIGHT = "top-right";
const PROP_BOTTOM_LEFT = "bottom-left";
const PROP_BOTTOM_RIGHT = "bottom-right";
const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT,
];
</script>

<script setup>
import { ref, watch, nextTick } from "vue";
const isVisible = ref(false);
let timeout;
const onMouseenter = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
  isVisible.value = true;
};
const onMouseleave = () => {
  timeout = setTimeout(() => {
    isVisible.value = false;
    timeout = null;
  }, DELAY_TIME);
};

//2.通过prop控制指定位置
const props = defineProps({
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val);
      if (!result) {
        throw new Error(
          `传入的placement必须是${placementEnum.join("、")}里的一个`
        );
      }
      return result;
    },
  },
});
//3.获取元素的dom计算位置
const referenceTarget = ref(null);
const contentTarget = ref(null);
const useElementSize = (target) => {
  if (!target) return {};
  return {
    width: target.offsetWidth,
    height: target.offsetHeight,
  };
};
//4.生成气泡的样式对象
const contentStyle = ref({
  top: 0,
  left: 0,
});
//5.根据prop计算样式对象
// 气泡展示时再计算位置
watch(isVisible, (val) => {
  if (!val) return;
  nextTick(() => {
    switch (props.placement) {
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0;
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + "px";
        break;
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0;
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + "px";
        break;
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + "px";
        contentStyle.value.left =
          -useElementSize(contentTarget.value).width + "px";
        break;
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top =
          useElementSize(referenceTarget.value).height + "px";
        contentStyle.value.left =
          useElementSize(referenceTarget.value).width + "px";
        break;
      default:
        break;
    }
  });
});
</script>

<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <!-- 具名插槽：触发弹层的视图 -->
      <slot name="reference" />
    </div>
    <Transition name="slide">
      <div
        ref="contentTarget"
        v-if="isVisible"
        class="absolute p-2 z-20 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-lg"
        :style="contentStyle"
      >
        <!-- 匿名插槽：弹出层中要展示的内容 -->
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
