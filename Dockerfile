FROM node:16.1.0-slim as build
ARG GATSBY_UPDATE_INDEX=false
WORKDIR /usr/src
COPY . /usr/src

RUN apt-get -y update && \
    apt-get -y install \
        git && \
    yarn && \
    yarn build && \
    apt-get -y remove \
        git && \
    apt-get clean && \
    rm -rf \
        node_modules \
        .cache \
        /root/.npm \
        /usr/local/share/.cache \
        /var/lib/apt/lists/* \
        /tmp/*

FROM nginx:1.19.10-alpine
COPY conf /etc/nginx/conf.d
COPY --from=build /usr/src/public /usr/share/nginx/html
