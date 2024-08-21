---
title: Windows の自動再生を特定のドライブでのみ無効化する
created: 2018-06-02T19:03:58+09:00
category: Windows
---
## 自動再生

Windows には CD や USB メモリーに反応して自動再生というダイアログを出す鬱陶しい機能がありますが、コントロール パネル等ではメディアの種類やデバイスの種類による無効化しかできません。
例えば起動時に自動的にマウントされるディスクであっても、VHD による仮想ディスクの自動再生などは簡単には無効化できないわけです。

一方でレジストリーには NoDriveAutoRun というエントリーによって個別のドライブの自動再生を無効化する機構があります[^1]。この記事はこれで以上です。

## めんどくさいあなたへ

NoDriveAutoRun は自動再生を無効化するドライブの設定値の合計を 16 進数に変換して手で書き入れる必要がありますが、
やっていられないので[作っておきました](https://github.com/chitoku-k/no-drive-auto-run-generator)[^2]。
ご自由にお使いください。

無効化するドライブを選択したら、出てきたコードを auto-run.reg とでも名前をつけて実行すれば完了です。

<!-- more -->

<iframe scrolling="no" style="border: 1px solid #ccc; border-color: var(--headings-border); width: 0; min-width: 100%; height: 350px;" src="https://chitoku-k.github.io/no-drive-auto-run-generator/"></iframe>

## 脚注/参考

[^1]: [NoDriveAutoRun](https://learn.microsoft.com/en-us/windows/win32/shell/autoplay-reg#using-the-registry-to-disable-autorun)
[^2]: [chitoku-k/no-drive-auto-run-generator（GitHub）](https://github.com/chitoku-k/no-drive-auto-run-generator)
