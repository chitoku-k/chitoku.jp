---
title: Node.js の Intl などが CI 上でも動くようにする
created: 2019-03-26T00:22:45+09:00
category: プログラミング
tags:
  - JavaScript
  - Node.js
---
CI などの環境で Node.js の Intl API をはじめとする国際化サポート[^1]が想定した挙動にならない場合があります。
たとえば Travis CI の Node.js 環境で以下のコマンドを実行すると `ja` を指定していても `en-US` 相当の出力になっています。

```bash
$ node -p '(new Intl.DateTimeFormat("ja")).format(new Date())'
3/26/2019
```

Node.js の i18n は ICU を必要としており[^2]、スクリプト実行の前に [full-icu](https://www.npmjs.com/package/full-icu) をインストールして環境変数に出しておけば正常に動作します。

```bash
$ npm i -g full-icu
$ export NODE_ICU_DATA=$(node-full-icu-path)
$ node -p '(new Intl.DateTimeFormat("ja")).format(new Date())'
2019/3/26
```

Travis CI の場合は `.travis.yml` の `before_install` などに指定しておくと期待した出力が得られます[^3]。

## 環境

Node.js v11.10.0
Travis CI Worker v6.2.0

## 脚注

[^1]: [Internationalization Support | Node.js v11.12.0 Documentation](https://nodejs.org/api/intl.html)
[^2]: [Problem with Intl API and toLocaleString in NodeJS · Issue #832 · nodejs/help · GitHub](https://github.com/nodejs/help/issues/832)
[^3]: [Installing Dependencies - Travis CI](https://docs.travis-ci.com/user/installing-dependencies/)
