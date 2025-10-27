<template>
  <el-form>
    <el-form-item label="用户名">
      <el-input v-model.trim="userName" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model.trim="userEmail" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">更新信息</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import store from '@/store';

export default defineComponent({
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        };
      }
    }
  },
  data() {
    return {
      userName: this.user.name,
      userEmail: this.user.email
    };
  },
  methods: {
    submit() {
      store.user().name = this.userName;
      ElMessage({
        message: '用户信息已成功更新',
        type: 'success',
        duration: 5 * 1000
      });
    }
  }
});
</script>
