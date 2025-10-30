<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo-section">
        <div class="logo-container">
          <img src="/University_of_Science_and_Technology_Beijing_logo.svg.png" alt="USTB Logo" class="school-logo" />
          <h1 class="system-title">辐射设备管理系统</h1>
          <h2 class="school-name">北京科技大学</h2>
          <p class="system-desc">Radiation Device Management System</p>
        </div>
      </div>
      
      <div class="form-section">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
                 label-position="left">

          <div class="title-container">
            <h3 class="title">用户登录</h3>
          </div>

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input ref="usernameRef" v-model="loginForm.username" placeholder="用户名" name="username" type="text"
                      tabindex="1" autocomplete="on" />
          </el-form-item>

          <el-tooltip v-model="capsTooltip" content="大写锁定已开启" placement="right" manual>
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input :key="passwordType" ref="passwordRef" v-model="loginForm.password" :type="passwordType"
                        placeholder="密码" name="password" tabindex="2" autocomplete="on" @keyup="checkCapslock"
                        @blur="capsTooltip = false" @keyup.enter="handleLogin" />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>

          <el-button :loading="loading" type="primary" class="login-button" @click.prevent="handleLogin">
            登录
          </el-button>

          <div class="tips-container">
            <span class="tip-text">请使用授权账号登录系统</span>
          </div>
        </el-form>
        
        <div class="footer-info">
          <p>© 2025 北京科技大学 辐射设备管理系统</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { validUsername } from '@/utils/validate';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import store from '@/store';

const router = useRouter();
const route = useRoute();

const loginFormRef = ref<FormInstance>();
const usernameRef = ref();
const passwordRef = ref();

const loginForm = reactive({
  username: 'admin',
  password: '111111'
});

const validateUsername = (_rule: any, value: any, callback: any) => {
  if (!validUsername(value)) {
    callback(new Error('请输入正确的用户名'));
  } else {
    callback();
  }
};

const validatePassword = (_rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error('密码长度不能少于6位'));
  } else {
    callback();
  }
};

const loginRules = reactive<FormRules>({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
});

const capsTooltip = ref(false);
const loading = ref(false);
const passwordType = ref('password');
const redirect = ref<string | undefined>(undefined);
const otherQuery = ref({});

const checkCapslock = (e: KeyboardEvent) => {
  const { key } = e;
  capsTooltip.value = key !== undefined && key.length === 1 && ((key >= 'A' && key <= 'Z') || (key >= 'а' && key <= 'я'));
};

const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = '';
  } else {
    passwordType.value = 'password';
  }
  nextTick(() => {
    passwordRef.value.focus();
  });
};

const handleLogin = () => {
  loginFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true;
      try {
        await store.user().login(loginForm);
        router.push({ path: redirect.value || '/', query: otherQuery.value }).catch(err => {
          console.warn(err);
        });
        loading.value = false;
      } catch (error) {
        loading.value = false;
        ElMessage.error('登录失败，请检查用户名和密码');
      }
    } else {
      return false;
    }
  });
};

const getOtherQuery = (query: any) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur];
    }
    return acc;
  }, {} as any);
};

onMounted(() => {
  if (loginForm.username === '') {
    usernameRef.value.focus();
  } else if (loginForm.password === '') {
    passwordRef.value.focus();
  }
});

// Watch route changes
if (route.query) {
  redirect.value = route.query.redirect as string;
  otherQuery.value = getOtherQuery(route.query);
}
</script>

<style lang="scss" scoped>
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
$dark_gray: #889aa4;

.login-container {
  min-height: 100vh;
  width: 100%;
  background: url('@/../../public/USTB.jpg') no-repeat center center / cover;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .login-box {
    display: flex;
    width: 900px;
    height: 500px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    
    .logo-section {
      flex: 1;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      
      .logo-container {
        text-align: center;
        color: white;
        
        .school-logo {
          width: 120px;
          height: 120px;
          margin-bottom: 20px;
          background: white;
          border-radius: 50%;
          padding: 10px;
        }
        
        .system-title {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .school-name {
          font-size: 20px;
          margin-bottom: 10px;
          font-weight: 500;
        }
        
        .system-desc {
          font-size: 14px;
          opacity: 0.9;
          font-style: italic;
        }
      }
    }
    
    .form-section {
      flex: 1.5;
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: white;
      
      .login-form {
        .title-container {
          text-align: center;
          margin-bottom: 30px;
          
          .title {
            font-size: 26px;
            color: #333;
            font-weight: 600;
            margin: 0;
          }
        }
        
        .el-form-item {
          border: 1px solid #dcdfe6;
          background: #f5f7fa;
          border-radius: 5px;
          margin-bottom: 22px;
        }
        
        .svg-container {
          padding: 6px 5px 6px 15px;
          color: $dark_gray;
          vertical-align: middle;
          width: 30px;
          display: inline-block;
        }
        
        :deep(.el-input) {
          display: inline-block;
          height: 47px;
          width: 85%;

          input {
            background: transparent;
            border: 0;
            -webkit-appearance: none;
            border-radius: 0;
            padding: 12px 5px 12px 15px;
            color: #333;
            height: 47px;
            caret-color: #409eff;
          }
        }
        
        .show-pwd {
          position: absolute;
          right: 10px;
          top: 7px;
          font-size: 16px;
          color: $dark_gray;
          cursor: pointer;
          user-select: none;
        }
        
        .login-button {
          width: 100%;
          margin-top: 10px;
          margin-bottom: 20px;
          height: 47px;
          font-size: 16px;
        }
        
        .tips-container {
          text-align: center;
          
          .tip-text {
            font-size: 14px;
            color: #666;
          }
        }
      }
      
      .footer-info {
        text-align: center;
        font-size: 12px;
        color: #999;
        margin-top: 20px;
      }
    }
  }
  
  @media only screen and (max-width: 1024px) {
    .login-box {
      width: 90%;
      flex-direction: column;
      height: auto;
      
      .logo-section {
        padding: 30px;
      }
      
      .form-section {
        padding: 30px;
      }
    }
  }
}
</style>

