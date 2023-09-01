<script setup>
import { ref } from "vue";
const activeTab = ref("User");
</script>
<template>
  <!-- <span>{{ $t('message.hello') }}</span> -->
  <div class="">
    <el-row>
      <el-col :span="6">
        <el-card>
          <div v-for="o in 4" :key="o" class="text item">
            {{ "List item " + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" class="pl-2">
        <el-card>
          <el-tabs v-model="activeTab" type="border-card">
            <el-tab-pane label="User" name="User">User</el-tab-pane>
            <el-tab-pane label="Config" name="Config">Config</el-tab-pane>
            <el-tab-pane label="Role" name="Role">Role</el-tab-pane>
            <el-tab-pane label="Task" name="Task">Task</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped></style>
