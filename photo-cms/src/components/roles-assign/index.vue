<script setup>
import { ref, watch } from "vue";
import { roleListService } from "../../api/role";
import { getUserRolesService, updateUserRolesService } from "../../api/sys";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue", 'updateRole']);

const closed = () => {
  emits("update:modelValue", false);
};

const roleList = ref([]);
const getAllRoles = async () => {
  roleList.value = (await roleListService()).data;
  console.log((await roleListService()).data);
};
getAllRoles();

const currentUserRoles = ref([]);
const getUserRoles = async () => {
  const res = await getUserRolesService(props.uid);
  currentUserRoles.value = res.map(item => item.title)
};

const handleAssignRole = async () => {
    const roles = currentUserRoles.value.map(title => {
        return roleList.value.find(role => role.title === title)
    })
    const roleIds = roles.map(item => item._id)
    await updateUserRolesService(props.uid, roleIds)
    emits('updateRole')
    closed()
};

watch(
  () => props.uid,
  (val) => {
    if (val) {
      getUserRoles();
    }
  }
);
</script>
<template>
  <el-dialog title="角色分配" :model-value="modelValue" @close="closed">
    <el-checkbox-group v-model="currentUserRoles">
      <el-checkbox
        v-for="item in roleList"
        :key="item._id"
        :label="item.title"
      />
    </el-checkbox-group>
    <template #footer>
      <div>
        <el-button @click="closed">取消</el-button>
        <el-button type="primary" @click="handleAssignRole">分配</el-button>
      </div>
    </template>
  </el-dialog>
</template>
