FROM node:12.18-alpine

RUN mkdir -p ./client

COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node ./client/package.json ./client/package-lock.json ./client/

RUN npm ci \
    && cd ./client \
    && npm ci
