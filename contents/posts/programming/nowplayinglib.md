---
title: NowPlayingLib を公開しました
created: 2015-01-12T00:26:16+09:00
category: プログラミング
tags:
  - C#
---
.NET Framework から利用可能なライブラリ「NowPlayingLib」を公開しました。
Windows 上で動作している音楽プレーヤーと連携して、再生中の曲の情報を取得したり、基本的な操作を行ったりすることができるライブラリです。
次の音楽プレーヤーに対応しています。

- Windows Media Player
- iTunes
- x-アプリ
- LISMO Port（x-アプリ for LISMO）
- foobar2000（要 [COM Automation server](https://foosion.foobar2000.org/0.9/#comserver) コンポーネント）

ライブラリならびにソースコードは GitHub 上で MIT ライセンスで公開されています。  
[https://github.com/chitoku-k/NowPlayingLib](https://github.com/chitoku-k/NowPlayingLib)

## 注意

- このライブラリーは .NET Framework 4.5 のみに対応しています。
- アルバムアートワークは foobar2000 では取得できません。

<!-- more -->

## 使い方

1. 上記 GitHub ページの [Releases](https://github.com/chitoku-k/NowPlayingLib/releases) より最新バージョンをダウンロードします。
1. 使用するプロジェクトの [参照設定] を右クリックして、[参照の追加] をクリックします。
1. 右下の [参照] ボタンよりダウンロードしたライブラリーを参照に追加します。

（気が向いたら NuGet に入れます）

## リファレンス

### インスタンスの生成

使用する音楽プレーヤーのインスタンスを生成します。この操作には時間がかかる場合があります。

音楽プレーヤーがすでに起動している場合はアプリケーションが音楽プレーヤーに関連付けられ、起動していない場合は音楽プレーヤーが起動します。
音楽プレーヤーとの接続はライブラリー内部で共有されているため、いずれかのインスタンスに対して破棄を要求した場合でもすべてのインスタンスで接続は切断されたことになります。

```csharp
var wmp    = new NowPlayingLib.WindowsMediaPlayer();
var itunes = new NowPlayingLib.iTunes();
var xapp   = new NowPlayingLib.XApplication();
var lismo  = new NowPlayingLib.LismoPort();
var foobar = new NowPlayingLib.Foobar2000();
```

インスタンスの生成に失敗した場合は `csharp¦System.TypeInitializationException` がスローされます。
原因となった例外（ほとんどの場合 `csharp¦System.Runtime.InteropServices.COMException`）は `InnerException` プロパティで取得できます。

### 現在再生している曲の情報を取得する

音楽プレーヤーが現在再生している曲の情報を取得します。
取得できる場合はアルバムアートも格納されます。
音楽プレーヤーが曲を再生していない場合 `csharp¦null` が返ります。
時間のかかる操作は非同期で行われます。

```csharp
NowPlayingLib.MediaItem media = await player.GetCurrentMedia();
```

### 音楽プレーヤーにイベントを設定する

`csharp¦NowPlayingLib.INotifyPlayerStateChanged` を実装している音楽プレーヤー（x-アプリと LISMO Port 以外）の場合は音楽プレーヤーが再生している曲が変更された場合などにそのイベントをハンドルすることができます。

```csharp
player.CurrentMediaChanged += (sender, e) => Console.WriteLine(e.CurrentMedia);
```

### 音楽プレーヤーを操作する

`Play`, `Pause`, `Stop`, `Rewind`, `FastForward`, `PreviousTrack`, `NextTrack` の各メソッドで音楽プレーヤーを操作できます。
また `CurrentPosition` プロパティで再生位置を取得または設定、`PlayerState` プロパティで再生状態を取得できます。

### 音楽プレーヤーとの接続を切断する

各インスタンスは `csharp¦System.IDisposable` を実装しており、`Dispose` を呼び出したり `csharp¦using` ステートメントで囲ったりすることで適切にリソースを解放することができます。
内部実装で利用される COM オブジェクトは自動的に解放されます。

## その他

バグ等は GitHub のレポジトリページの [Issues](https://github.com/chitoku-k/NowPlayingLib/issues) よりご報告ください。
