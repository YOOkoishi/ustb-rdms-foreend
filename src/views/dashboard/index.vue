<template>
  <div class="dashboard-container">
    <!-- 欢迎横幅 -->
    <div class="welcome-banner">
      <el-card class="banner-card">
        <div class="banner-content">
          <div class="banner-text">
            <h1>欢迎使用辐射设备管理系统</h1>
            <p>北京科技大学 - Radiation Device Management System</p>
            <p class="welcome-time">{{ currentTime }}</p>
          </div>
          <div class="banner-image">
            <img src="@/assets/logo.svg" alt="系统Logo" />
          </div>
        </div>
      </el-card>
    </div>

    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stats-row">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon device-icon">
              <el-icon><Document /></el-icon>
            </div>
            <div class="stats-info">
              <p class="stats-title">设备总数</p>
              <h2 class="stats-number">{{ stats.deviceCount }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon person-icon">
              <el-icon><User /></el-icon>
            </div>
            <div class="stats-info">
              <p class="stats-title">人员总数</p>
              <h2 class="stats-number">{{ stats.personCount }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon file-icon">
              <el-icon><Folder /></el-icon>
            </div>
            <div class="stats-info">
              <p class="stats-title">文件总数</p>
              <h2 class="stats-number">{{ stats.fileCount }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card class="stats-card">
          <div class="stats-content">
            <div class="stats-icon relation-icon">
              <el-icon><Connection /></el-icon>
            </div>
            <div class="stats-info">
              <p class="stats-title">管理关系</p>
              <h2 class="stats-number">{{ stats.relationCount }}</h2>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 资质文件展示 -->
    <el-row :gutter="20" class="content-row">
      <el-col :xs="24" :lg="16">
        <el-card class="content-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">
                <el-icon><Files /></el-icon>
                资质文件
              </span>
              <el-button type="primary" size="small" @click="handleUpload">上传文件</el-button>
            </div>
          </template>
          <div class="qualification-list">
            <div v-for="item in qualificationFiles" :key="item.id" class="qualification-item">
              <div class="file-info">
                <el-icon class="file-icon-type"><Document /></el-icon>
                <div class="file-details">
                  <h4>{{ item.name }}</h4>
                  <p>{{ item.description }}</p>
                  <span class="file-date">上传时间: {{ item.uploadDate }}</span>
                </div>
              </div>
              <div class="file-actions">
                <el-button type="primary" link @click="handleView(item)">
                  <el-icon><View /></el-icon>
                  查看
                </el-button>
                <el-button type="success" link @click="handleDownload(item)">
                  <el-icon><Download /></el-icon>
                  下载
                </el-button>
              </div>
            </div>
            <el-empty v-if="qualificationFiles.length === 0" description="暂无资质文件" />
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :lg="8">
        <el-card class="content-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">
                <el-icon><Bell /></el-icon>
                系统公告
              </span>
            </div>
          </template>
          <div class="notice-list">
            <div v-for="notice in notices" :key="notice.id" class="notice-item">
              <div class="notice-title">{{ notice.title }}</div>
              <div class="notice-date">{{ notice.date }}</div>
            </div>
            <el-empty v-if="notices.length === 0" description="暂无公告" />
          </div>
        </el-card>

        <el-card class="content-card" style="margin-top: 20px;">
          <template #header>
            <div class="card-header">
              <span class="card-title">
                <el-icon><InfoFilled /></el-icon>
                快速链接
              </span>
            </div>
          </template>
          <div class="quick-links">
            <el-button type="primary" :icon="Document" @click="goToPage('/device_info')">设备管理</el-button>
            <el-button type="success" :icon="User" @click="goToPage('/person_info')">人员管理</el-button>
            <el-button type="warning" :icon="Folder" @click="goToPage('/file')">文件管理</el-button>
            <el-button type="info" :icon="Connection" @click="goToPage('/person_device')">关系管理</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { 
  Document, 
  User, 
  Folder, 
  Connection, 
  Files, 
  Bell, 
  InfoFilled,
  View,
  Download
} from '@element-plus/icons-vue';

const router = useRouter();

const currentTime = ref('');
const stats = reactive({
  deviceCount: 0,
  personCount: 0,
  fileCount: 0,
  relationCount: 0
});

const qualificationFiles = ref([
  {
    id: 1,
    name: '辐射安全许可证',
    description: '北京科技大学辐射安全许可证文件',
    uploadDate: '2025-01-15',
    fileUrl: '#'
  },
  {
    id: 2,
    name: '环境影响评价报告',
    description: '辐射设备环境影响评价报告书',
    uploadDate: '2024-12-20',
    fileUrl: '#'
  },
  {
    id: 3,
    name: '操作人员培训证书',
    description: '辐射设备操作人员资质培训证书',
    uploadDate: '2024-11-10',
    fileUrl: '#'
  }
]);

const notices = ref([
  {
    id: 1,
    title: '系统维护通知',
    date: '2025-10-28'
  },
  {
    id: 2,
    title: '年度设备检查',
    date: '2025-10-25'
  },
  {
    id: 3,
    title: '安全培训通知',
    date: '2025-10-20'
  }
]);

const updateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekDay = weekDays[now.getDay()];
  
  currentTime.value = `${year}年${month}月${date}日 ${hours}:${minutes}:${seconds} ${weekDay}`;
};

const loadStats = async () => {
  // TODO: 从API加载实际统计数据
  // 这里先使用模拟数据
  stats.deviceCount = 45;
  stats.personCount = 28;
  stats.fileCount = 156;
  stats.relationCount = 89;
};

const goToPage = (path: string) => {
  router.push(path);
};

const handleUpload = () => {
  ElMessage.info('上传功能开发中');
};

const handleView = (item: any) => {
  ElMessage.info(`查看文件: ${item.name}`);
};

const handleDownload = (item: any) => {
  ElMessage.success(`下载文件: ${item.name}`);
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
  loadStats();
});
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  background: #f0f2f5;
  min-height: calc(100vh - 84px);

  .welcome-banner {
    margin-bottom: 20px;

    .banner-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      color: white;

      :deep(.el-card__body) {
        padding: 30px;
      }

      .banner-content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .banner-text {
          h1 {
            font-size: 28px;
            margin: 0 0 10px 0;
          }

          p {
            font-size: 16px;
            margin: 5px 0;
            opacity: 0.9;
          }

          .welcome-time {
            font-size: 14px;
            margin-top: 15px;
          }
        }

        .banner-image {
          img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: white;
            padding: 10px;
          }
        }
      }
    }
  }

  .stats-row {
    margin-bottom: 20px;

    .stats-card {
      margin-bottom: 20px;
      transition: transform 0.3s, box-shadow 0.3s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      :deep(.el-card__body) {
        padding: 20px;
      }

      .stats-content {
        display: flex;
        align-items: center;

        .stats-icon {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-right: 20px;

          &.device-icon {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }

          &.person-icon {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
          }

          &.file-icon {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
          }

          &.relation-icon {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
            color: white;
          }
        }

        .stats-info {
          flex: 1;

          .stats-title {
            font-size: 14px;
            color: #909399;
            margin: 0 0 5px 0;
          }

          .stats-number {
            font-size: 32px;
            font-weight: bold;
            color: #303133;
            margin: 0;
          }
        }
      }
    }
  }

  .content-row {
    .content-card {
      margin-bottom: 20px;

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .card-title {
          font-size: 16px;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }

      .qualification-list {
        .qualification-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #ebeef5;
          transition: background 0.3s;

          &:hover {
            background: #f5f7fa;
          }

          &:last-child {
            border-bottom: none;
          }

          .file-info {
            display: flex;
            align-items: flex-start;
            flex: 1;

            .file-icon-type {
              font-size: 32px;
              color: #409eff;
              margin-right: 15px;
            }

            .file-details {
              h4 {
                margin: 0 0 5px 0;
                font-size: 16px;
                color: #303133;
              }

              p {
                margin: 0 0 5px 0;
                font-size: 14px;
                color: #606266;
              }

              .file-date {
                font-size: 12px;
                color: #909399;
              }
            }
          }

          .file-actions {
            display: flex;
            gap: 10px;
          }
        }
      }

      .notice-list {
        .notice-item {
          padding: 12px 0;
          border-bottom: 1px solid #ebeef5;

          &:last-child {
            border-bottom: none;
          }

          .notice-title {
            font-size: 14px;
            color: #303133;
            margin-bottom: 5px;
          }

          .notice-date {
            font-size: 12px;
            color: #909399;
          }
        }
      }

      .quick-links {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .el-button {
          width: 100%;
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>

