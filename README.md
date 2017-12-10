chitoku.jp
==========

[ちとくのホームページ](https://chitoku.jp/)のコンテナー群です。

## 動作環境

Docker Compose のインストールが必要です。  
nginx + PHP-FPM + MySQL で構成されています。

## 実行するには

初回実行時のみコンテナーのビルド作業が必要です。

```sh
$ bin/init
```

ポート番号を指定する場合は環境変数を変更します（任意）。

```sh
$ export CHITOKUJP_PORT=9000
```

次のコマンドでコンテナーを起動します。

```sh
$ docker-compose up -d
```

ブラウザーで次の URL にアクセスします。

```
http://localhost:9000
```

コンテナーを終了するには次のコマンドを使用します。

```sh
$ docker-compose stop
```
