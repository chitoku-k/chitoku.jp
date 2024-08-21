---
title: Makefile の作成
created: 2013-08-22T02:00:10+09:00
category: PSP プログラミング
prev: /programming/psp/dev
next: /programming/psp/build
---
それではプログラムを作る準備をしていきましょう。  
今回はコンパイラーやリンカーへ指示を行うファイルを作成します。

- コンパイラー
  - プログラミング言語で書かれたコードを機械語に変換するソフトウェア
- リンカー
  - ライブラリー（関数の情報を含むファイル）と生成されたファイルをリンクさせて実行可能なファイルに変換するソフトウェア

Makefile はソースコードと同じフォルダーにおきます。ここでコンパイルオプションや XMB に表示されるアイコンなどを指定できます。

```makefile
TARGET = TEST
OBJS = main.o

CFLAGS = -O2 -G0 -Wall -g
CXXFLAGS = $(CFLAGS) -fno-exceptions -fno-rtti
ASFLAGS = $(CFLAGS)

LIBDIR =
LDFLAGS =
LIBS = -lpspgum -lpspgu

EXTRA_TARGETS = EBOOT.PBP
PSP_EBOOT_TITLE = Test
PSP_EBOOT_ICON = NULL
PSP_EBOOT_ICON1 = NULL
PSP_EBOOT_UNKPNG = NULL
PSP_EBOOT_PIC1 = NULL
PSP_EBOOT_SND0 = NULL

PSPSDK = $(shell psp-config --pspsdk-path)
include $(PSPSDK)/lib/build.mak
```

## Makefile の書き方

指示は `設定項目名 = 指定` の形で行います。スペースはなくても構いませんが、1 行に 1 文です。  
1 行に収まらない場合は行末に `\` を記述して改行して並べていきます。

設定項目名は次のようなものがあります。必要ないときは上の例のように `c¦NULL` を指定するか、または書かないでおきます。

### コンパイラー/リンカー

- `TARGET`
  - コンパイラーが生成するファイル名。
  - たとえば `TEST` にすると関連ファイルが `TEST.*` という名前で出力されます。
- `OBJS`
  - 生成されるオブジェクトファイル名。
  - ソース言語の種類（C やアセンブラー等）にかかわらず拡張子を `.o` にして記述します。
- `CFLAGS`
  - C 言語のコンパイラーオプション。
- `CXXFLAGS`
  - C++ のコンパイラーオプション。
- `ASFLAGS`
  - アセンブラーのオプション。
- `LIBDIR`
  - ライブラリーを読み込むディレクトリー。
- `LDFLAGS`
  - リンカーに渡すオプション。
- `LIBS`
  - 読み込むライブラリー。
  - リンクエラーが発生する場合は何らかのライブラリーが不足しているので指定します。

### 生成物関連

- `EXTRA_TARGETS`
  - 最終的に出力するファイル。
  - PSP では `EBOOT.PBP` を実行するのでこのように記述します。
- `PSP_EBOOT_TITLE`
  - XMB で表示されるタイトル。PSPSDK では日本語は指定できません。
  - 背景がある場合表示されません。
- `PSP_EBOOT_ICON`
  - XMB で表示されるアイコン。
  - サイズ 144×80 の PNG 画像を指定します。
  - なければデフォルトのアイコンが使用されます。
- `PSP_EBOOT_ICON1`
  - XMB で選択されたときに再生される動画。
  - サイズ 144×80 の 500KB 以下の PMF 動画を指定します[^1]。
- `PSP_EBOOT_UNKPNG`
  - XMB で選択されたときに表示される解説用画像。
  - サイズ 310×180 の PNG 画像を指定します。
- `PSP_EBOOT_PIC1`
  - XMB で選択されたときに表示される背景画像。
  - サイズ 480×272 の PNG 画像を指定します。
- `PSP_EBOOT_SND0`
  - XMB で選択されたときに再生される音声。
  - 500KB 以下の ATRCA3plus オーディオを指定します[^2]。

### その他

- `makefile¦PSPSDK = $(shell psp-config --pspsdk-path)`
  - PSPSDK のパス。
- `makefile¦include $(PSPSDK)/lib/build.mak`
  - PSPSDK のデフォルトのビルド用 Makefile。上記項目の設定を渡している本体です。

## 脚注

[^1]: PMF の作成方法: [それとPSP 自作gameboot.pmf動画（起動画面）の作り方メモ](http://touyatakagiri.blog38.fc2.com/blog-entry-390.html)
[^2]: ATRCA3plus の作成方法: [ループ再生できる！at3ファイルの作り方 - ゆうじろうの部屋](https://web.archive.org/web/20170720003555/http://bandersnatch.blog54.fc2.com/blog-entry-89.html)（Wayback Machine）
