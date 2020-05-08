FROM node:14.2.0-alpine as build
ARG GATSBY_UPDATE_INDEX=false
WORKDIR /usr/src
COPY . /usr/src

RUN apk add --no-cache --virtual build-dependencies \
        git \
        util-linux && \
    yarn && \
    yarn build && \
    apk del --no-cache build-dependencies && \
    rm -rf \
        node_modules \
        .cache \
        /root/.npm \
        /usr/local/share/.cache \
        /tmp/*

FROM nginx:1.17.10-alpine
COPY conf /etc/nginx/conf.d
COPY --from=build /usr/src/public /usr/share/nginx/html
