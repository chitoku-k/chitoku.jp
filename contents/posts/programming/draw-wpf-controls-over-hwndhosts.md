---
title: WebBrowser や WindowsFormsHost の上に描画する
created: 2014-12-25T23:38:01+09:00
category: プログラミング
tags:
  - WPF
---
大した記事ではないですが備忘録代わりに。

WPF には Windows 上で動く手前、そのほとんどが DirectX で描画されている一方で、Win32 時代の遺産を利用できるようにするために、`csharp¦System.Windows.Interop.HwndHost` という相互運用機構が用意されています。
これを実装するコントロールを利用することで WPF でも ActiveX や Windows Forms のコントロールを利用することができるようになっています。
そして Web ページを表示する機能を持つ `WebBrowser` コントロールも同様に `HwndHost` の派生クラスです。

`HwndHost` は `FrameworkElement` の派生クラスでこそありますが、継承しているプロパティの多くが他の WPF コントロールのようには動作しません。
透明度や変形といった WPF 特有の機能のほか、スクロール領域や要素の切り取り、重ね合わせといったレイアウトにも対応していません。
これはたとえば次のような例で問題が起きます。

<!-- more -->

```xaml
<Grid>
    <WebBrowser />
    <TextBlock Text="WebBrowser Control"
               HorizontalAlignment="Center"
               VerticalAlignment="Center" />
</Grid>
```

通常 `Grid` コントロールでは XAML で後に書かれている要素が重なって上に表示されますが、`HWndHost` ではこれが正しく機能せず、`TextBlock` は `WebBrowser` コントロールの裏側に表示されるため見えなくなります。
`WindowsFormsHost` でも同様です。

これは一部で“領空問題”（Airspace Problem）と呼ばれている問題で、いろいろな解決方法が示されていますが、単純にその上に別要素を描画したいだけであれば次のように書くことで対応することができます。

```xaml
<Grid>
    <WebBrowser Name="WebBrowser" />
    <Popup IsOpen="True"
           AllowsTransparency="True"
           Placement="Center"
           PlacementTarget="{Binding ElementName=WebBrowser}">
        <TextBlock Text="WebBrowser Control"
                   HorizontalAlignment="Center"
                   VerticalAlignment="Center" />
    </Popup>
</Grid>
```

使用するのは `Popup` クラスです。
このクラスは継承関係こそありませんが `ContextMenu` のようなウィンドウをまたいだり、他のウィンドウの上に表示されたりする要素を描画するために用いられる要素です。
Windows の API では WPF と違い、ウィンドウ、ボタン、ドロップダウンメニューといったほとんどの UI 要素がウィンドウとして扱われているため、その上に描画させるには同じくウィンドウとして扱われる実装を持つ `Popup` を使うことで WPF コントロールを描画することができるようになります。

ただ、高度なイベントを取得して連携する場合などは同じサイズのウィンドウをぴったり貼り付けて追従させるなどの実装が必要になるかもしれません。

参考：[WPF と Win32 の相互運用性 | Microsoft Learn](https://learn.microsoft.com/ja-jp/dotnet/desktop/wpf/advanced/wpf-and-win32-interoperation)
