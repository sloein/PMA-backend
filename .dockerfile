# 使用官方 Node.js 20 镜像作为基础镜像
FROM node:20.16.0

# 设置工作目录为容器内的 /app 目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目的所有文件到 /app 目录
COPY . .

# 暴露容器的端口
EXPOSE 3000

# 启动应用程序
CMD ["node", "index.js"]
