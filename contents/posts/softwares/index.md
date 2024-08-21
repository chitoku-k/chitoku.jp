---
title: ソフトウェア
category: ソフトウェア
---
## サポート中

### [![](/thumbnails/default.png)chitoku.jp](https://github.com/chitoku-k/chitoku.jp)

[ちとくのホームページ](/)を静的サイト生成を利用して出力するアプリケーションです。

詳細: [乗るしかないこのビッグウェーブに〜Gatsby 移行〜](/programming/migrate-to-gatsby)  
利用技術:

* TypeScript
* Gatsby
* React
* webpack
* Sass
* Bootstrap
* Algolia

---

### [![](../media/homo_icon.png)Homo Checker](https://github.com/chitoku-k/HomoChecker)

[まっぴー](https://twitter.com/mpyw)にリダイレクトしている URL を自動チェックする Web アプリケーションです。
こらそこ誰得とか言わない。

利用技術:

* PHP
* Slim Framework
* Guzzle
* PHPUnit
* JavaScript
* Riot.js
* webpack
* Sass
* PostgreSQL

---

### [![](../media/software_icon.png)ぴゅっぴゅカウンター](https://github.com/chitoku-k/ejaculation-counter)

ぴゅっぴゅ回数をカウントしたり、Mastodon に接続してガチャなどのリプライを行ったりする bot アプリケーションです。

利用技術:

* Go
* RabbitMQ
* Grafana
* PostgreSQL

---

### [![](../media/software_icon.png)fzf-zsh-completions](https://github.com/chitoku-k/fzf-zsh-completions)

Zsh で [fzf](https://github.com/junegunn/fzf) を利用してコマンドに特化したファジー補完を行う Zsh プラグインです。
git、kubectl、systemctl、docker コマンドなどの補完を行う際に、対象の詳細な情報を表形式で表示します。

利用技術:

* Zsh
* jq

---

### [![](../media/software_icon.png)cloudflare-exporter](https://github.com/chitoku-k/cloudflare-exporter)

[Cloudflare Load Balancing](https://www.cloudflare.com/application-services/products/load-balancing/) に登録した Origin のヘルスチェック結果と RTT を Prometheus のメトリクスとして出力します。

利用技術:

* Go
* Cloudflare API
* Prometheus

---

### [![](../media/software_icon.png)edgerouter-exporter](https://github.com/chitoku-k/edgerouter-exporter)

Ubiquiti 社のルーター [EdgeRouter](https://store.ui.com/us/en/products/er-x) の DDNS、ロードバランサー、PPPoE セッションなどの情報を Prometheus のメトリクスとして出力します。

利用技術:

* Rust
* Prometheus

---

### [![](../media/software_icon.png)serde\_vici](https://github.com/chitoku-k/serde-vici)

IPsec VPN の strongSwan を設定、監視、制御する charon と対話するために利用する [VICI](https://docs.strongswan.org/docs/5.9/plugins/vici.html) プロトコルの形式にシリアライズおよびデシリアライズする [Serde](https://serde.rs/) ベースの crate です。

利用技術:

* Rust
* Serde

---

### [![](../media/software_icon.png)rsvici](https://github.com/chitoku-k/rsvici)

IPsec VPN の strongSwan を設定、監視、制御する charon と [VICI](https://docs.strongswan.org/docs/5.9/plugins/vici.html) プロトコルを利用して対話するための [Tokio](https://tokio.rs/) ベースのクライアントライブラリーです。

利用技術:

* Rust
* Tokio

---

### [![](../media/software_icon.png)healthcheck-k8s](https://github.com/chitoku-k/healthcheck-k8s)

HTTP ヘッダーで指定された Kubernetes の [Node](https://kubernetes.io/docs/concepts/architecture/nodes/) が Schedulable かどうかを HTTP ステータスコードとして返す Web サーバーです。
ロードバランサーが Ingress Controller の Node に対し、Node が Schedulable かどうかをチェックするためなどに使用します。

利用技術:

* Go
* Kubernetes API
* Prometheus

---

### [![](../media/software_icon.png)form-to-slack](https://github.com/chitoku-k/form-to-slack)

HTTP の POST で送信されたフォームを Slack にメッセージとして転送する Web サーバーです。

利用技術:

* Go
* reCAPTCHA v3
* Slack API

---

### [![](../media/software_icon.png)slack-to-ssh](https://github.com/chitoku-k/slack-to-ssh)

Slack の [interactive message buttons](https://api.slack.com/legacy/message-buttons) でボタン操作が実行された際に、SSH 経由で予め指定したコマンドを実行することができる Web サーバーです。

利用技術:

* Go
* Slack API

---

### [![](../media/software_icon.png)lampager-cakephp](https://github.com/lampager/lampager-cakephp)

PHP で DB からデータを取得する際に SQL の `OFFSET` 句を利用せずにページネーションを行えるライブラリー、[Lampager](https://github.com/lampager/lampager) を [CakePHP](https://cakephp.org) v2.x、v3.x、v4.x に対応させる CakePHP プラグインです。

詳細: [CakePHP 2 のプラグインを Travis CI でテストする](/programming/cakephp2-plugin-test)  
利用技術:

* PHP
* CakePHP
* MySQL
* PostgreSQL
* SQLite

---

### [![](../media/software_icon.png)zsh-togglecursor](https://github.com/chitoku-k/zsh-togglecursor)

[Zsh Line Editor](https://zsh.sourceforge.io/Guide/zshguide04.html) のキーバインドで `vi` モードを選択した際に、ノーマルモードと挿入モードが切り替わるたびにターミナルのカーソルの形を変更する Zsh プラグインです。

利用技術:

* Zsh

---

### [![](../media/software_icon.png)zsh-vcs-extended](https://github.com/chitoku-k/zsh-vcs-extended)

Zsh の [vcs\_info](https://zsh.sourceforge.io/Doc/Release/User-Contributions.html#Version-Control-Information) に untracked files の有無を表示する機能を追加する Zsh プラグインです。

利用技術:

* Zsh

---

### [![](../media/software_icon.png)buffalo-utils](https://github.com/chitoku-k/buffalo-utils)

BUFFALO 社の Wi-Fi ルーター AirStation シリーズの管理画面をシェルスクリプトで操作するスクレイピングツールです。
管理画面へのログイン、設定の取得、設定の反映、ログの取得、再起動、などが行えます。

利用技術:

* Bash
* jq

---

### [![](../media/software_icon.png)NoDriveAutoRun Generator](https://github.com/chitoku-k/no-drive-auto-run-generator)

Windows の自動再生を設定する `NoDriveAutoRun` というレジストリーの値を生成する Web アプリケーションです。

詳細: [Windows の自動再生を特定のドライブでのみ無効化する](/windows/disable-autorun-on-specific-drive)  
利用技術:

* Vue.js

---

### [![](../media/software_icon.png)Chipmunk](https://github.com/chitoku-k/Chipmunk)

WPF でウィンドウのシステムメニュー（最小化ボタン、最大化ボタン、閉じるボタンなど）を変更したり、[DWM](https://learn.microsoft.com/en-us/windows/win32/dwm/dwm-overview) の Aero Glass を有効化したりするための添付ビヘイビア/添付プロパティーです。

また、`TextBox` にバリデーション機能を追加したり、`PasswordBox` の `Password` プロパティーで `Binding` を有効化したり、`NumericUpDown` コントロールを追加したりする機能もあります。

利用技術:

* XAML (WPF)
* C#

---

### [![](../media/software_icon.png)NowPlayingLib](https://github.com/chitoku-k/NowPlayingLib)

.NET Framework から Windows Media Player、iTunes、x-アプリ、foobar2000 と連携して、再生中の曲の情報を取得したり、基本的な操作を行ったりすることができるライブラリーです。

詳細: [NowPlayingLib を公開しました](/programming/nowplayinglib)  
利用技術:

* C#
* COM

---

### [![](../media/software_icon.png)Nature Remo Docker](https://github.com/chitoku-k/nature-remo-docker)

[Nature Remo API Client](https://github.com/tenntenn/natureremo) を利用して [Nature Remo](https://nature.global/) のローカル API を呼び出す CLI ツールです。

利用技術:

* Go

## サポート終了

### [![](../media/soarer_icon.png)Soarer for Windows](/softwares/soarer/)

Windows 用の Twitter クライアントです。
更新ボタンを押すことなくリアルタイムにタイムラインが更新される User Streams にも対応しているほか、Twitter 公式 Web 同様のリプライ/お気に入り/リツイートの履歴表示、TwitPic や Vine など多くの Web サービスに対応した画像/動画サムネイルの表示と直接表示/再生などが可能です。
小さな画面でも、作業をしながらでも、常に快適な Twitter ライフを！

利用技術:

* XAML (WPF)
* C#

---

### [![](../media/recotw_icon.png)RecoTw Explorer](https://github.com/RecoTwExplorer/RecoTwExplorer)

RecoTw のサービス終了に伴い、RecoTw Explorer の提供は終了しました。

詳細: [RecoTw Explorer を書き直したら思ったより大きくなった話](/programming/recotw-explorer-renewal)  
利用技術:

* TypeScript
* jQuery
* webpack
* Sass
* Bootstrap

---

### [![](../media/minecraft_icon.png)Minecraft Superflat Editor](https://chitoku.jp/softwares/superflat/)

Minecraft（Java 版）のワールド生成時のスーパーフラットモードにて使用可能なコードを生成するツールです。
ブロックリストの編集やバイオーム種別の変更、廃坑などの出現頻度をマウス操作で簡単に変更できます。
Minecraft バージョン 1.6 までしかサポートしておらず、現在の Minecraft のバージョンでは動作しません。

利用技術:

* JavaScript

---

### [![](../media/tweet-deck-account-switcher_icon.png)TweetDeck Accounts Switcher](https://github.com/chitoku-k/TweetDeckAccountsSwitcher)

TweetDeck のアカウント選択を複数選択ではなく切り替えになるように拡張する Chrome/Firefox 用の拡張機能です。
アカウント選択の仕様が複数選択から切り替えに変更されたため役目を終えることとなりました。

詳細: [TweetDeck でアカウント切り替えができる Chrome 拡張を作りました](/programming/tweetdeck-account-switcher)  
利用技術:

* JavaScript
* Selenium
* webpack
