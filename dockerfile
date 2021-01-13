FROM node:14.15-alpine

WORKDIR /app
RUN chown -R node:node /app
EXPOSE 7000

USER node
RUN mkdir -p ./client

COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node ./client/package.json ./client/package-lock.json ./client/
COPY --chown=node:node ./commonPackages ./commonPackages

RUN npm ci \
    && cd ./client \
    && npm ci
