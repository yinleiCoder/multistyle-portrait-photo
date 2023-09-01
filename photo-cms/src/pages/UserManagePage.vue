<script setup>
import { ref, onMounted, onActivated } from "vue";
import { useRouter } from "vue-router";
import { getUserListService, deleteUserService } from "../api/sys";

const tableData = ref([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(2);

const getListData = async () => {
  const data = await getUserListService({
    page: page.value,
    pageSize: pageSize.value,
  });
  tableData.value = data.data;
  total.value = data.total;
};

onMounted(() => {
  getListData();
});
// 解决keep alive缓存不刷新的问题
onActivated(getListData);

const handlePageSizeChange = (currenSize) => {
  pageSize.value = currenSize;
  getListData();
};
const handleCurrentPageChange = (currentPage) => {
  page.value = currentPage;
  getListData();
};

const router = useRouter();
const handleExcelImport = () => {
  router.push("/user/import");
};

const handleRemoveUser = async (row) => {
  await deleteUserService(row._id);
  getListData();
};

const exportToExcelVisible = ref(false);
const handleExcelEmport = () => {
  exportToExcelVisible.value = true;
};

const handleShowUserInfo = (uid) => {
  router.push(`/user/info/${uid}`)
} 
</script>
<template>
  <el-card>
    <div>
      <el-button type="primary" @click="handleExcelImport">{{
        $t("message.excel.importExcel")
      }}</el-button>
      <el-button type="primary" @click="handleExcelEmport">{{
        $t("message.excel.exportExcel")
      }}</el-button>
    </div>
  </el-card>
  <el-card>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="#" type="index" align="center"> </el-table-column>
      <el-table-column
        prop="username"
        :label="$t('message.excel.username')"
        align="center"
      />
      <el-table-column
        prop="avatar"
        :label="$t('message.excel.avatar')"
        align="center"
      >
        <template v-slot="{ row }">
          <el-image
            class="rounded w-12 h-12 shadow"
            fit="cover"
            :src="row.avatar"
            :preview-src-list="[row.avatar]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column :label="$t('message.excel.role')" align="center">
        <template #default="{ row }">
          <div v-if="row.role && row.role.length > 0">
            <el-tag v-for="item in row.role" :key="item.id" size="small">{{
              item.title
            }}</el-tag>
          </div>
          <div v-else>
            <el-tag size="small">{{ $t("message.excel.defaultRole") }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        :label="$t('message.excel.openTime')"
        align="center"
      >
        <template #default="{ row }">
          {{ $filters.dateFilter(row.openTime) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('message.excel.action')" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleShowUserInfo(row._id)">{{
            $t("message.excel.show")
          }}</el-button>
          <el-button type="info" size="small">{{
            $t("message.excel.showRole")
          }}</el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleRemoveUser(row)"
            >{{ $t("message.excel.delete") }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="w-full flex justify-center">
      <el-pagination
        background
        layout="total,prev, pager, next,sizes,jumper"
        :total="total"
        class="mt-2"
        @size-change="handlePageSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page="page"
        :page-size="pageSize"
        :page-sizes="[2, 5, 10]"
      />
    </div>
  </el-card>
  <y-export-excel v-model="exportToExcelVisible"></y-export-excel>
</template>
