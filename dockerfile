FROM node:14.16-alpine

WORKDIR /app
EXPOSE 7000

COPY package.json package-lock.json ./
COPY ./client/package.json ./client/package-lock.json ./client/
COPY ./commonPackages ./commonPackages

RUN npm ci \
    && cd ./client \
    && npm ci
