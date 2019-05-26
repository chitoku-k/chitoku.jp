---
title: Hello World のビルド
created: 2013-08-23T00:25:42+09:00
category: PSP プログラミング
prev: /programming/psp/build
next: 
functions:
  - pspDebugScreenInit
  - pspDebugScreenSetXY
  - pspDebugScreenPrintf
  - pspDebugScreenClear
macros:
  - PSP_MODULE_INFO
  - PSP_MAIN_THREAD_ATTR
---
では実際にプログラムを作ってみましょう！  
初めは `Hello World` を画面に表示させるというのが慣習ですので作ってみます。

## プロジェクトの作成とビルド

1. [プロジェクトの作成](/programming/psp/build) のとおりにプロジェクトを作成します。  
「ソリューションのディレクトリを作成」のチェックを外しておきましょう。
1. ソリューションが作成されたら「ソリューション エクスプローラー」でプロジェクトを右クリックして、「追加(D)」→「新しい項目(W)...」を選択します。
1. 出てきたウィンドウで「C++ ファイル (.cpp)」を選び、ファイル名に「main.c」と入力します。  
ファイルが作成されますので以下の枠内の内容をコピーして保存します。

```c{numberLines: true}
#include <pspkernel.h>
#include <pspdebug.h>

PSP_MODULE_INFO("Hello World", PSP_MODULE_USER, 1, 1);
PSP_MAIN_THREAD_ATTR(PSP_THREAD_ATTR_USER);

int main(int argc, char *argv[])
{
    pspDebugScreenInit();
    pspDebugScreenSetXY(0, 0);
    pspDebugScreenPrintf("Hello World!!");

    return 0;
}
```

4. 続いて [Makefile の作成](/programming/psp/makefile) で作成した Makefile をプロジェクトフォルダー[^1]にコピーします。
1. ソリューションを保存して「ビルド」をクリックします。

下部の「出力」でビルドが正常に完了したのを確認すると、プロジェクトフォルダー[^1]に `EBOOT.PBP` が出力されているはずです。

## 転送

1. PC でメモリースティックを開いて「PSP」→「GAME」と開きます。
1. 適当な名前のフォルダーを半角英数字（`UPDATE` 以外）で作成し、生成された `EBOOT.PBP` をその中にコピーします。

## 起動

1. PSP を起動して XMB の「ゲーム」を開きます。
1. Makefile で指定したタイトルのゲームを一覧から選択して起動します。
1. 画面に以下のように黒地に白文字で `Hello World!!` と表示されれば成功です。  
HOME ボタンのための処理を書いていないので、電源を切って終了します。

![](../../media/programming-psp-helloworld-screenshot.png)

## まとめ

PSP のプログラムを作るときは、プロジェクトを作成してから Makefile とソースコードを記述していきます。
コンパイラーはこの Makefile がないとコンパイルやリンクの作業を行うことができません。

また、今回のプログラムはデバッグスクリーンという機能で文字の表示を行いました。
この機能は日本語の表示には対応していませんが、デバッグ用途での文字列出力には便利に使用することができます。
CFW ではプラグインの設定画面などでも頻繁に使用されている機能です。

## API リファレンス

<pspsdk-macro name="PSP_MODULE_INFO"><div>
実行モードには次の定数が定義されています。

- `c:PSP_MODULE_KERNEL (0x1000)` - カーネルモード
- `c:PSP_MODULE_USER (0)` - ユーザーモード

</div></psp-sdk-macro>

<pspsdk-macro name="PSP_MAIN_THREAD_ATTR"><div>
スレッドの種類には次の定数が定義されています。  

- `c:PSP_THREAD_ATTR_VFPU` - VFPU（ベクトル演算を行うための FPU）へのアクセスを有効化
- `c:PSP_THREAD_ATTR_USER` - ユーザーモード
- `c:PSP_THREAD_ATTR_USBWLAN` - USB/無線 LAN の API を有効化
- `c:PSP_THREAD_ATTR_VSH` - VSH の API を有効化
- `c:PSP_THREAD_ATTR_SCRATCH_SRAM` - スクラッチパッドメモリーを使用（Ver 1.0 では使用不可）
- `c:PSP_THREAD_ATTR_NO_FILLSTACK` - スタックの `c:0xFF` クリアを無効化
- `c:PSP_THREAD_ATTR_CLEAR_STACK` - スレッド削除時にスタックをクリア
- `c:0` - カーネルモード

</div></psp-sdk-macro>

<pspsdk-function name="pspDebugScreenInit"></psp-sdk-function>

<pspsdk-function name="pspDebugScreenSetXY"></psp-sdk-function>

<pspsdk-function name="pspDebugScreenPrintf"></psp-sdk-function>

<pspsdk-function name="pspDebugScreenClear"></psp-sdk-function>

## 脚注

[^1]: 通常は「ドキュメント」→「Visual Studio 2017」→「Projects」→「プロジェクト名」になります
