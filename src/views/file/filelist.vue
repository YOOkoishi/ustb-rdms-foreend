<template>
  <div class="app-container">
    <el-card>
      <h3>文件查看</h3>
      <p>此页面用于查看和浏览文件内容</p>
      <el-table :data="fileList" style="width: 100%" border>
        <el-table-column prop="file_name" label="文件名" />
        <el-table-column prop="file_type" label="文件类型" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="viewFile(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFileList } from '@/api/file';
import { ElMessage } from 'element-plus';

const fileList = ref([]);

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

const viewFile = (file: any) => {
  ElMessage.info(`查看文件: ${file.file_name}`);
  // 这里可以实现文件预览功能
};
</script>
