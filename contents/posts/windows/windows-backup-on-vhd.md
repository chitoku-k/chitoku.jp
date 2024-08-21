---
title: Windows バックアップで NAS を使う
created: 2018-03-18T18:40:35+09:00
category: Windows
tags:
  - VHD
  - バックアップ
---
NAS があると PC のバックアップ先に利用することも多いと思いますが、Windows 7 では Professional 以上のエディションでないと Windows バックアップからネットワークバックアップを選択することができません[^1][^2]。
Windows 8 以降ではすべてのエディションで有効になっていますが、ここでは Windows 7 Home Premium で NAS にバックアップを保存してみます。

## VHD を作成する

Windows 7 では VHD という仮想ディスクのファイル形式がネイティヴでサポートされ、これをマウントすることで物理的に接続された HDD と同じように扱うことができるようになりました[^3]。

1. [コントロール パネル] → [ディスクの管理] を開く
1. [操作] → [VHD の作成] で NAS 上に容量固定の仮想ディスクを作成する
1. 作成した仮想ディスクにフォーマットを実行する
1. [ドライブ文字とパスの変更] からドライブ文字を設定しておく

Buffalo の NAS に 200 GB の仮想ディスクを作成しましたが約 1 時間で完了しました。

<!-- more -->

## Windows バックアップを設定する

仮想ディスクをマウントしたら Windows バックアップの保存先として指定しておきます。手順は省略。

## VHD を起動時に割り当てる

ネットワークドライブと異なり VHD はコンピューターを再起動しても自動で再割り当てが行われません。
バックアップ先のディスクを毎回自分で割り当てるのは面倒なので、タスクスケジューラから起動時に割り当てが行われるように設定します[^4]。

まずは VHD の割り当てツールである DiskPart に実行させるコマンドリストを作成します。
適当な場所に任意のファイル名で保存しておきます。
VHD ファイルのフルパスを指定する際に、管理者権限からアクセスできるようにするために `\\192.168.1.100\share\disk.vhd` のように **UNC（ドメイン名かコンピューター名から記述する）** である必要があります[^5]。

```
SELECT VDISK FILE="VHDファイルのフルパス"
ATTACH VDISK
```

続いてこのコマンドリストを起動時に実行されるように設定します。

1. [コントロール パネル] → [タスク スケジューラ] → [タスクの作成] を開く
1. [全般] タブで [タスクの実行時に使うユーザー アカウント] を SYSTEM に変更する[^6]
1. [トリガー] タブで [スタートアップ時] のトリガーを追加する
1. [操作] タブで [プログラムの開始] の操作を追加する
    1. [プログラム/スクリプト] には `C:\Windows\System32\diskpart.exe` を指定する
    1. [引数の追加] には `-s "作成したコマンドリストのフルパス"` を指定する（パスは UNC で記述する）

あとは再起動して自動で割り当てられることを確認してください。

## 脚注/参考

[^1]: [バックアップの保存に適した場所](https://web.archive.org/web/20160609082103/http://windows.microsoft.com/ja-jp/windows7/Where-should-I-save-my-backup)（Wayback Machine）
[^2]: [徒然事: Windows 7 Home Premiumで、NASにバックアップをとる方法](https://tomoseki.blogspot.com/2013/09/windows-7-home-premiumnas.html)
[^3]: [澤田 賢也 | Windows 7 の VHD 形式ファイル利用について : VHD ファイルを使ってみる (基礎編)](https://learn.microsoft.com/ja-jp/previous-versions/msdn10/dd875657(v=msdn.10))
[^4]: [Windows 10でVHDファイルをドライブとしてマウントする：Tech TIPS - ＠IT](https://atmarkit.itmedia.co.jp/ait/articles/1702/03/news153.html)
[^5]: [管理者権限のあるコマンドプロンプトからマップしたドライブにアクセスする：Tech TIPS - ＠IT](https://www.atmarkit.co.jp/ait/articles/1502/27/news149.html)
[^6]: [タスクスケジュールの実行アカウント](https://www.vwnet.jp/windows/WS12R2/TaskSchedule/ExecAccunt.htm)
