- koa-web 使用说明: https://www.npmjs.com/package/koa-web
- 运行时若存在问题，建议安装最新版本nodejs环境

#### 使用 koa-web

```
# 安装koa-web
npm i koa-web

# 运行默认设置
node default.js
```

#### 使用完整示例

```
# 需要安装koa-router，默认情况无需使用koa-router
npm i koa-router

# 运行完整示例
node start.js
```

#### Windows常规问题

- 建议使用cluster守护进程完美解决调试崩溃

```
node cluster.js
```