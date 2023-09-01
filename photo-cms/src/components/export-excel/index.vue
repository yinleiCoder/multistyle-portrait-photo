<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { getUserListService } from "../../api/sys";

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const i18n = useI18n();
const exportDefaultName = i18n.t("message.excel.defaultFileName");
const excelName = ref(exportDefaultName);

const loading = ref(false);

const closed = () => {
  emits("update:modelValue", false);
};

const onConfirm = async () => {
  loading.value = true;
  const userList = await getUserListService({
    page: 1,
    pageSize: 100,
  });
  const excelHelper = await import('./help')
  const data = formatJson(userList.data)
  excelHelper.export_json_to_excel({
    //表头
    // 数据
    header: ['xx', 'xx', 'xx', 'xx', 'xx', 'xx', 'xx'],
    data,
    // 文件名
    filename: excelName.value || exportDefaultName
  })
  closed();
};

const formatJson = (rows) => {
  // 转为二维数组
  return rows.map(item => {
    return Object.keys(item).map(key => {
      return item[key]
    })
  })
}
</script>
<template>
  <el-dialog
    :title="$t('message.excel.exportTitle')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('message.excel.placeholder')"
    ></el-input>
    <template #footer>
      <div>
        <el-button @click="closed">{{ $t("message.excel.close") }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t("message.excel.confirm")
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>
