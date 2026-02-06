# syntax = docker/dockerfile:1
FROM node:25.5.0-slim AS dependencies
WORKDIR /usr/src
ARG CI
COPY .yarn/ /usr/src/.yarn/
COPY package.json yarn.lock .yarnrc.yml /usr/src/
COPY plugins/historia-feed-plugin/package.json /usr/src/plugins/historia-feed-plugin/
COPY plugins/historia-remark-plugin/package.json /usr/src/plugins/historia-remark-plugin/
COPY plugins/historia-taxonomy-plugin/package.json /usr/src/plugins/historia-taxonomy-plugin/
RUN --mount=type=tmpfs,target=/tmp \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    npm install -g -f corepack && \
    corepack enable && \
    yarn

FROM dependencies AS build
ARG CI
ARG TZ=Asia/Tokyo
ARG GATSBY_UPDATE_INDEX=false
COPY . /usr/src
RUN --mount=type=tmpfs,target=/tmp \
    --mount=type=secret,id=.env,target=.env,required=true \
    yarn build

FROM nginx:1.29.5
COPY conf /etc/nginx/templates
COPY --from=build /usr/src/public /usr/share/nginx/html
