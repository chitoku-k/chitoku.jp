---
title: Jest で location.href などの値を書き換える方法
created: 2019-04-07T19:30:40+09:00
category: プログラミング
tags:
  - JavaScript
  - Node.js
---
## 目的

Node.js におけるテストで [Jest](https://jestjs.io/) を使用する場合、DOM API が関連するテストは [JSDOM](https://github.com/jsdom/jsdom) の実装によって実行されます。
この JSDOM はブラウザーと完全に同じ実装を持っているわけではなく、`javascript:location.href` への代入ができないなどの制約があります。
そのため Jest でもこれに合わせて JSDOM の API を使用したテストコードを記述する必要があります。

## 準備

Jest では JSDOM の API を直接参照することができないため、[jest-environment-jsdom-global](https://www.npmjs.com/package/jest-environment-jsdom-global) をインストールします。

```bash
npm i jest-environment-jsdom-global jest-environment-jsdom
```

`package.json` の `jest` の項目にも追加しておきます。

```json
{
  "jest": {
    "testEnvironment": "jest-environment-jsdom-global"
  }
}
```

<!-- more -->

## 書き方

あとは `location` プロパティーなどのように書き換えることができないものを `javascript:jsdom.reconfigure()` を使って書き換えます[^2]。
これは `javascript:location.href` を直接使えるようになるわけではなく、上記パッケージによって `javascript:jsdom` が Jest から参照できるようになるというだけです。

```javascript
it('detects PC', () => {
  jsdom.reconfigure({
    url: 'https://example.com/',
  });

  expect(location.hostname).toBe('example.com');
});

it('detects SP', () => {
  jsdom.reconfigure({
    url: 'https://sp.example.com/',
  });

  expect(location.hostname).toBe('sp.example.com');
});
```

パス部分の書き換えだけであれば `javascript:history.pushState()` を使用することでも対処できますが、ホスト名の書き換えなどを伴う場合は `javascript:jsdom.reconfigure()` が必要です。

## 脚注

[^1]: [Unable to change window.location using Object.defineProperty · Issue #5124 · facebook/jest · GitHub](https://github.com/facebook/jest/issues/5124)
[^2]: [Reconfiguring the jsdom with reconfigure(settings)](https://github.com/jsdom/jsdom#reconfiguring-the-jsdom-with-reconfiguresettings)
