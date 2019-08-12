---
title: strongSwan 5.8.0 の systemd ユニット変更に対応する
created: 2019-06-15T15:50:13+09:00
category: コンピューター
---
2019/5/20 にリリースされた strongSwan 5.8.0[^1]ですが、systemd のユニットが以下のように更新されました。

> Renaming of systemd Service Units
>
> The `systemd` service units have been renamed. The modern unit (charon-systemd
> with vici/swanctl), which was called _strongswan-swanctl_, is now called
> _strongswan_ (the previous name is configured as alias in the unit, for which
> a symlink is created when the unit is enabled). The legacy unit
> (starter/charon with ipsec/stroke) is now called _strongswan-starter_.

このリリースによって、今まで `strongswan` ユニットを使っていたシステムではその実体が `charon-systemd + vici/swanctl` を使ったものに変更されます。

+------------+----------------------+-------------------------------+
| バージョン | ユニット             | 実体                          |
+------------+----------------------+-------------------------------+
| < v5.8.0   | `strongswan`         | starter/charon + ipsec/stroke |
+            +----------------------+-------------------------------+
|            | `strongswan-swanctl` | charon-systemd + vici/swanctl |
+------------+----------------------+-------------------------------+
| \>= v5.8.0 | `strongswan`         | charon-systemd + vici/swanctl |
+            +----------------------+-------------------------------+
|            | `strongswan-starter` | starter/charon + ipsec/stroke |
+------------+----------------------+-------------------------------+

<!-- more -->

そしてこの `charon-systemd + vici/swanctl` では従来の `/etc/ipsec.conf` の読み込みを行わないため、更新後にそのまま再起動すると IPsec が一切確立しなくなります。

```
charon-systemd[625]: no IKE config found for 2001:db8::1...2001:db8::2, sending NO_PROPOSAL_CHOSEN
charon-systemd[625]: generating IKE_SA_INIT response 0 [ N(NO_PROP) ]
```

## 環境

| 項目       | 名称                      |
| ---------- | ------------------------- |
| OS         | Arch Linux（Linux 5.1.9） |
| strongSwan | swanctl 5.8.0             |

## 対応 1: 旧来のユニットに差し替えて使い続ける

設定ファイルのマイグレーションを行いたくない場合はこちらを選択します。

```bash{outputLines: 1,4,5}
# 切り替え
systemctl stop strongswan
systemctl start strongswan-starter

# 起動ユニットの修正
systemctl disable strongswan
systemctl enable strongswan-starter
```

## 対応 2: 設定ファイルを移行して新ユニットを使う

strongSwan Wiki に記載されているマイグレーションガイド[^2]に従って設定ファイルを移行する方法もあります。
従来の設定ファイルでは対応しない機能の追加も行われているようなので公式はこちらを推奨しているようです。
実際に L2TP/IPsec 用の設定を移行してみましたが、以下のように記法が大幅に変更されているので少し手間がかかります。

新設定（`/etc/swanctl/swanctl.conf`）

```
connections {
    lt2p-nat {
        local_port = 4500
        remote_port = 4500

        proposals = aes128-sha1-modp2048,aes128-sha1-modp1024,default

        local {
            auth = psk
        }
        remote {
            auth = psk
        }
        children {
            l2tp-nat {
                mode = transport
                esp_proposals = aes128-sha1-modp2048,aes128-sha1-modp1024,default
                remote_ts = 0.0.0.0/0
            }
        }
    }
}
```

旧設定（`/etc/ipsec.conf`）

```
conn l2tp-nat
    type=transport
    leftauth=psk
    leftikeport=4500
    rightauth=psk
    rightikeport=4500
    rightsubnet=0.0.0.0/0
    ike=aes128-sha1-modp2048,aes128-sha1-modp1024
    esp=aes128-sha1-modp2048,aes128-sha1-modp1024
```

## 脚注

[^1]: [strongSwan - strongSwan 5.8.0 Released](https://www.strongswan.org/blog/2019/05/20/strongswan-5.8.0-released.html)
[^2]: [Migration from ipsec.conf to swanctl.conf - strongSwan](https://wiki.strongswan.org/projects/strongswan/wiki/Fromipsecconf)
