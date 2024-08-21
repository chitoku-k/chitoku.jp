---
title: RecoTw Explorer を書き直したら思ったより大きくなった話
created: 2015-02-08T15:35:45+09:00
category: プログラミング
---
今までバグをたくさん放置したままレンタルサーバーで抱えていた RecoTw Explorer（詳細は [GitHub](https://github.com/RecoTwExplorer/RecoTwExplorer) へ）をいろいろ変更してリニューアルしたので告知ついでに。

## TypeScript で書き直した

今まで全体が JavaScript で書かれていましたが、クロージャを駆使しながらクラスのように記述する書き方や、型制約のない緩い言語仕様に嫌気が差したので、今回初めて altJS で書くことにし、TypeScript を採用してみました。
C# 好きにはたまらない構文（設計者が同じらしいですね）、静的な型付けによるコンパイル時のエラー検出と強力な入力補完、ECMAScript の先進的機能の先取り実装（アロー関数など）、挙げたらキリがないほど導入のメリットは大きく、今まで書いた中では C# と同じくらいの感動を覚えました。

<!-- more -->

```javascript
var RecoTwExplorer;
RecoTwExplorer.Model = (function () {
    var entries;
    return {
        getRecoTwEntry: function (id) {
                                                      // ↓補完が効かない場合が多い
            return entries.filter(function (x) { return x.tweet_id === id; })[0];
        },
    };
})();
```

```typescript
module RecoTwExplorer {
    interface RecoTwEntry {
        id: string;
        tweet_id: string;
        content: string;
        target_id: string;
        target_sn: string;
        record_date: string;
    }

    class Model {
        private static entries: RecoTwEntry[];
        public static getEntry(id: string): RecoTwEntry {
                                     // ↓補完が効く
            return Model.entries.filter(x => x.tweet_id === id)[0];
        }
    }
}
```

## ついでに linq.js を採用した

前々から気になっていた C# 的な配列操作用のライブラリを JavaScript 上で再現する linq.js を今回採用してみました。
TypeScript といえば他の altJS と比較してその型付けの強さが特徴的ですが、IDE が型推論を効かせながらアロー関数で C# ライクに記述することができるのはやはり TypeScript の強い型付けのおかげとも言えるでしょう。
（もっとも、最近の IDE はバックグラウンドで JavaScript を実行しながら型推論候補を提示してきたりとなかなか賢くなっていますが）

まあ何より今まで `javascript¦for` 文のループで記述していたような処理までライブラリに任せて簡潔に記述できる上、遅延評価の恩恵まで受けられるとなれば使うしかないでしょう！ってわけでこんな感じで変わりました。
~~いちいち `javascript¦function (x) { return x; }` とかやってられねーって感じなので、~~公平を期すためにどちらも TypeScript です。

```javascript
var users = {};
for (var i = entries.length - 1; i >= 0; i--) {
    if (users[entries[i].target_id] === void 0) {
        users[entries[i].target_id] = {
            target_sn: entries[i].target_sn,
            count: 1
        };
    } else {
        users[entries[i].target_id].count++;
    }
}

var result = Object.keys(users).map(x => users[x]);
result.sort((a, b) => {
    if (a.count === b.count) {
        return a.target_sn.toLowerCase() < b.target_sn.toLowerCase() ? -1 : 1;
    } else {
        return a.count > b.count ? -1 : 1;
    }
});
```

```typescript
var result = Enumerable.from(entries)
                       .groupBy(x => x.target_id)
                       .select(x => ({ target_sn: x.lastOrDefault().target_sn, count: x.count() }))
                       .orderByDescending(x => x.count)
                       .thenBy(x => x.target_sn.toLowerCase())
                       .toArray();
```

もう違いは一目瞭然ですね。
LINQ の視認性の高さに加え、このような処理は自前で書くよりライブラリに任せたほうがバグを作りこむ心配も低くなります。

※ 上のコードについて「JavaScript 力が低いぞ、ここはこう書けば短くなる」って言うのがあれば教えてください。

## さらに IE 9 未満を見捨てた

先ほどのコードでも出ていますが、Internet Explorer 9 以降では ECMAScript 相当の対応バージョンが上がったため、`Array` に `filter` や `map` などの便利なメンバー関数が追加されたほか、`Object` のキーだけ集めた配列を取得できるようになりました。
Windows XP 最新の IE 8 なんかもう滅びたんや…………。

## って感じで公開したのが ver 2.00 でした

以前より MIT ライセンスでしたが、このバージョンから GitHub でリポジトリを開いて GitHub Pages にホストさせてみることにしました。
無料で独自ドメインまで使えてハッピーです。

[RecoTwExplorer/RecoTwExplorer (GitHub)](https://github.com/RecoTwExplorer/RecoTwExplorer)

そしてこれを開いたところ [@hnle0](https://twitter.com/hnle0) さんや [@snvx](https://twitter.com/snvx_) さんなどのコントリビューションを受けることになりました。
ありがとうございます。

## ビルド/デプロイがリモートで

ここからは [@hnle0](https://twitter.com/hnle0) さんにやっていただいた作業についてです。

当初は Visual Studio の TypeScript プロジェクトをそのままリモートに同期させていましたが、特定の環境でしかビルドできないのは不便ということでいろいろ教えてもらって Node.js で gulp を用いたビルド環境を構築し、さらに Travis CI での自動ビルド/デプロイの作業までやってもらいました。
感謝感謝です。

## BrowserSync でのデバッグ

また [BrowserSync](https://browsersync.io/)（gulp では [gulp-browser-sync](https://browsersync.io/docs/gulp/)）というデバッグ支援のツールも導入してもらいました。
自動的にローカル サーバーを立ち上げて、各種ブラウザや同じネットワークに接続するスマートフォンやタブレット（！！！）からリアルタイムでその状況を同期できるツールです。
スクロールやフォームの入力内容など開いているブラウザがソケット通信を通じて、全ての状態が自動的に同期されるときの快適さは圧巻です。
こちらは [gulp-watch](https://github.com/floatdrop/gulp-watch) のような機能を持ち合わせていて、対象のファイルが PC 上で変更されると必要に応じてページが読み込み直されたり、CSS や画像の場合は再読み込みなしでそれが適用されるようになっています。
Chrome の DevTools で数値を書き換えながらそれをエディターに書き写したり、スマートフォンを PC に接続して開発者ツールを開く日々とはおさらばです。
ただいつものエディター上でファイルを書き換えるだけ、便利すぎます……………。

自分でポートを開けば、リモートで他人をデバッグに付きあわせる嫌がらせまで。  
（ありがとうございます、タブレット表示などは [@AtiS](https://twitter.com/AtiS) 氏のおかげです）

## 所感

こういうのすごいですね……コードを書いてプッシュするだけでリモートで自動的にコードがビルドされ、`gh-pages` ブランチにプッシュ、デプロイされる、と。
いい時代になったものだ……（しみじみ）

今までブラウザ上で走る JavaScript は書いてきましたが、Node.js は名前こそ聞いたことがあったものの触るのは初めてでした。
ちょっとずつ慣れていければと思います。
コマンドを叩けば環境が簡単に揃い、gulpfile までも TypeScript で書けてしまうとは……。
今まで CUI 自体毛嫌いしてきましたが、git 操作含めて GUI より向いている分野もあるなぁとも感じました。
SourceTree だと今どのブランチに何の操作をしようとしているのか分からなくなることが多くて、自分には向いていませんでした。

ってことで GitHub のコンソール操作を覚えるために、ゆるゆり 13 巻（と GitHub の教科書）を買ってきました。

<twitter-tweet id="562917301310484482"></twitter-tweet>

全体を通した対話形式となっていて、GitHub の基本的な使い方やブランチ、プルリクエストなどの運用のしかたについて非常に見やすくまとめられています。
また GitHub に入門したばかりでも基本的な操作は SourceTree を通して行うため初心者にも安心です。

はい、安心なんですがコンソール操作についてはほとんど触れられていなかったため、また別の本を探して買った方がいいみたいです……Git 修行の先は長い…………。

## 最後に

RecoTw Explorer は G2 氏の RecoTw があってこそです。開発お疲れさまです。
ドメインが凍結したり、Twitter アカウントが凍結したり、ドメインが凍結したりしても、強く生きてください。

<twitter-tweet id="562393891152752640"></twitter-tweet>

↑アカウント凍結系開発者さんの声
