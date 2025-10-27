# RDMS 辐射设备管理系统 (Vue3 版本)

这是基于 vue3-element-admin 模板创建的辐射设备管理系统前端项目。

## 技术栈

- Vue 3.5
- TypeScript
- Element Plus 2.10

This template is built with the latest Vue 3 framework and the Element Plus UI library. It uses Vite as the build tool, Pinia for state management, Vue Router for routing, Mock.js for data simulation, and integrates TypeScript.
The functionality is ported from **Vue Element Admin**. For detailed usage instructions, please refer to [this documentation](https://vue3-element-admin-site.midfar.com/guide/essentials/router-and-nav.html).

## Features

- # RDMS 辐射设备管理系统 (Vue3 版本)

这是基于 vue3-element-admin 模板创建的辐射设备管理系统前端项目。

## 技术栈

- Vue 3.5
- TypeScript
- Element Plus 2.10
- Vue Router 4.5
- Pinia 2.3
- Vite 构建工具

## 功能模块

1. **首页 (Dashboard)** - 数据统计和概览
2. **设备信息** - 设备的增删改查管理
3. **人员信息** - 人员的增删改查管理
4. **负责人-设备** - 管理人员与设备的关联关系
5. **文件管理** - 文件上传、下载和管理
6. **文件查看** - 查看和预览文件内容

## 开发指南

### 环境要求

- Node.js >= 20.x
- npm >= 9.x

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
# 连接测试服务器
npm run dev:test

# 连接生产服务器  
npm run dev:prod
```

### 构建生产环境

```bash
# 构建测试环境
npm run build:test

# 构建生产环境
npm run build:prod
```

## 项目结构

```plaintext
src/
├── api/              # API 接口
│   ├── device.ts     # 设备管理 API
│   ├── person.ts     # 人员管理 API
│   ├── file.ts       # 文件管理 API
│   └── user.ts       # 用户管理 API
├── views/            # 页面组件
│   ├── device/       # 设备信息页面
│   ├── person/       # 人员信息页面
│   ├── file/         # 文件管理页面
│   ├── person_device/# 负责人-设备关系页面
│   └── dashboard/    # 仪表盘
├── router/           # 路由配置
├── store/            # Pinia 状态管理
└── layout/           # 布局组件
```

## 从 Vue2 迁移的改进

1. **性能提升**: Vue 3 提供更好的性能和更小的包体积
2. **TypeScript 原生支持**: 更好的类型推导和 IDE 支持
3. **Composition API**: 更灵活的代码组织方式
4. **更现代的构建工具**: 使用 Vite 替代 Webpack，提供极快的开发体验

## License

MIT License
- **TypeScript**: A superset of JavaScript designed for application-scale development
- **Mock Data**: Built-in mock data solution
- **Permission System**: Comprehensive dynamic route and permission generation
- **Components**: Multiple commonly used components are re-encapsulated for ease of use

## Live Demo

[Vue3 Element Admin](https://vue3-element-admin.midfar.com/)

## Prerequisites

Before development, please ensure you are familiar with and proficient in the following technologies:

- Vue: https://vuejs.org/
- TypeScript: https://www.typescriptlang.org/
- Element Plus: https://element-plus.org/
- Pinia: https://pinia.vuejs.org/
- Vue Router: https://router.vuejs.org/

> Note: Make sure to read all of the above documentation before starting development.
> For production projects, please update this README accordingly.

## Recommended IDE & Plugins

[VSCode](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)  
(Disable old plugins such as Vetur and the legacy Volar)

## Vite Build Tool Configuration

Refer to the [Vite Configuration Guide](https://vitejs.dev/config/)

## Project Structure

```
- mock               // Mock data
- public
- src
  - components       // Common components
  - views            // Views (pages)
    - tableTemplates // Example module
      - index.ts
    - login          // Login module
      - index.vue
  - settings.ts      // Global configuration
  - main.ts          // Entry file
- types              // TypeScript types
- package.json
- CODE_OF_CONDUCT.md // Code of conduct for framework development
- README.md          // User guide for the framework
```

## Usage

### Ensure your local Node.js version is >= 20  
This project is tested with Node.js v20.18.0.

```sh
node -v
```

### Install dependencies

```sh
npm install
```

### Development mode (connect to test server)

```sh
npm run dev:test
```

### Build for test server

```sh
npm run build:test
```

### Code linting with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Supported Browsers

Modern browsers:

| Chrome          | Edge            | Firefox         | Safari          | 
| --------------- | --------------- | --------------- | --------------- | 
| Chrome ≥ 85     | Edge ≥ 85       | Firefox ≥ 79    | Safari ≥ 14.1   | 

## Contributing

We warmly welcome your contributions! You can help improve this base framework in the following ways:

- Contact the maintainer at **midfar@qq.com**
- Submit a PR
- Fix bugs
- Share best practices and case studies


## 简介

这个模板使用了最新的 vue3 和 element-plus UI 框架，vite 构建工具、pinia 状态管理、vue-router 路由管理、mockjs 数据模拟，并集成了 typescript。功能从 Vue Element Admin 移植而来，详细使用可以参考[该文档](https://vue3-element-admin-site.midfar.com/zh/guide/essentials/router-and-nav.html)。

## 特性

- **最新技术栈**：使用 Vue3/vite3 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **Mock 数据** 内置 Mock 数据方案
- **权限** 内置完善的动态路由权限生成方案
- **组件** 二次封装了多个常用的组件

## 在线示例

[vue3 element admin](https://vue3-element-admin.midfar.com/)

## 准备
开发前请确保熟悉并掌握以下技术栈：

- vue: https://cn.vuejs.org/
- TypeScript：https://www.tslang.cn/index.html
- element-plus：https://cn.element-plus.org/
- pinia: https://pinia.vuejs.org/zh/
- vue-router: https://router.vuejs.org/zh/

注：开发前请务必阅读上述所有文档。应用至实际项目开发请修改 readme 内容。

## 推荐的 IDE 工具和插件

[VSCode](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (需禁用旧插件 Vetur、Volar )

## Vite 构建工具配置

参考 [Vite 配置](https://vitejs.dev/config/)

## 主要结构

```
- mock // 模拟数据
- public
- src
  - components // 组件
  - views // 页面
    - tableTemplates // 示例模块
	  - index.ts
   - login // 登录模块
	  - index.vue
 - settings.ts // 全局配置
 - main.ts // 入口文件
-  types // TypeScript类型
- package.json
- CODE_OF_CONDUCT.md // 框架开发要求
- README.md //框架使用手册
```

## 使用

### 确定本地的node版本>=20。本地使用v20.18.0验证通过。

```sh
node -v
```

### 安装依赖

```sh
npm install
```

### 开发模式连接测试服

```sh
npm run dev:test
```

### 打包到测试服

```sh
npm run build:test
```

### 代码检查 [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 支持环境

现代浏览器。

| Chrome          | Edge            | Firefox         | Safari          | 
| --------------- | --------------- | --------------- | --------------- | 
| Chrome ≥ 85     | Edge ≥ 85       | Firefox ≥ 79    | Safari ≥ 14.1   | 

## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我们一起共建基线框架：

- 联系维护人员 midfar@qq.com
- 提交 pr
- 修复 bug
- 分享实践案例
