FROM node:13.10-alpine as build
WORKDIR /usr/src
COPY . /usr/src

RUN apk update && \
    apk add git util-linux && \
    yarn && \
    yarn build

FROM nginx:1.16-alpine
COPY conf /etc/nginx/conf.d
COPY --from=build /usr/src/public /usr/share/nginx/html
