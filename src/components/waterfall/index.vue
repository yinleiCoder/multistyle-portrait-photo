<script>
export default {
  name: "waterfall",
};
</script>

<script setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from "vue";
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  nodeKey: {
    type: String,
  },
  column: {
    default: 2,
    type: Number,
  },
  columnSpacing: {
    default: 10,
    type: Number,
  },
  rowSpacing: {
    default: 10,
    type: Number,
  },
  picturePreReading: {
    type: Boolean,
    default: true,
  },
});

// 1.瀑布流总高度=最高的列的高度
const containerHeight = ref(0);
// 记录每列高度的容器
const columnHeightObj = ref({});
const useColumnHeightObj = () => {
  columnHeightObj.value = {};
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0;
  }
};
// 2.容器实例
const containerTarget = ref(null);
// 容器总宽度 不包含padding margin border
const containerWidth = ref(0);
// 容器的左边距
const containerLeft = ref(0);
// 3.计算容器宽度
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  );
  containerLeft.value = parseFloat(paddingLeft);
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight);
};
// 4.计算每列列宽
const columnWidth = ref(0);
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columnSpacing;
});
const useColumWidth = () => {
  useContainerWidth();
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column;
};

onMounted(() => {
  useColumWidth();
});

// 5.items高度集合
const getImageElems = (itemElems) => {
  const imageElems = [];
  itemElems.forEach((el) => {
    imageElems.push(...el.getElementsByTagName("img"));
  });
  return imageElems;
};

const getAllImage = (imageElems) => {
  return imageElems.map((imageElem) => {
    return imageElem.src;
  });
};

const onCompleteImgs = (imgs) => {
  const promiseAll = [];
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      const imageObj = new Image();
      imageObj.src = img;
      imageObj.onload = () => {
        resolve({
          img,
          index,
        });
      };
    });
  });
  return Promise.all(promiseAll);
};

let itemHeights = [];
// 图片预加载
const waitImageComplete = () => {
  itemHeights = [];
  let itemElems = [...document.getElementsByClassName("y-waterfall-item")];
  const imageElems = getImageElems(itemElems);
  const allImgs = getAllImage(imageElems);
  onCompleteImgs(allImgs).then(() => {
    itemElems.forEach((el) => {
      itemHeights.push(el.offsetHeight);
    });
    useItemLocation();
  });
};

// 不需要图片预加载
const useItemHeight = () => {
  itemHeights = [];
  let itemElems = [...document.getElementsByClassName("y-waterfall-item")];
  itemElems.forEach(() => {
    itemHeights.push(el.offsetHeight);
  });
  useItemLocation();
};

// 返回下一个item的top
const getItemTop = () => {
  return getMinHeight(columnHeightObj.value);
};

// 返回下一个item的left
const getItemLeft = () => {
  // 拿到最小宽度的列
  const column = getMinHeightColumn(columnHeightObj.value);
  return (
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  );
};

const getMinHeightColumn = (columnHeightObj) => {
  // 拿到最小的高度
  const minHeight = getMinHeight(columnHeightObj);
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight;
  });
};

const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj);
  return Math.min(...columnHeightArr);
};

const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj);
  return Math.max(...columnHeightArr);
};

// 计算每个item的位置
const useItemLocation = () => {
  props.data.forEach((item, index) => {
    // 避免重复计算
    if (item._style) return;
    item._style = {};
    item._style.left = getItemLeft();
    item._style.top = getItemTop();
    // 指定列高度自增
    increasingHeight(index);
  });
  // 指定容器的高度
  containerHeight.value = getMaxHeight(columnHeightObj.value);
};

// 指定列高度自增
const increasingHeight = (index) => {
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value);
  columnHeightObj.value[minHeightColumn] +=
    itemHeights[index] + props.rowSpacing;
};

watch(
  () => props.data,
  (newVal) => {
    nextTick(() => {
      const resetColumnHeight = newVal.every((item) => !item._style);
      if (resetColumnHeight) {
        useColumnHeightObj();
      }
      if (props.picturePreReading) {
        waitImageComplete();
      } else {
        useItemHeight();
      }
    });
  },
  {
    deep: true,
    immediate: true,
  }
);

// 重新构建瀑布流
const reset = () => {
  setTimeout(() => {
    useColumWidth();
    props.data.forEach((item) => {
      item._style = null;
    });
  }, 100);
};

// 监听列数的变化实现响应式
watch(
  () => props.column,
  () => {
    columnWidth.value = 0;
    reset();
  }
);

onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style;
  });
});
</script>

<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{
      height: containerHeight + 'px',
    }"
  >
    <!-- 数据渲染 -->
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="y-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px',
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
    <!-- 加载中 -->
    <div v-else>加载中....</div>
  </div>
</template>
