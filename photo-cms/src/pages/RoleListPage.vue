<script setup>
import { ref, onMounted } from "vue";
import { roleListService } from "../api/role";

const roleList = ref([]);
const getRoleList = async () => {
  roleList.value = (await roleListService()).data;
};

onMounted(() => {
  getRoleList();
});

const dialogVisible = ref(false);
const selectedRoleId = ref("")
const handlePermissionAssign = (row) => {
  dialogVisible.value = true;
  selectedRoleId.value = row._id
};
</script>
<template>
  <div>
    <el-card>
      <el-table :data="roleList" border style="width: 100%">
        <el-table-column prop="_id" label="角色ID" align="center" />
        <el-table-column prop="title" label="角色名称" align="center" />
        <el-table-column prop="describe" label="角色描述" align="center" />
        <el-table-column label="角色操作" align="center" #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="handlePermissionAssign(row)"
            >分配权限
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <y-permission-assign v-model="dialogVisible" :roleId="selectedRoleId" />
  </div>
</template>
