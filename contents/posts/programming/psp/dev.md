---
title: 開発環境の構築
created: 2014-10-10T22:54:04+09:00
category: PSP プログラミング
---
実際にコードを書く前に、まずは開発に必要なツールを準備します。
書いたコードを PSP が実行できる形式に変換するソフトウェアとして、コンパイラーなどが必要になります。
現在では、有志により PSP 専用の開発ツール群である psptoolchain が用意されており、一般的には psptoolchain またはその移植版を使用するのが主流です。
使用している OS に合った開発環境をセットアップしてください。

## psptoolchain

UNIX 系 OS 用の PSP 開発ツール群を自動構成するスクリプトで、このスクリプトないしはその移植版が PSP 開発においては広く利用されています。
コンパイラーとして psp-gcc をインストールするほか、PSPSDK と各種ライブラリ群も自動でセットアップされます。

Linux や macOS 上で開発する場合はこのツールを使用してください。

## Minimalist PSPSDK

psptoolchain で構成される環境を Windows に移植したソフトウェアです。

Windows 上で開発する場合はこのツールか次の devkitPro を使用してください。

## devkitPro

psptoolchain で構成される環境を Windows に移植したソフトウェアを含むツール群です。
devkitPro は Wii や DS、ゲームボーイアドバンスなどの自作ソフトのための開発環境で、PSP 用がこのツールに含まれています。

Windows 上で開発する場合はこのツールか前の Minimalist PSPSDK を使用してください。

## PS2dev & outpatch & elf2pbp3

PlayStation 2 の開発環境を利用して PSP の開発を行うツール群です。
PlayStation 2 用の実行ファイルを outpatch を用いて PSP 用に変換し、それを elf2pbp3 で実行ファイルに変換します。
SDK が付属していないため、API 定義が必要になるほか、現在ではファイルの入手が困難なためオススメできません。
PSP 開発の黎明期に利用されていたツールで、現在ではほとんど利用されていません。

通常は psptoolchain、Minimalist PSPSDK、devkitPro のどれかを選択してください。

## PSPLINK

作成したプログラムを効率的にデバッグするためのツールです。
