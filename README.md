# vue-trailer

> A  Vue.js project using quasar-framework

### 技术栈

**vue全家桶 + quasar-cli + koa + mongoDB**

### 项目结构

```bash
|—— src              前端相关代码
|—— server           后端相关代码
...                  其他
|—— quasar.conf.js   quasar框架主要配置
```

### 说明

- 灵感来源于一个koa2课程，自己用 vue 和 quasar-cli  (一个非常丰富的UI组件库)重构了前端页面，并简化了后端koa2代码。
- 这是一个电影预告片网站。[演示地址](http://trailer.haledeng.com)

### 安装和启动

```b
# 安装前端依赖和启动前端服务
yarn install && quasar dev

# 安装后端依赖和启动后端服务
cd server
yarn install && yarn serve

# 前端生产环境代码打包
quasar build
```
