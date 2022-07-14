FROM alpine

WORKDIR /home/app

RUN echo "http://mirrors.aliyun.com/alpine/v3.16/main" > /etc/apk/repositories \
    && echo "http://mirrors.aliyun.com/alpine/v3.16/community" >> /etc/apk/repositories \
    && apk add --no-cache --update nodejs npm 

RUN npm i -g pnpm

COPY package.json .npmrc ./

RUN pnpm install
