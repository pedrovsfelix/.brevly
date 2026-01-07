FROM node:22-alpine AS base
WORKDIR /usr/src/app
RUN corepack enable

FROM base AS deps
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM base AS build
COPY . .
COPY --from=deps /usr/src/app/node_modules ./node_modules

RUN yarn build
RUN yarn install --production --ignore-scripts --prefer-offline

FROM node:22-alpine AS deploy

USER node
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

EXPOSE 3333

CMD ["node", "dist/server.js"]
