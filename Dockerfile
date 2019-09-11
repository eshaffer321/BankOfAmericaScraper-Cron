FROM node:11.13-slim
FROM keymetrics/pm2:latest-alpine

WORKDIR /app

COPY . /app

RUN npm install

CMD pm2-runtime index.js
