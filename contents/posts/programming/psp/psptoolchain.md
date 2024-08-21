---
title: '開発環境の構築: psptoolchain'
created: 2014-12-30T23:20:04+09:00
category: PSP プログラミング
prev: /programming/psp/dev
next: /programming/psp/makefile
---
UNIX 系 OS で PSP の開発環境をインストールするスクリプト、psptoolchain を実行する方法を解説します。
開発に使用するコンピューターが Windows を実行している場合は、[Minimalist PSPSDK](/programming/psp/minimalist-pspsdk) および [devkitPro](/programming/psp/devkitpro) を参照するか、Ubuntu の仮想環境を建ててしまっても構いません。

このページでは macOS と Ubuntu で解説しますが、それ以外の環境でも使用することができるはずです。
Ubuntu 以外の Linux の場合は `prepare-debian-ubuntu.sh` の中身を見ながら適当な依存関係を入れてください。

## macOS

Xcode と Homebrew をインストールしてから、ターミナルで環境を構築します。

1. Mac App Store にて [Xcode](https://apps.apple.com/jp/app/xcode/id497799835) をインストールして、未起動なら一度起動しておきます。
1. [Homebrew](https://brew.sh/) をインストールします。
1. ターミナルで [pspdev/psptoolchain](https://github.com/pspdev/psptoolchain) をインストールします。

```bash
$ git clone 'https://github.com/pspdev/psptoolchain.git'
$ cd psptoolchain
$ sudo ./prepare-mac-os.sh
```

## Ubuntu

1. ターミナルで [pspdev/psptoolchain](https://github.com/pspdev/psptoolchain) をインストールします。

```bash
$ git clone 'https://github.com/pspdev/psptoolchain.git'
$ cd psptoolchain
$ sudo ./prepare-debian-ubuntu.sh
```

## エラーが出た場合

環境によってはエラーが出る場合があります。
ただし、コンパイラーの警告（Warning）などは無視して構いません。
それ以外の場合、必要なパッケージが不足していないか、途中でインターネット接続が切断されていないか、などを確認してください。
