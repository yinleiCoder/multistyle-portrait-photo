<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/user";

const activeTab = ref("User");
const userStore = useUserStore();
const sexIcon = computed(() => {
  return userStore.userRef.gender === "male" ? "Male" : "Female";
});
const sexIconColor = computed(() => {
  return userStore.userRef.gender === "male" ? "blue" : "red";
});
</script>
<template>
  <el-row>
    <el-col :span="6">
      <el-card>
        <div class="flex gap-3">
          <img
            :src="userStore.userRef.avatar"
            class="w-1/3 aspect-square object-cover rounded shadow-xl"
          />
          <div class="w-full flex flex-col gap-2">
            <p class="text-lg text-zinc-700 font-bold leading-4">
              <span>{{ userStore.userRef.username }}</span>
            </p>
            <p class="flex justify-between">
              <span class="text-sm text-zinc-400"
                >{{ userStore.userRef._id.slice(0, 6) }}...</span
              >
              <el-icon :color="sexIconColor"
                ><component :is="sexIcon"
              /></el-icon>
              <span class="text-sm bg-zinc-300 px-1 rounded text-white">{{
                userStore.userRef.location
              }}</span>
            </p>
            <p class="text-zinc-600">{{ userStore.userRef.headline }}</p>
            <a target="__blank" class="font-bold text-blue-500" :href="userStore.userRef.social_link"
              >通过星链了解Ta</a
            >
          </div>
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
</template>
