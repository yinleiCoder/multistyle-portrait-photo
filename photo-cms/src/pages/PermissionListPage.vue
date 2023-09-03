<script setup>
import { ref, onMounted } from "vue";
import { priorityListService } from "../api/priority";

const priorityList = ref([]);
const getPermissionList = async () => {
  priorityList.value = (await priorityListService()).data;
};
onMounted(() => {
  getPermissionList();
});
</script>
<template>
  <el-card>
    <el-table
      :data="priorityList"
      style="width: 100%; margin-bottom: 20px"
      row-key="_id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
    <el-table-column prop="name" label="权限名称" sortable />
      <el-table-column prop="_id" label="权限ID" sortable />
      <el-table-column prop="mark" label="权限标识" sortable />
      <el-table-column prop="describe" label="权限描述" sortable />
    </el-table>
  </el-card>
</template>