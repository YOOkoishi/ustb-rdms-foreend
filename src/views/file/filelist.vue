<template>
  <div class="app-container">
    <el-card>
      <h3>文件查看</h3>
      <div class="filter-container">
        <el-button class="filter-item" type="success" @click="handleExport">
          导出
        </el-button>
      </div>
      <el-table :data="fileList" style="width: 100%" border>
        <el-table-column prop="file_idx" label="编号" width="100" align="center" />
        <el-table-column prop="file_name" label="文件名" min-width="200" />
        <el-table-column prop="file_type" label="文件类型" width="100" align="center" />
        <el-table-column label="文件大小" width="120" align="center">
          <template #default="scope">
            {{ formatFileSize(scope.row.file_size) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template #default="scope">
            <el-button size="small" @click="viewFile(scope.row)">查看</el-button>
            <el-button size="small" type="success" @click="downloadFile(scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 文件查看对话框 -->
    <el-dialog v-model="viewDialogVisible" :title="`查看文件: ${currentFile.file_name}`" width="70%">
      <div v-if="currentFile.file_type === 'txt'" class="file-content-preview">
        <pre>{{ currentFile.file_content }}</pre>
      </div>
      <div v-else class="file-content-placeholder">
        <el-empty description="暂不支持此格式的在线预览，请下载后查看" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFileList } from '@/api/file';
import { ElMessage } from 'element-plus';
import { export_json_to_excel } from '@/vendor/Export2Excel';

const fileList = ref([]);
const viewDialogVisible = ref(false);
const currentFile = ref({
  file_name: '',
  file_type: '',
  file_content: ''
});

onMounted(() => {
  loadFiles();
});

const loadFiles = async () => {
  try {
    const { data } = await getFileList();
    fileList.value = data;
  } catch (error) {
    ElMessage.error('加载文件列表失败');
  }
};

const formatFileSize = (bytes: number | undefined) => {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

const viewFile = (file: any) => {
  currentFile.value = {
    file_name: file.file_name,
    file_type: file.file_type,
    file_content: file.file_content || '暂无内容'
  };
  viewDialogVisible.value = true;
};

const downloadFile = (file: any) => {
  ElMessage.info(`下载文件: ${file.file_name}`);
  // 这里可以实现真实的文件下载逻辑
};

const handleExport = () => {
  const header = ['文件编号', '文件名', '文件类型', '文件大小(KB)', '所属设备'];
  const data = fileList.value.map(item => [
    item.file_idx,
    item.file_name,
    item.file_type,
    item.file_size ? Math.round(item.file_size / 1024) : 0,
    item.file_ownership_idx || ''
  ]);
  export_json_to_excel({
    header,
    data,
    filename: '文件列表导出.xlsx'
  });
};
</script>

<style scoped>
.filter-container {
  padding: 10px 0;
  margin-bottom: 20px;
}

.filter-item {
  margin-right: 10px;
}

.file-content-preview {
  background-color: #f5f7fa;
  padding: 20px;
  border-radius: 4px;
  max-height: 500px;
  overflow-y: auto;
}

.file-content-preview pre {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.file-content-placeholder {
  text-align: center;
  padding: 40px 0;
}
</style>
