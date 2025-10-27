<template>
  <el-card style="margin-bottom:20px;">
    <template #header>
      <div class="clearfix">
        <span>个人信息</span>
      </div>
    </template>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>{{ user.name }}</div>
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ uppercaseFirst(user.role) }}</div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-info user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="user" /><span>基本信息</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            北京科技大学 - 辐射设备管理系统用户
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb';
import { defineComponent } from 'vue';
import { uppercaseFirst } from '@/utils/filters';

export default defineComponent({
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          role: ''
        };
      }
    }
  },
  methods: {
    uppercaseFirst
  }
});
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
