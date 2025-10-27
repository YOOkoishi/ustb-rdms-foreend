# RDMS 系统后端对接文档

## 一、前端演示模式（Mock 数据）

### 适用场景
- 快速预览系统界面和交互
- 前端开发和调试
- 演示系统功能给非技术人员

### 实现方式

**1. 使用 Mock.js 模拟数据**

```javascript
// src/mock/rdms.ts
import Mock from 'mockjs'

Mock.mock('/api/device/list', 'get', {
  code: 200,
  data: {
    'items|10': [{
      'device_idx|+1': 1,
      device_name: '@ctitle(5,10)',
      device_type: '@pick(["X射线机", "CT扫描仪", "核医学设备"])',
      device_status: '@pick(["正常", "维修", "停用"])',
      location_name: '@ctitle(3,5)'
    }]
  }
})
```

**2. 在 API 文件中添加演示数据**

```typescript
// src/api/device.ts
export async function getDeviceList() {
  // 演示模式：返回静态数据
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    return Promise.resolve({
      code: 200,
      data: mockDeviceData
    })
  }
  // 实际模式：调用真实API
  return request({ url: '/api/device/list', method: 'get' })
}
```

**优点**：无需后端即可运行，快速搭建原型  
**缺点**：数据不持久，无法测试完整业务流程

---

## 二、实际生产模式（对接后端）

### 推荐技术栈

#### 方案一：Django + Django REST Framework（推荐）
**理由**：与现有 RDMS_backend 一致，无缝对接

**后端需要提供的 API 接口：**

```python
# 设备管理 API
GET    /api/device/list/          # 获取设备列表
POST   /api/device/add/           # 添加设备
PUT    /api/device/update/<id>/   # 更新设备
DELETE /api/device/delete/<id>/   # 删除设备

# 人员管理 API  
GET    /api/person/list/          # 获取人员列表
POST   /api/person/add/           # 添加人员
PUT    /api/person/update/<id>/   # 更新人员
DELETE /api/person/delete/<id>/   # 删除人员

# 文件管理 API
GET    /api/file/list/            # 获取文件列表
POST   /api/file/upload/          # 上传文件
GET    /api/file/download/<id>/   # 下载文件
DELETE /api/file/delete/<id>/     # 删除文件

# 认证 API
POST   /api/user/login/           # 用户登录
POST   /api/user/logout/          # 用户登出
GET    /api/user/info/            # 获取用户信息
```

#### 方案二：Node.js + Express/Koa
适合全栈 JavaScript 开发团队

#### 方案三：Spring Boot
适合 Java 技术栈团队

### 对接步骤

**1. 配置环境变量**

```bash
# .env.development
VITE_BASE_API=http://localhost:8000   # 后端服务地址
VITE_USE_MOCK=false                    # 关闭 Mock 模式
```

**2. 配置 CORS（后端）**

```python
# Django settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8001",  # 前端开发服务器
    "http://127.0.0.1:8001",
]
CORS_ALLOW_CREDENTIALS = True
```

**3. 配置 Axios 拦截器（前端）**

```typescript
// src/utils/request.ts
import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000,
  withCredentials: true  // 发送 Cookie
})

// 请求拦截器：添加 Token
service.interceptors.request.use(
  config => {
    const token = store.user().token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  }
)

// 响应拦截器：统一错误处理
service.interceptors.response.use(
  response => response.data,
  error => {
    ElMessage.error(error.message || '请求失败')
    return Promise.reject(error)
  }
)
```

**4. 数据格式约定**

```typescript
// 统一响应格式
interface ApiResponse<T> {
  code: number      // 200 成功，其他失败
  data: T          // 业务数据
  message?: string // 错误消息
}
```

### 注意事项

1. **CSRF Token**：Django 需要在请求中包含 CSRF Token
2. **认证方式**：建议使用 JWT 或 Session 认证
3. **文件上传**：需要配置 multipart/form-data
4. **分页参数**：统一使用 `page` 和 `page_size`
5. **错误码规范**：前后端约定统一的错误码体系

---

**总结**：演示模式适合快速展示，生产模式需完整对接后端 API。推荐使用 Django REST Framework，与现有后端一致，开发效率高。
