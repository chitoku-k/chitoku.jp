---
title: Google Chrome 42 以降で Silverlight が再生できないときの対処法
created: 2015-05-09T18:02:12+09:00
category: Windows
tags:
  - Google Chrome
---
<div class="alert alert-danger text-center">

この記事はもう古くなってしまいました。  
最新版の Google Chrome で Silverlight を再生する方法はもはや存在しません。
</div>

Google Chrome はアップデートが自動的に行われますが、バージョン 42 以降ではセキュリティ上の問題を解決するために NPAPI と呼ばれるプラグインが既定で無効に設定されるように変更されました。
しかしながら Silverlight がこの NPAPI を使用しているため、Silverlight をインストールしていてもコンテンツが表示されなくなってしまいました。
ひとまず NPAPI を有効に設定して、Silverlight を Chrome 42 以降でも再生できるようにする方法を紹介します。

<!-- more -->

1. Google Chrome で次のページを開く（文字をコピーしてアドレスバーに貼り付け、Enter を押す）
```
chrome://flags/#enable-npapi
```
1. [NPAPI を有効にする] と書かれた項目の [有効にする] をクリックする
1. 画面の指示に従って再起動を行う

以上で Silverlight が再生できるようになるはずです。  
※ この方法はセキュリティ上の理由から非推奨となった NPAPI を有効にすることで Silverlight を使用できるようにしています。
Google Chrome 開発チームは NPAPI をバージョン 45 で完全に利用できなくするとしています。

<div class="alert alert-info text-center">

Google Chrome 64 ビット版を使用している場合は 64 ビット版の Silverlight をインストールして使用します。  
詳しくは下記のリンクにて。
</div>

https://twitter.com/hnle0/status/598552456226742272
