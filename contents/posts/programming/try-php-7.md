---
title: PHP 7.0 を試してみた
created: 2015-08-31T14:46:39+09:00
category: プログラミング
tags:
  - PHP
---
今話題の PHP 7、非推奨要素などがまるっと削除されてすっきり速くなったそうなので試してみました。  
~~実際に現在ご覧のページも執筆時点最新の PHP 7.0.0RC1 で表示されています。~~そんな時代もありました。

## 環境

phpenv でバージョン切り替えが可能な環境で実験してみます。

| 項目      | 名称                      |
| --------- | ------------------------- |
| OS        | Arch Linux（Linux 4.1.6） |
| Apache    | 2.4.16                    |
| phpenv    | rbenv 0.4.0-153-g3b6faa8  |
| php-build | v0.11.0dev                |

<!-- more -->

## 手順

1. phpenv と php-build をインストールする
2. php-build のビルドオプションの設定ファイルを開く

```shell
$ vim /usr/local/share/php-build/default_configure_options
```

3.  次の行を追加（apxs の位置は環境依存）

```
--with-apxs2=/usr/bin/apxs
--enable-mysqlnd
--with-pdo-mysql=mysqlnd
```

4. 保存してビルド

```shell
$ php-build 7.0.0RC1 ~/.phpenv/versions/7.0.0RC1
```

5.  バージョンを切り替える

```shell
$ phpenv global 7.0.0RC1

$ phpenv versions
  system
* 7.0.0RC1
```

6. httpd.conf を開いて書き換える

```apacheconf
# LoadModule php5_module modules/libphp5.so
LoadModule php7_module /usr/lib/httpd/modules/libphp7.so
```

7. httpd を再起動

## 所感

噂通り WordPress の動作が 2 倍程度高速になっています。
メモリアクセスなどに関して内部のデータ構造が改善されたらしいですが詳しいことはよくわかりません（おい）

PHP 7のパフォーマンスが高い理由：CodeZine（コードジン）  
[https://codezine.jp/article/detail/8492](https://codezine.jp/article/detail/8492)

歴史的背景に基づく機能廃止が多めのアップデートのようですが、影響を受けるようなコードはなかったので割とすんなり移行（？）できました。
以前 PHP 5.3.3 を使っていた関係でまだコードの至る所に `array()` が残るような状況なので PHP 7 の機能どころか PHP 5.x の新機能も追えていない感じですが、タイプヒンティング強化や即時関数呼び出しなど、魅力が盛りだくさんのようなので製品版のリリースが楽しみです。
