---
title: '開発環境の構築: PS2dev & outpatch & elf2pbp3'
created: 2013-08-22T02:00:10+09:00
category: PSP プログラミング
---
PlayStation 2 の開発環境を利用して PSP の開発を行うツール群です。
PlayStation 2 用の実行ファイルを outpatch を用いて PSP 用に変換し、それを elf2pbp3 で実行ファイルに変換します。
SDK が付属していないため、API 定義が必要になります。
PSP 開発の黎明期に利用されていたツールで、現在ではほとんど利用されていません。
またファイルの入手も難しいため、入手先のリンクなどは掲載していません。

通常は [psptoolchain](/programming/psp/psptoolchain)、[Minimalist PSPSDK](/programming/psp/minimalist-pspsdk)、[devkitPro](/programming/psp/devkitpro) のどれかを選択してください。

1. ps2dev をダウンロードします。  
ファイル名: `PS2DevWin32.zip`
1. elf2pbp3 をダウンロードします。  
ファイル名: `elf2pbp3.zip`
1. `Cygwin1.dll` をダウンロードします。  
UNIX 用のソフトウェアを Windows で動作させるためのもので、入手は容易です。  
ダウンロードしたら、`%WINDIR%\system32` に移動しておきます。
1. 1 でダウンロードしたインストーラーを実行します。
1. [SEC](http://sec.pn.to/) の HelloPSP R1 の source code をダウンロードします。  
ファイル名: `hellopsp_src_Rel1.zip`

これで必要なファイルはすべて揃いました。

## ビルドの方法

1. デスクトップあるいは C ドライブ直下にフォルダーを作成します。
1. 先ほどダウンロードした `elf2pbp3.exe`、`outpatch.exe`、`mk.bat` をそこに移動します。
1. `mk.bat` を次のように書き換えます。

```batch
C:\ps2dev\ee\bin\ee-gcc -march=r4000 -g -mgp32 -mlong32 -c hellopsp.c
C:\ps2dev\ee\bin\ee-gcc -march=r4000 -g -mgp32 -mlong32 -c pg.c
C:\ps2dev\ee\bin\ee-gcc -march=r4000 -g -mgp32 -c -xassembler -O -o startup.o startup.s
C:\ps2dev\ee\bin\ee-ld -O0 startup.o hellopsp.o pg.o -M -Ttext 8900000 -q -o out > hellopsp.map
outpatch
@echo PSP の ELF ファイルが生成されました。
elf2pbp outp
pause
```

`mk.bat` を起動すると `EBOOT.PBP` が生成されます。  
SDK がないので使用する API をすべて手動でリンクする必要があります。

この開発方法については説明しません。
