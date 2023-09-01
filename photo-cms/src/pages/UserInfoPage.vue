<script setup>
import { ref, onMounted } from "vue";
import { getUserInfoService } from "../api/sys";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const userInfo = ref({});
const getUserDetail = async () => {
  userInfo.value = await getUserInfoService(props.id);
};

onMounted(() => {
  getUserDetail();
});

const printLoading = ref(false);
const printObj = {
  // 打印区域
  id: "userInfoBox",
  // 打印标题
  popTitle: "人像匠心CMS",
  // 打印前
  beforeOpenCallback() {
    printLoading.value = true;
  },
  // 执行打印
  openCallback() {
    printLoading.value = false;
  },
};
</script>
<template>
  <div>
    <el-card>
      <el-button type="primary" :loading="printLoading" v-print="printObj">{{
        $t("message.userInfo.print")
      }}</el-button>
    </el-card>
    <el-card>
      <div id="userInfoBox">
        <!-- 标题 -->
        <h2 class="text-center font-bold mb-2 text-lg">
          {{ $t("message.userInfo.title") }}
        </h2>
        <!-- 头部 -->
        <div class="flex">
          <el-descriptions :column="2" border class="flex-1">
            <el-descriptions-item
              :label="$t('message.userInfo.id')"
              :span="2"
              >{{ userInfo._id }}</el-descriptions-item
            >
            <el-descriptions-item :label="$t('message.userInfo.username')">{{
              userInfo.username
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('message.userInfo.gender')">{{
              userInfo.gender
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('message.userInfo.location')">{{
              userInfo.location
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('message.userInfo.socialLink')">{{
              userInfo.social_link
            }}</el-descriptions-item>
            <el-descriptions-item
              :label="$t('message.userInfo.headline')"
              :span="2"
              >{{ userInfo.headline }}</el-descriptions-item
            >
            <el-descriptions-item :label="$t('message.userInfo.updatedAt')">{{
              $filters.dateFilter(userInfo.updatedAt)
            }}</el-descriptions-item>
            <el-descriptions-item :label="$t('message.userInfo.createdAt')">{{
              $filters.dateFilter(userInfo.createdAt)
            }}</el-descriptions-item>
          </el-descriptions>
          <el-image
            :src="userInfo.avatar"
            fit="cover"
            class="w-[200px] h-[200px] object-cover rounded shadow"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>
<style scoped></style>
