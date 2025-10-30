<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 200px;" class="filter-item" @keyup.enter="handleFilter" />
      <el-button class="filter-item" type="primary" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleCreate">
        添加
      </el-button>
      <el-button class="filter-item" type="success" @click="handleDownload">
        导出
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
      <el-table-column label="编号" prop="person_idx" align="center" width="80">
        <template #default="{row}">
          <span>{{ row.person_idx }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" min-width="150px">
        <template #default="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.person_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="130px" align="center">
        <template #default="{row}">
          <span>{{ row.person_phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="200px" align="center">
        <template #default="{row}">
          <span>{{ row.person_email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" width="150px" align="center">
        <template #default="{row}">
          <span>{{ row.person_department }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template #default="row">
          <el-button type="primary" size="small" @click="handleUpdate(row)">编辑</el-button>
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
        <el-form-item label="姓名">
          <el-input v-model="temp.person_name" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="temp.person_phone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="temp.person_email" />
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="temp.person_department" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="temp.person_remark" type="textarea" />
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
import { getPersonList, addPerson, updatePerson, deletePerson, type PersonInfo } from '@/api/person';
import { ElMessage, ElMessageBox } from 'element-plus';
import { export_json_to_excel } from '@/vendor/Export2Excel';

const list = ref<PersonInfo[]>([]);
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
  name: ''
});

const temp = ref<PersonInfo>({
  person_idx: undefined,
  person_name: '',
  person_phone: '',
  person_email: '',
  person_department: '',
  person_remark: ''
});

onMounted(() => {
  getList();
});

const getList = async () => {
  listLoading.value = true;
  try {
    const { data } = await getPersonList();
    list.value = data;
    total.value = data.length;
  } catch (error) {
    ElMessage.error('获取人员列表失败');
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

const resetTemp = () => {
  temp.value = {
    person_idx: undefined,
    person_name: '',
    person_phone: '',
    person_email: '',
    person_department: '',
    person_remark: ''
  };
};

const handleCreate = () => {
  resetTemp();
  dialogStatus.value = 'create';
  dialogFormVisible.value = true;
};

const createData = async () => {
  try {
    await addPerson(temp.value);
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
    await updatePerson(temp.value);
    dialogFormVisible.value = false;
    ElMessage.success('更新成功');
    getList();
  } catch (error) {
    ElMessage.error('更新失败');
  }
};

const handleDelete = (row: any) => {
  ElMessageBox.confirm('确认删除该人员吗?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deletePerson(row.row?.person_idx || row.person_idx);
    ElMessage.success('删除成功');
    getList();
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

const handleDownload = () => {
  const header = ['编号', '姓名', '电话', '邮箱', '部门', '备注'];
  const data = list.value.map(item => [
    item.person_idx,
    item.person_name,
    item.person_phone,
    item.person_email,
    item.person_department,
    item.person_remark || ''
  ]);
  export_json_to_excel({
    header,
    data,
    filename: '人员信息导出.xlsx'
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
