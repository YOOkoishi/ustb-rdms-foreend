<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" @click="handleCreate">
        添加文件
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="文件编号" prop="file_idx" align="center" width="100">
        <template #default="{row}">
          <span>{{ row.file_idx }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文件名" min-width="200px">
        <template #default="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.file_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文件类型" width="120px" align="center">
        <template #default="{row}">
          <span>{{ row.file_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文件大小" width="120px" align="center">
        <template #default="{row}">
          <span>{{ formatFileSize(row.file_size) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属设备" width="120px" align="center">
        <template #default="{row}">
          <span>{{ row.file_ownership_idx }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template #default="row">
          <el-button type="primary" size="small" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="success" size="small" @click="handleDownload(row)">下载</el-button>
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
        <el-form-item label="文件名">
          <el-input v-model="temp.file_name" />
        </el-form-item>
        <el-form-item label="文件类型">
          <el-input v-model="temp.file_type" />
        </el-form-item>
        <el-form-item label="所属设备">
          <el-input v-model="temp.file_ownership_idx" type="number" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.file_remark" type="textarea" />
        </el-form-item>
        <el-form-item label="文件上传">
          <el-upload
            class="upload-demo"
            action="#"
            :auto-upload="false"
            :on-change="handleFileChange"
          >
            <el-button size="small" type="primary">选择文件</el-button>
          </el-upload>
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
import { getFileList, addFile, updateFile, deleteFile, downloadFile, type FileInfo } from '@/api/file';
import { ElMessage, ElMessageBox } from 'element-plus';

const list = ref<FileInfo[]>([]);
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
  limit: 20
});

const temp = ref<FileInfo>({
  file_idx: undefined,
  file_name: '',
  file_type: '',
  file_size: 0,
  file_ownership_idx: undefined,
  file_remark: ''
});

onMounted(() => {
  getList();
});

const getList = async () => {
  listLoading.value = true;
  try {
    const { data } = await getFileList();
    list.value = data;
    total.value = data.length;
  } catch (error) {
    ElMessage.error('获取文件列表失败');
  } finally {
    listLoading.value = false;
  }
};

const handlePageChange = (page: number) => {
  listQuery.page = page;
  getList();
};

const handleLimitChange = (limit: number) => {
  listQuery.limit = limit;
  getList();
};

const formatFileSize = (bytes: number | undefined) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const resetTemp = () => {
  temp.value = {
    file_idx: undefined,
    file_name: '',
    file_type: '',
    file_size: 0,
    file_ownership_idx: undefined,
    file_remark: ''
  };
};

const handleCreate = () => {
  resetTemp();
  dialogStatus.value = 'create';
  dialogFormVisible.value = true;
};

const handleFileChange = (file: any) => {
  temp.value.file_name = file.name;
  temp.value.file_size = file.size;
  temp.value.file_type = file.name.split('.').pop() || '';
};

const createData = async () => {
  try {
    await addFile(temp.value);
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
    await updateFile(temp.value);
    dialogFormVisible.value = false;
    ElMessage.success('更新成功');
    getList();
  } catch (error) {
    ElMessage.error('更新失败');
  }
};

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确认删除该文件吗?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteFile(row.row?.file_idx || row.file_idx);
    ElMessage.success('删除成功');
    getList();
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

const handleDownload = async (row: any) => {
  try {
    const fileData = row.row || row;
    if (fileData.file_download_url) {
      await downloadFile(fileData.file_download_url);
      ElMessage.success('下载成功');
    } else {
      ElMessage.warning('该文件没有下载链接');
    }
  } catch (error) {
    ElMessage.error('下载失败');
  }
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
