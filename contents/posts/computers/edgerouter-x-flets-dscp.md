---
title: EdgeRouter X のファイアウォールでフレッツ光の IPv6 から SSH が繫がらない問題を解決する
created: 2019-03-23T16:55:37+09:00
category: コンピューター
tags:
  - EdgeRouter
  - IPv6
---
## 概要

フレッツ光では OpenSSH が設定する DSCP 値の関係で SSH のパケットが NGN 網で捨てられてしまう問題が発生します[^1][^2]。
端的にはこの記事の指摘通り `ssh_config` を以下のように修正すれば解決できます。

```
Host foo.example.com
    HostName  foo.example.com
    IPQoS     0
```

しかしながら、このような設定はルーター側で設定しておいたほうがクライアント側の設定が少なくて済むので楽です。
今回は [EdgeRouter X](https://store.ui.com/us/en/products/er-x) のファイアウォール機能を使って、ルーターにやってきた SSH のパケットの DSCP 値を変更するように設定してみます。

## 環境

+--------+---------------------+
| モデル | EdgeRouter X 5-Port |
+--------+---------------------+
| EdgeOS | v1.10.9             |
+--------+---------------------+
| Linux  | ubnt 3.10.107-UBNT  |
+--------+---------------------+

## 手順

CLI からファイアウォールの設定を行います。  
アドレスやポート番号等は適宜読み替えてください。

<!-- more -->

```bash
$ configure

# SSH に使われるアドレス
$ set firewall group ipv6-address-group ADDRESS6_SSH description 'Addresses for SSH'
$ set firewall group ipv6-address-group ADDRESS6_SSH ipv6-address '2001:db8::1'

# 上記アドレスが宛先の TCP パケットの DSCP 値を 0 に変更
$ set firewall ipv6-modify LAN6_PBR rule 10 action modify
$ set firewall ipv6-modify LAN6_PBR rule 10 destination group ipv6-address-group ADDRESS6_SSH
$ set firewall ipv6-modify LAN6_PBR rule 10 destination port 22
$ set firewall ipv6-modify LAN6_PBR rule 10 modify dscp 0
$ set firewall ipv6-modify LAN6_PBR rule 10 protocol tcp

# 設定したファイアウォールのルールをインターフェイスに設定
$ set interfaces ethernet eth0 firewall in ipv6-modify LAN6_PBR

$ commit; save
```

こうしておけば各端末で優先度の設定を意識することなくルーター側で適切な DSCP 値でパケットを送り出せるようになります。

## 脚注

[^1]: [VPN 越しの Cisco WLC で WPA2 の SSID に associate できない時の罠 - diary.sorah](https://diary.sorah.jp/2017/06/18/wlc-over-flets-ngn-dscp)
[^2]: [Linux - IPv6でscpできない｜teratail](https://teratail.com/questions/109654)
