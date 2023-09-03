<script setup>
import { ref, watch } from "vue";
import { priorityListService, rolePrioritiesService } from "../../api/priority";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  roleId: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const closed = () => {
  emits("update:modelValue", false);
};

const permissionList = ref([]);
const getPermissionList = async () => {
  permissionList.value = (await priorityListService()).data;
};
getPermissionList();

const treeRef = ref(null);
const defaultProps = {
  children: "children",
  label: "name",
};

const getRolePermission = async () => {
  const checkedKeys = (await rolePrioritiesService(props.roleId)).priorities;
  treeRef.value.setCheckedKeys(checkedKeys);
};

const handleAssignPermission = async () => {
  // 改完后台后再来做RBAC
  closed();
};

watch(
  () => props.roleId,
  (val) => {
    if (val) {
      getRolePermission();
    }
  }
);
</script>
<template>
  <el-dialog title="权限分配" :model-value="modelValue" @close="closed">
    <el-tree
      ref="treeRef"
      :data="permissionList"
      :props="defaultProps"
      @node-click="id"
      show-checkbox
      check-strictly
      default-expand-all
    />
    <template #footer>
      <div>
        <el-button @click="closed">取消</el-button>
        <el-button type="primary" @click="handleAssignPermission"
          >分配</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>
