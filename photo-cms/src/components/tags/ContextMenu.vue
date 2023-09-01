<script setup>
import { useRouter } from "vue-router";
import { useAppStore } from "../../stores/app";
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const appStore = useAppStore();

const onRefreshClick = () => {
  router.go(0);
};
const onCloseRightClick = () => {
    appStore.removeTags({
        type: 'right',
        index: props.index
    })
};
const onCloseOtherClick = () => {
    appStore.removeTags({
        type: 'other',
        index: props.index
    })
};
</script>
<template>
  <ul
    class="border p-2 flex flex-col gap-1 rounded shadow text-sm absolute bg-white cursor-pointer z-50"
  >
    <li @click="onRefreshClick">刷新</li>
    <li @click="onCloseRightClick">关闭右侧</li>
    <li @click="onCloseOtherClick">关闭其他</li>
  </ul>
</template>
