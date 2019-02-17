---
title: CSS ハックまとめ
created: 2014-10-19T12:28:24+09:00
category: プログラミング
tags:
  - CSS
---
<div class="text-center alert alert-danger">
もはや CSS ハックを使用してバグを克服する時代ではないので更新されていません。<br />
Internet Explorer 対策にあてる時間でアニメでも見ましょう。
</div>

## 「CSS ハック」とは

現在、様々なバージョンのブラウザーがリリースされていますが、その全てが正しい表示をするわけではありません。
最新のプロパティーに対応していなかったりするのはもちろんのこと、特に Internet Explorer 6 には多くのバグが知られています。
そんなバグを克服する手段として編み出されたのが、**「CSSハック」**です。

これは、ブラウザーのバグを逆手に取って、本来は適用されないはずの記述を、特定のブラウザーにのみ適用させるという手法です。
CSSハックを利用することで、他のブラウザーへの影響なくして、特定のブラウザー専用の記述を行うことができるため、レイアウトのズレや、非対応プロパティーへの代替手段の提供などが容易になるのです。

そんなわけで、Webサイトのレガシーブラウザー対応には、もはや必須となったCSSハック。
未だ根強い人気を誇る(?)、Internet Explorer 6 などを中心に紹介していきます。

<!-- more -->

## Internet Explorer

### Internet Explorer 5 以下

```css
#hack {
    /* IE 5 以下 */
    color: blue;
    voice-family: "\"}\"";
    voice-family: inherit;

    /* その他 */
    color: red;
}
```

指定されている、`css:"\"}\""` でそのセレクタの読み込みを止めてしまうバグを利用したハックです。
セレクタの最後に記述するなど、順番を工夫する必要があります。
Validation では**有効**な記述です。**Tantek Box Model Hack** と呼ばれています。

### Internet Explorer 6 以下

```css
#hack {
    /* IE 6 以下 */
    _color: blue;

    /* その他 */
    color: red;
}
```

プロパティーの先頭に `css:_` をつけます。**アンダースコアハック** と呼ばれています。Validation では**無効**な記述です。

### Internet Explorer 7 以下

```css
#hack {
    /* IE 7 以下 */
    *color: blue;

    /* その他 */
    color: red;
}
```

プロパティーの先頭に `css:*` をつけます。Validation では**無効**な記述です。

```css
#hack {
    /* IE 7 以下 */
    #color: blue;

    /* その他 */
    color: red;
}
```

プロパティーの先頭に `css:#` をつけます。**ハッシュハック** と呼ばれています。Validation では**無効**な記述です。

### Internet Explorer 10/9/8/7/6

```css
#hack {
    /* IE 11 以上/その他 */
    color: red;

    /* IE 10/9/8/7/6 */
    color: blue\9;
}
```

値の末尾に `css:\9` をつけます。Internet Explorer 11 以上で修正されています。Validation では**無効**な記述です。

### Internet Explorer 9 以上

```css
#hack {
    /* その他 */
    color: red;
}
#hack:not(:target) {
    /* IE 9 */
    color: blue\9;
}
```

セレクタの末尾に `:not(:target)` をつけます。さらに、モダンブラウザーを弾くために、値の末尾に `\9` をつけます。Validation では**無効**な記述です。

### Internet Explorer の判別

```css
#hack {
    /* IE 5 */
    color: brown;
    voice-family: "\"}\"";
    voice-family: inherit;
    /* その他 */
    color: red;
    /* IE 8 */
    color: blue\9;
    /* IE 7 */
    *color: green;
    /* IE 6 */
    _color: orange;
}
#hack:not(:target) {
    /* IE 9/10 */
    color: black\9;
}
```

## Firefox/Google Chrome/Safari/Opera/...

一般的にモダンブラウザーと呼ばれているブラウザー各種ですが、Internet Explorer と違い頻繁にアップデートされ、またバグもよく修正されているので、CSS ハックは必要ないでしょう。
これらのブラウザーのどれかで表示崩れが起きる場合は、もっぱら記述ミスであることがほとんどです。
それとベンダープレフィックス（`-moz-`, `-webkit-`, `-o-` など）のみで対応しているプロパティやセレクターも確認しておくとよいでしょう。

モダンブラウザーの「CSSハック」として紹介されているものはほとんどがベンダーの独自拡張を利用したものです。
厳密に言えばこれらは「CSSハック」ではないですし、将来的に使えなくなる場合があります。

## Validator 妥当性について

このページに記載されている CSSハックはほとんどが Validation では無効な記述ですが、Web ページは Validator を通すために作っているわけではありません。
目的を持って CSSハックを利用している分には問題ないと考えます。

ほかにも Validation を正しく通る CSSハックも数多くありますが、どれも記述が冗長なものばかりです。
CSSハックは、その性質上、メンテナンス性を上げる側面もあるはずなので、短く手軽なのが一番ではないでしょうか。

※ Internet Explorer に関して言えば、条件付きコメントなどの独自構文で対応するのが、**文法的には**正確です。
