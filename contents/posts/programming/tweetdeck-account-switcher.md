---
title: TweetDeck でアカウント切り替えができる Chrome 拡張を作りました
created: 2015-09-05T22:43:35+09:00
category: プログラミング
---
<div class="alert alert-danger">

TweetDeck のアカウント選択は 2018/02/21 に Twitter のポリシーによって複数選択から切り替えに変更され役目を終えることとなりました。
詳細は [Automation and the use of multiple accounts](https://blog.twitter.com/developer/en_us/topics/tips/2018/automation-and-the-use-of-multiple-accounts.html) をご確認ください。
</div>

TweetDeck はアカウントの選択が複数選択可能な方式ですが、実際は複数のアカウントで同じツイートをしたい場面はまずないと思います（下図）。

![](../media/tweetdeck_account_switcher_disabled.gif)

というわけで、アカウントを「切り替えられる」ようにする Chrome 拡張を作成しました。  
公開当時は Chrome 向けのみでしたが、2018/02/06 に Firefox アドオンも公開しました。

![](../media/tweetdeck_account_switcher_enabled.gif)

<!-- more -->

## ソース

提供の終了につき Issue や Pull Requests の受付は停止しています。  
[https://github.com/chitoku-k/TweetDeckAccountsSwitcher](https://github.com/chitoku-k/TweetDeckAccountsSwitcher)
