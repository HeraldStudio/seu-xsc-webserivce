# seu-xsc-webservice

东南大学学工部学生处「网上学工」系统后端服务

**使用 [Nest.js](https://docs.nestjs.com) 构建**

## 开始开发(手把手版)

### 本地调试数据库配置

**1.以非认证模式启动 Mongod 服务**

```bash
$ mongod --dbpath <数据保存位置>
```

**2.通过 MongoDB 客户端连接，建立数据库用户**

```bash
$ mongo
```

建立数据库用户，此处数据库名称为 `xsc`，用户名为`user`，密码为 `pwd`：

```
> use xsc
> db.createUser({user:'user', pwd:'pwd', roles:['dbAdmin']})
```

**3.以认证模式重启 Mongod 服务**

```bash
$ mongod --dbpath <数据保存位置（须和之前一致）> --auth 
```

### 创建本地配置文件

进入 `seu-xsc-webservice` 目录下：

```bash
$ cp development.example.env development.env
```

按照需要修改你的配置文件 development.env（请不要修改 development.example.env）。

### 安装依赖

项目使用 yarn 作为依赖管理工具，请首先自行安装 yarn。

```bash
$ yarn
```

### 开始调试

```bash
$ yarn dev
```

