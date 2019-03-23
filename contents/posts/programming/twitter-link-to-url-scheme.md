---
title: Twitter へのリンクをアプリで開かせる
created: 2014-10-17T22:18:15+09:00
category: プログラミング
tags:
  - Twitter
---
JavaScript（jQuery）ネタです。
iPhone などの iOS デバイスから Web サイトを閲覧しているとき、Twitter へのリンクは通常 mobile.twitter.com で開かれますが、ツイートを閲覧したりそのユーザーをフォローしたりするには正直やりづらい…。
ということで、Twitter へのリンクを自動的にスマートフォンアプリで開くように書き換えるスクリプトをご紹介します。このコードの動作には jQuery が必要です。

```JavaScript
$(function () {
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        $("a[href*='twitter.com']").each(function () {
            var match;
            var $elm = $(this);
            if ((match = $elm.attr("href").match(/twitter\.com\/(?:#!\/)?([a-zA-Z0-9_]{1,20})$/))) {
                $elm.attr("href", "twitter://user?screen_name=" + match[1]);
            }
            if ((match = $elm.attr("href").match(/twitter\.com\/(?:#!\/)?[a-zA-Z0-9_]{1,20}\/status(?:es)?\/(\d+)$/))) {
                $elm.attr("href", "twitter://status?status_id=" + match[1]);
            }
        });
    }
});
```

上記のコードを jQuery を読み込んだあとに貼り付けるだけで、iOS のデバイスでは Twitter アプリが開かれます。
