---
title: WPF での画像読み込みをバックグラウンドで処理する
created: 2014-11-29T23:01:18+09:00
category: プログラミング
tags:
  - C#
  - WPF
---
WPF でインターネット上にある画像を表示させる場合、その URI を `BitmapImage` に指定することで表示することができます。

```xaml
<Image>
    <Image.Source>
        <BitmapImage UriSource="https://chitoku.jp/img/icon.png" />
    </Image.Source>
</Image>
```

```csharp
var img = new Image();
img.Source = new BitmapImage(new Uri("https://chitoku.jp/img/icon.png"));
```

```csharp
var img = new Image();
var source = new BitmapImage();
source.BeginInit();
source.UriSource = new Uri("https://chitoku.jp/img/icon.png");
source.EndInit();
img.Source = source;
```

でもこの `BitmapImage` における読み込み処理は UI スレッドで行われているようです。
つまり、画像のダウンロードに時間がかかったり、画像の数が多かったりすると、他の要素の表示速度にも影響を与えることがあるということです。
今回は、XAML 側から利用できるバッググラウンド処理の機構を考えてみます。

<!-- more -->

## 要件

- 画像のダウンロードと生成がバックグラウンド（UI スレッド以外のスレッド）で処理されること
- XAML またはデータバインディングで URI を指定できること
- `csharp:System.Windows.Controls.Image` と `csharp:System.Windows.Media.ImageBrush` で使用できること

## バックグラウンドで画像を生成する

最近の .NET 開発では非同期型の記述が容易になりましたが、WPF ではその性質上、オブジェクトがスレッドをまたぐ際にその扱いに制約があります。
ここでのオブジェクトは `Freezable` の派生クラスを指します。
`csharp:System.Windows.Media.Imaging.BitmapImage` もこれにあたります。

- UI スレッドで表示に用いられるオブジェクトは UI スレッドで生成する
- 非 UI スレッドで生成したオブジェクトを UI スレッドで使用する場合は `Freeze`（変更不可能化）する必要がある

また、非 UI スレッドで生成したオブジェクトに対して `Freeze` を呼び出さずに UI スレッドで使用した場合は例外が発生します。

> System.ArgumentException: DependencySource は、DependencyObject と同じ Thread 上で作成する必要があります。

これを考慮して、`BitmapImage` を生成した後は変更不可能化の処理をしておきます。
画像生成のクラス（Model 側）は次のようなコードになります。

`gist:chitoku-k/bf2368ed640fecfdab9e#LazyBitmapImage.cs`

## 添付プロパティを登録して XAML から呼び出し可能にする

さてここでは XAML 側から画像の読み込みメソッドを呼び出すわけですが、このような場合はビヘイビアという手法を用いるのが一般的なようです。
Expression Blend にはビヘイビアを利用できるクラスが用意されていますが、今回は添付プロパティを実装した静的クラスを作成してその代用とします。

`gist:chitoku-k/bf2368ed640fecfdab9e#LazyImageBehavior.cs`

## XAML からコードを呼び出す

あとはこれを XAML から次のように呼び出せば、バックグラウンドから画像を非同期で生成、取得して表示することができます。

```xaml
<Image behaviors:LazyImageBehavior.LazySource="https://chitoku.jp/img/icon.png" />
```

ここでは XML 名前空間を `behaviors:` としましたが、プロジェクトに合わせて適当に設定してください。お疲れさまでした。
