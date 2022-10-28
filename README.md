# micro-app-and-module-federation

> Micro App 和 Module Federation 兼容性问题

### 问题背景

基座使用模块联邦向子应用共享了一个带插槽的组件，基座和子应用都使用了这个组件。

### 问题复现步骤

1. 安装依赖并运行项目
2. 打开子应用页面`http://localhost:6061/child`
3. 刷新浏览器
4. 点击Home按键，向基座发送消息并返回基座页面
5. 程序报错
