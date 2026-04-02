# 使用官方 Node.js 轻量级镜像
FROM node:22-alpine

# 设置时区
RUN apk add tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo Asia/Shanghai > /etc/timezone && \
    apk del tzdata

# 定义工作目录
WORKDIR /app

# 将依赖定义文件拷贝到工作目录下
COPY package*.json ./

# 安装依赖
RUN npm install

# 将本地代码复制到工作目录内
COPY . .

# 暴露端口
EXPOSE 80

# 启动服务
CMD [ "node", "index-cloudrun.js" ]
