# syntax = docker/dockerfile:1
FROM node:24.4.1-slim AS dependencies
WORKDIR /usr/src
ARG CI
RUN --mount=type=cache,target=/var/cache/apt \
    --mount=type=cache,target=/var/lib/apt/lists \
    apt-get -y update && \
    apt-get -y install \
        git
COPY .yarn/ /usr/src/.yarn/
COPY package.json yarn.lock .yarnrc.yml /usr/src/
COPY plugins/historia-feed-plugin/package.json /usr/src/plugins/historia-feed-plugin/
COPY plugins/historia-remark-plugin/package.json /usr/src/plugins/historia-remark-plugin/
COPY plugins/historia-taxonomy-plugin/package.json /usr/src/plugins/historia-taxonomy-plugin/
RUN --mount=type=tmpfs,target=/tmp \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    corepack enable && \
    yarn

FROM dependencies AS dev
RUN --mount=type=cache,target=/mnt/yarn,id=/usr/local/share/.cache/yarn \
    cp -r /mnt/yarn /usr/local/share/.cache/

FROM dependencies AS build
ARG CI
ARG TZ=Asia/Tokyo
ARG GATSBY_UPDATE_INDEX=false
COPY . /usr/src
RUN --mount=type=tmpfs,target=/tmp \
    yarn build

FROM nginx:1.29.0
COPY conf /etc/nginx/templates
COPY --from=build /usr/src/public /usr/share/nginx/html
