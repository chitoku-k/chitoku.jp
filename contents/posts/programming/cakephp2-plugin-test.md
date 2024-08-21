---
title: CakePHP 2 のプラグインを Travis CI でテストする
created: 2017-12-22T00:00:00+09:00
category: プログラミング
tags:
  - PHP
  - CakePHP
---
これは [CakePHP Advent Calendar 2017](https://qiita.com/advent-calendar/2017/cakephp) の 22 日目の記事です。

## プラグインのテスト

今回は CakePHP 2 のプラグインを開発する際に便利な、Travis CI 上でテストを実行するためのスクリプト
「[FriendsOfCake/travis](https://github.com/FriendsOfCake/travis)」を紹介します。

CakePHP にはプラグインの機構が搭載されていますが、公式の Cookbook にも基本的な機能の説明がなされているのみで特にテストの手法については具体的な記述がありません。
基本的には標準的なアプリケーションと同じようにしてテストを作成することが可能ですが、プラグインのリポジトリー単独でテストを実行することができるように設計されていないためテストの呼び出しにやや難があります。
拙作の CakePHP 2 向けプラグイン「[lampager-cakephp2](https://github.com/lampager/lampager-cakephp2)」では当初、テストにのみ用いられるコードをプラグイン本体にも含めていましたが、読み込むアプリケーションとの競合や、プラグイン自体のメンテナビリティーの問題があったため別の手法を取ることにしました。

[プラグインの作成 – 2.x](https://book.cakephp.org/2.0/ja/plugins/how-to-create-plugins.html)（CakePHP 2.x Cookbook）

<!-- more -->

## FriendsOfCake/travis

[FriendsOfCake/travis](https://github.com/FriendsOfCake/travis) は Travis CI 上で動作させるためのプラグインテスト向けスクリプト群で、CakePHP の新規リポジトリーをセットアップしてプラグインの配置を行ったり、[Codecov](https://codecov.io/) に対してカバレッジを送信したりするためのスクリプトを含んでいます。

プラグイン側で必要な作業は Test ディレクトリーに標準的なアプリケーションと同様の構成でファイルを配置し、プラグインを読み込む側から見たコードと同じようにしてテストを記述することです。
たとえば lampager-cakephp2 では読み込まれる際のディレクトリーの名称を Lampager としているので、テストにおいてプラグインの機能を使うときにはすべて次のようなコードで呼び出します。

`gist:chitoku-k/3ffbb55bb0bb9c24ebdc90ee7b2da72c#LampagerPaginatorTest.php`

こうすることでプラグイン本体から直接テストを実行する場合と異なり、プラグインの読み込みに関しても自動化されたプロセスで検証することが可能になります。

実際の実行例は [Build #52 - lampager/lampager-cakephp2 - Travis CI](https://travis-ci.org/lampager/lampager-cakephp2/builds/304839031) で見られます。

## Composer のオートローダー

現代的な PHP の開発においては基本的に Composer のようなパッケージ管理が採用されていますが、CakePHP 2 は既定でオートローダーが呼び出されることはありません。
プラグインが何らかの Composer パッケージに依存している場合は、`app/Config/bootstrap.php` の末尾等で呼び出す処理を追加しておくとアプリケーション側がそれを呼び出している状況と同じように設定できます（設定例は次章のコード参考）

## PHPUnit のバージョン

CakePHP 2 ではバージョン 2.10 以上から、テスト実行に使用できる PHPUnit のバージョンが 3.7.x から 5.x まで引き上げられました。
しかしながら FriendsOfCake/travis は自動でインストールされる PHPUnit のバージョンが 3.7.x に決め打ちされています。

もしテスト対象のプラグインが PHPUnit 4.x/5.x 環境下でテストされる場合は、次のように Composer を直接呼び出して必要なバージョンを再インストールすることで対応できます。

`gist:chitoku-k/3ffbb55bb0bb9c24ebdc90ee7b2da72c#before_script.yml`

## CakePHP のバージョン

プラグインを呼び出す CakePHP のバージョンは .travis.yml で環境変数を使用して設定する必要があります。
FriendsOfCake/travis 側の実装では GitHub API を呼び出すことでバージョンが一致する CakePHP を取得できるようになっていましたが、API トークンが設定できるようになっていないことに加えて Travis CI では多数の GitHub API を使用するアプリケーションが動作しているため、これを使うことはできませんでした。

次のように `CAKE_REF` 変数を使って有効なブランチ名を指定することで 2.x の最新版を使うといったことはできますが、もしバージョンを厳密に指定したい場合は注意が必要です。

`gist:chitoku-k/3ffbb55bb0bb9c24ebdc90ee7b2da72c#env.yml`

環境変数ではほかに次のような値が指定できます。

- `PLUGIN_NAME`: プラグインディレクトリーの名称
- `CODECOVERAGE`: カバレッジを出力するかどうか（1 なら出力）
- `DB`: テストに使用するデータベースの種類（mysql または pgsql）

## コードカバレッジ

FriendsOfCake/travis では Codecov へのカバレッジ送信をサポートしていますが、Codecov は使用していないのでスクリプトは確認していません。

lampager-cakephp2 では次のように [php-coveralls/php-coveralls](https://github.com/php-coveralls/php-coveralls) を使って Coveralls にカバレッジを反映するように構成しています。

`gist:chitoku-k/3ffbb55bb0bb9c24ebdc90ee7b2da72c#after_success.yml`

## 最後に

<div class="text-center">
<a href="https://github.com/lampager/lampager-cakephp2"><img src="https://user-images.githubusercontent.com/1351893/32145370-967f8572-bd0a-11e7-8324-10854958fd7f.png" style="width: 310px;"></a>
</div>

この記事で紹介した [lampager/lampager](https://github.com/lampager/lampager) はページ単位ではなくカーソルを使用したページネーションを行うためのライブラリーで、
[lampager-cakephp2](https://github.com/lampager/lampager-cakephp2) はそれを CakePHP 2 のモデルやコントローラーから呼び出すためのプラグインです。

現在 Lampager では CakePHP 3 やそれ以外の各種フレームワークも含めてアダプター/プラグインの実装を募集しています。
あわせて [@mpyw](https://qiita.com/mpyw) さんの「[OFFSETを使わない高速ページネーションを任意のPHPフレームワークで超簡単に実現する #Laravel - Qiita](https://qiita.com/mpyw/items/b94b7d69146777f7a407)」もご覧ください。

長い記事でしたがお読みいただきありがとうございました。  
明日の担当は [@yuzoiwasaki](https://qiita.com/yuzoiwasaki) さんです。
