---
title: EdgeRouter X の DDNS で Cloudflare DNS の IPv6 アドレスを更新させる
created: 2019-03-13T23:50:49+09:00
category: コンピューター
tags:
  - EdgeRouter
---
## 概要

[EdgeRouter X](https://www.ui.com/edgemax/edgerouter-x/) にはビルトインの DDNS 機能[^1]が搭載されていますがドキュメントは具体的な設定例を掲載していません。
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

EdgeRouter に搭載されている DDNS クライアントは [ddclient](https://sourceforge.net/projects/ddclient/) です。  
IPv6 サポートのためには Perl ライブラリーである [IO::Socket:INET6](https://packages.debian.org/jessie/libio-socket-inet6-perl) のインストールが必要で、事前準備のほかファームウェアのアップデートの際にも以下を実行する必要があります。

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
  - `ipv6=yes` を含めるのがポイントです。`zone=` に続けてゾーン名を指定します。
- login
  - Cloudflare のログイン時のメールアドレスを指定します。
- password
  - Cloudflare の API キー[^3]を指定します。
- protocol
  - `cloudflare` 固定です。
- web
  - IPv6 アドレスを返す Web API を指定します。今回は [ident.me API](https://api.ident.me/) を使いました。

```bash
$ configure
$ set service dns dynamic interface eth0 service custom-cloudflare host-name ddns.example.com
$ set service dns dynamic interface eth0 service custom-cloudflare options 'ipv6=yes, zone=example.com'
$ set service dns dynamic interface eth0 service custom-cloudflare login ******@*******.**
$ set service dns dynamic interface eth0 service custom-cloudflare password *************************************
$ set service dns dynamic interface eth0 service custom-cloudflare protocol cloudflare
$ set service dns dynamic interface eth0 web 'https://v6.ident.me/'
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

### CLI から強制的に更新を実行する

`/etc/ddclient` 以下に `ddclient_インターフェイス名` という名前で設定ファイルが自動生成されています。  
以下のコマンドで `/usr/sbin/ddclient` を実行すると原因がわかるかもしれません。  
（インターフェイス名は読み替えてください）

```bash
$ sudo ddclient -verbose -force -file /etc/ddclient/ddclient_eth0.conf
```

## 脚注

[^1]: [EdgeRouter - Built-in Dynamic DNS – Ubiquiti Networks Support and Help Center](https://help.ubnt.com/hc/en-us/articles/204952234-EdgeRouter-Built-in-Dynamic-DNS)
[^2]: [EdgeRouter - Add Debian Packages to EdgeOS – Ubiquiti Networks Support and Help Center](https://help.ubnt.com/hc/en-us/articles/205202560-EdgeRouter-Add-Debian-Packages-to-EdgeOS)
[^3]: [Where do I find my Cloudflare API key? – Cloudflare Support](https://support.cloudflare.com/hc/en-us/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-)
