chitoku.jp
==========

[![][workflow-badge]][workflow-link]

[ちとくのホームページ](https://chitoku.jp)の Gatsby テンプレートとコンテンツです。

## 構成

- [TypeScript](https://www.typescriptlang.org/)
- [Gatsby](https://github.com/gatsbyjs/gatsby)
- [Algolia](https://www.algolia.com/)

## 環境変数

```shell
# 公開 URL
HISTORIA_URL=https://chitoku.jp

# リポジトリー名称
GATSBY_REPOSITORY_NAME=chitoku-k/chitoku.jp

# リポジトリーツリー URL
GATSBY_REPOSITORY_TREE_URL=https://github.com/chitoku-k/chitoku.jp/tree/

# メール送信先 URL
GATSBY_MAIL_API=

# reCAPTCHA v3 API キー
GATSBY_MAIL_SITE_KEY=

# Google Analytics ID
GATSBY_GOOGLE_ANALYTICS_ID=

# Algolia
GATSBY_ALGOLIA_APPID=
GATSBY_ALGOLIA_APIKEY=
GATSBY_ALGOLIA_APIKEY_SEARCH_ONLY=
GATSBY_ALGOLIA_INDEXNAME=
```

## ビルド

```shell
$ git clone https://github.com/chitoku-k/chitoku.jp.git --recursive
$ yarn install
$ yarn build
```

[workflow-link]:    https://github.com/chitoku-k/chitoku.jp/actions?query=branch:master                                           
[workflow-badge]:   https://img.shields.io/github/workflow/status/chitoku-k/chitoku.jp/CI%20Workflow/master.svg?style=flat-square
