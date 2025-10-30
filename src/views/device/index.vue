<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.idx" placeholder="ID" style="width: 200px;" class="filter-item" @keyup.enter="handleFilter" />
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button class="filter-item" type="primary" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleCreate">
        添加
      </el-button>
      <el-button class="filter-item" type="primary" @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column label="设备号" prop="device_idx" sortable="custom" align="center" width="80">
        <template #default="{row}">
          <span>{{ row.device_idx }}</span>
        </template>
      </el-table-column>
      <el-table-column label="射线设备" min-width="150px">
        <template #default="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.device_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="型号" width="110px" align="center">
        <template #default="{row}">
          <span>{{ row.device_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人" width="110px" align="center">
        <template #default="{row}">
          <span>{{ row.device_manager_idx ? row.device_manager_idx.join(', ') : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="场所名称" width="110px" align="center">
        <template #default="{row}">
          <span>{{ row.location_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="场所地址" width="110px" align="center">
        <template #default="{row}">
          <span>{{ row.location_address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template #default="row">
          <el-button type="primary" size="small" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="success" size="small" @click="checkFile(row)">文件</el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-show="total>0"
      :total="total"
      :page="listQuery.page"
      :limit="listQuery.limit"
      @update:page="handlePageChange"
      @update:limit="handleLimitChange"
    />

    <el-dialog :title="textMap[dialogStatus]" v-model="dialogFormVisible">
      <el-form :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="设备名称">
          <el-input v-model="temp.device_name" />
        </el-form-item>
        <el-form-item label="设备型号">
          <el-input v-model="temp.device_type" />
        </el-form-item>
        <el-form-item label="场所名称">
          <el-input v-model="temp.location_name" />
        </el-form-item>
        <el-form-item label="场所地址">
          <el-input v-model="temp.location_address" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.device_remark" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { getDeviceList, addDevice, updateDevice, deleteDevice, type DeviceInfo } from '@/api/device';
import { ElMessage, ElMessageBox } from 'element-plus';
import { export_json_to_excel } from '@/vendor/Export2Excel';

const list = ref<DeviceInfo[]>([]);
const total = ref(0);
const listLoading = ref(false);
const dialogFormVisible = ref(false);
const dialogStatus = ref('');
const textMap = reactive({
  update: '编辑',
  create: '创建'
});

const listQuery = reactive({
  page: 1,
  limit: 20,
  idx: '',
  sort: '+id'
});

const sortOptions = [
  { label: 'ID 升序', key: '+id' },
  { label: 'ID 降序', key: '-id' }
];

const temp = ref<DeviceInfo>({
  device_idx: undefined,
  device_name: '',
  device_type: '',
  location_name: '',
  location_address: '',
  device_remark: ''
});

const multipleSelection = ref([]);

onMounted(() => {
  getList();
});

const getList = async () => {
  listLoading.value = true;
  try {
    const { data } = await getDeviceList();
    list.value = data;
    total.value = data.length;
  } catch (error) {
    ElMessage.error('获取设备列表失败');
  } finally {
    listLoading.value = false;
  }
};

const handleFilter = () => {
  listQuery.page = 1;
  getList();
};

const handlePageChange = (page: number) => {
  listQuery.page = page;
  getList();
};

const handleLimitChange = (limit: number) => {
  listQuery.limit = limit;
  getList();
};

const sortChange = (data: any) => {
  const { prop, order } = data;
  if (prop === 'device_idx') {
    listQuery.sort = order === 'ascending' ? '+id' : '-id';
    handleFilter();
  }
};

const resetTemp = () => {
  temp.value = {
    device_idx: undefined,
    device_name: '',
    device_type: '',
    location_name: '',
    location_address: '',
    device_remark: ''
  };
};

const handleCreate = () => {
  resetTemp();
  dialogStatus.value = 'create';
  dialogFormVisible.value = true;
};

const createData = async () => {
  try {
    await addDevice(temp.value);
    list.value.unshift(temp.value);
    dialogFormVisible.value = false;
    ElMessage.success('创建成功');
    getList();
  } catch (error) {
    ElMessage.error('创建失败');
  }
};

const handleUpdate = (row: any) => {
  temp.value = Object.assign({}, row.row || row);
  dialogStatus.value = 'update';
  dialogFormVisible.value = true;
};

const updateData = async () => {
  try {
    await updateDevice(temp.value);
    dialogFormVisible.value = false;
    ElMessage.success('更新成功');
    getList();
  } catch (error) {
    ElMessage.error('更新失败');
  }
};

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确认删除该设备吗?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteDevice(row.row?.device_idx || row.device_idx);
    ElMessage.success('删除成功');
    getList();
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

const checkFile = (row: any) => {
  ElMessage.info('文件管理功能待实现');
};

const handleSelectionChange = (val: any) => {
  multipleSelection.value = val;
};

const handleDownload = () => {
  const header = ['设备号', '设备名称', '设备型号', '负责人', '场所名称', '场所地址', '备注'];
  const data = list.value.map(item => [
    item.device_idx,
    item.device_name,
    item.device_type,
    item.device_manager_idx ? item.device_manager_idx.join(',') : '',
    item.location_name,
    item.location_address,
    item.device_remark || ''
  ]);
  export_json_to_excel({
    header,
    data,
    filename: '设备信息导出.xlsx'
  });
};
</script>

<style scoped>
.filter-container {
  padding: 10px 0;
}

.filter-item {
  margin-right: 10px;
}
</style>
