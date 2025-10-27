<template>
  <div class="app-container">
    <el-card>
      <h3>负责人-设备关系管理</h3>
      <div class="filter-container">
        <el-button class="filter-item" type="primary" @click="handleCreate">
          添加关系
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
        <el-table-column label="编号" prop="id" align="center" width="80">
          <template #default="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="负责人" min-width="150px">
          <template #default="{row}">
            <span>{{ row.person_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备" min-width="150px">
          <template #default="{row}">
            <span>{{ row.device_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150">
          <template #default="row">
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加负责人-设备关系" v-model="dialogFormVisible">
        <el-form :model="temp" label-position="left" label-width="100px">
          <el-form-item label="负责人">
            <el-select v-model="temp.person_id" placeholder="请选择负责人">
              <el-option
                v-for="person in personList"
                :key="person.person_idx"
                :label="person.person_name"
                :value="person.person_idx"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="设备">
            <el-select v-model="temp.device_id" placeholder="请选择设备">
              <el-option
                v-for="device in deviceList"
                :key="device.device_idx"
                :label="device.device_name"
                :value="device.device_idx"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="createData">确认</el-button>
          </div>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { getResponsibleDevice } from '@/api/device';
import { getPersonList } from '@/api/person';
import { getDeviceList } from '@/api/device';
import { ElMessage, ElMessageBox } from 'element-plus';

const list = ref([]);
const personList = ref([]);
const deviceList = ref([]);
const listLoading = ref(false);
const dialogFormVisible = ref(false);

const temp = reactive({
  person_id: undefined,
  device_id: undefined
});

onMounted(() => {
  getList();
  loadPersonList();
  loadDeviceList();
});

const getList = async () => {
  listLoading.value = true;
  try {
    const { data } = await getResponsibleDevice();
    list.value = data;
  } catch (error) {
    ElMessage.error('获取关系列表失败');
  } finally {
    listLoading.value = false;
  }
};

const loadPersonList = async () => {
  try {
    const { data } = await getPersonList();
    personList.value = data;
  } catch (error) {
    ElMessage.error('获取人员列表失败');
  }
};

const loadDeviceList = async () => {
  try {
    const { data } = await getDeviceList();
    deviceList.value = data;
  } catch (error) {
    ElMessage.error('获取设备列表失败');
  }
};

const handleCreate = () => {
  temp.person_id = undefined;
  temp.device_id = undefined;
  dialogFormVisible.value = true;
};

const createData = async () => {
  try {
    // 这里需要实现添加关系的 API
    ElMessage.success('创建成功');
    dialogFormVisible.value = false;
    getList();
  } catch (error) {
    ElMessage.error('创建失败');
  }
};

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确认删除该关系吗?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    // 这里需要实现删除关系的 API
    ElMessage.success('删除成功');
    getList();
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};
</script>

<style scoped>
.filter-container {
  padding: 10px 0;
  margin-bottom: 20px;
}
</style>
