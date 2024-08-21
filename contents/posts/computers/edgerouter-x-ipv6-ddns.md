---
title: EdgeRouter X の DDNS で Cloudflare DNS の IPv6 アドレスを更新させる
created: 2019-03-13T23:50:49+09:00
category: コンピューター
tags:
  - EdgeRouter
---
## 概要

[EdgeRouter X](https://store.ui.com/us/en/products/er-x) にはビルトインの DDNS 機能[^1]が搭載されていますがドキュメントは具体的な設定例を掲載していません。
設定を調整してみたところ EdgeRouter でも Cloudflare の DNS サーバーの AAAA レコードが自動更新されるような設定ができたのでご紹介します。

## 環境

+-------------------------+---------------------+
| モデル                  | EdgeRouter X 5-Port |
+-------------------------+---------------------+
| EdgeOS                  | v1.10.9             |
+-------------------------+---------------------+
| Linux                   | ubnt 3.10.107-UBNT  |
+-------------------------+---------------------+
| ddclient                | v3.8.3              |
+-------------------------+---------------------+
| libio-socket-inet6-perl | v2.69-2             |
+-------------------------+---------------------+

## 事前準備（＋ファームウェアのアップデート時の作業）

EdgeRouter に搭載されている DDNS クライアントは [ddclient](https://github.com/ddclient/ddclient) です。  
EdgeOS v1.x では IPv6 サポートのためには Perl ライブラリーである [IO::Socket:INET6](https://tracker.debian.org/pkg/libio-socket-inet6-perl) のインストールが必要で、事前準備のほかファームウェアのアップデートの際にも以下を実行する必要があります。

<!-- more -->

```bash
$ sudo apt-get update
$ sudo apt-get install libio-socket-inet6-perl
```

EdgeRouter におけるパッケージのインストールに関しては公式のドキュメント[^2]も参考にしてください。

## 設定

続いて CLI から DDNS の設定を行っていきます。  
インターフェイス名（ここでは `eth0`）とホスト名等は適宜読み替えてください。

- host-name
  - DDNS として IP アドレスが更新されるホスト名を指定します。
- options
  - `ipv6=yes, if-skip=inet6` を含めるのがポイントです。`zone=` に続けてゾーン名を指定します。
  - `ifconfig eth0` から IP アドレスを取得する際、`if-skip` に指定された文字列までが読み飛ばされます。
- login
  - Cloudflare のログイン時のメールアドレスを指定します。
- password
  - Cloudflare の API キー[^3]を指定します。
- protocol
  - `cloudflare` 固定です。

```bash
$ configure
$ set service dns dynamic interface eth0 service custom-cloudflare host-name ddns.example.com
$ set service dns dynamic interface eth0 service custom-cloudflare options 'ipv6=yes, if-skip=inet6, zone=example.com'
$ set service dns dynamic interface eth0 service custom-cloudflare login ******@*******.**
$ set service dns dynamic interface eth0 service custom-cloudflare password *************************************
$ set service dns dynamic interface eth0 service custom-cloudflare protocol cloudflare
$ commit; save
```

以上で設定は完了です。Cloudflare の管理画面で AAAA レコードが更新されていれば成功です。

## トラブルシューティング

もし IP アドレスが更新されない場合は以下を参考にしてみてください。

### CLI から更新状況を確認する

以下のコマンドで最終更新日時と更新されたアドレスが表示できます。

```bash
$ show dns dynamic status
```

### CLI から確認した更新状況がおかしい

ddclient は DNS レコードを更新したあとに更新状況をキャッシュに保存します。
ただ、ddclient に Cloudflare のレコードを複数個設定した場合、先頭のレコード以外の更新状況が正常にキャッシュされません。
また、複数個のホストが設定されている際に特定のホストが失敗した場合に、後続のホストが処理されません。
これらは 2021/03 時点で Debian 不安定版最新である 3.9.1-7 においても修正が適用されていません。

ddclient に対して以下の 2 つの PR のパッチを適用することで正常に更新状況が保存され、すべてのホストが処理されるようになります。
EdgeRouter の場合は `/usr/sbin/ddclient` に実体となる `/usr/sbin/ddclient-ubnt` へのシンボリックリンクがあります。

- [Fixed cloudflare cache not updating properly by Swell61 · Pull Request #98 · ddclient/ddclient](https://github.com/ddclient/ddclient/pull/98)
- [Don't skip updates to remaining hosts if one host fails by rhansen · Pull Request #245 · ddclient/ddclient · GitHub](https://github.com/ddclient/ddclient/pull/245)

### CLI から強制的に更新を実行する

`/etc/ddclient` 以下に `ddclient_XXX.conf` のような名前で設定ファイルが自動生成されています。  
以下のコマンドで `/usr/sbin/ddclient` を実行すると原因がわかるかもしれません。  
（インターフェイス名は読み替えてください）

```bash
$ sudo ddclient -verbose -force -file /etc/ddclient/ddclient_eth0.conf
```

## 脚注

[^1]: [EdgeRouter - Built-in Dynamic DNS – Ubiquiti Networks Support and Help Center](https://help.ui.com/hc/en-us/articles/204952234-EdgeRouter-Built-in-Dynamic-DNS)
[^2]: [EdgeRouter - Add Debian Packages to EdgeOS – Ubiquiti Networks Support and Help Center](https://help.ubnt.com/hc/en-us/articles/205202560-EdgeRouter-Add-Debian-Packages-to-EdgeOS)
[^3]: [Get API keys (legacy) · Cloudflare Fundamentals docs](https://developers.cloudflare.com/fundamentals/api/get-started/keys/)
