---
title: Twitter の GIF アニメを API で取得する
created: 2014-12-16T03:25:18+09:00
category: プログラミング
tags:
  - Twitter
---
この記事は、ヒナロエ氏（[@hnle0](https://twitter.com/hnle0)）の [Advent Calendar 2014](https://blog.hinaloe.net/events/advent-calendar2014/) 参加記事（7 日目）です。

<twitter-tweet id="543439157263998976"></twitter-tweet>

<div class="alert alert-info text-center">

2015年2月2日より API 経由での情報取得が可能になるようです。  
詳細は当記事下部の追記にて。
</div>

## というわけで

今回は、ちょっと前から Twitter にアップロードできるようになった GIF アニメを取得する方法を考えてみます。
記事執筆時点（2014/12/16）では Twitter はサードパーティーのクライアント向けにはこれを公開していません。

<!-- more -->

<twitter-tweet id="479447380190691328"></twitter-tweet>

<div class="text-center" style="margin: 30px 0; font-size: 140%;">
“近いうちに”（年内とは言っていない）
</div>

現在のところ GIF を再生できるのは基本的には公式アプリだけです。
（Tweetbot for iOS が対応していますが非公開アカウントでは再生できないので公式 Web をスクレイピングして取得しているものと思われます。）

公式アプリには非公式アプリと比べてリクエストなどに特権があり、その 1 つに、ツイートに対して添付される Twitter Card と呼ばれる情報を取得できるというものがあります。
冒頭のヒナロエ氏のツイートは、URL が貼られている情報に追加で画像が表示されていますが、この機能が「Twitter カード」です。
めんどくさいので詳細な説明は公式（[About Twitter Cards — Twitter Developers](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards)）に譲るとして、現段階では GIF アニメはこの機能を用いて公式アプリに配信されています。

## Twitter カードを取得する

公式アプリの特権を利用するにはリクエストの認証情報に公式アプリのキーを利用する必要があります。どこかで手に入れてきましょう。
私は Twitter for iPhone と Twitter for Android のキーで確認しました。

<twitter-tweet id="536534482828795904"></twitter-tweet>

このツイート（[ID: 536534482828795904](https://twitter.com/java_shit/status/536534482828795904)）の GIF 画像で試してみます。

```bash
$ curl -X GET "https://api.twitter.com/1.1/statuses/show/536534482828795904.json?cards_platform=iPhone-8&include_cards=true"
```

取得に必要なパラメーターは以下の通りです。

- `cards_platform`: iPhone-8 or Android-10
- `include_cards`: `true`

取得したレスポンスの結果は次のようになりました。長いので抜粋です。

```json
{
    "id": 536534482828795904,
    "id_str": "536534482828795904",
    "text": "スクロールへの愛を感じてほしい。 http://t.co/1IMeppy5Jl",
    "card": {
        "name": "animated_gif",
        "url": "http://t.co/1IMeppy5Jl",
        "card_type_url": "https://abs.twimg.com/cards/iPhone/7/3a5617a8-3a77-35b2-840f-9bd48b81f0d3/47A315D68A13007563C81A8637B15DBB.json",
        "binding_values": {
            "player_height": {
                "type": "STRING",
                "string_value": "280"
            },
            "player_image": {
                "type": "IMAGE",
                "image_value": {
                    "url": "https://pbs.twimg.com/tweet_video_thumb/B3InRPeCAAAvmQ9.png",
                    "width": 207,
                    "height": 280
                }
            },
            "player_stream_content_type": {
                "type": "STRING",
                "string_value": "video/mp4 codecs=avc1.42E0"
            },
            "player_stream_url": {
                "type": "STRING",
                "string_value": "https://pbs.twimg.com/tweet_video/B3InRPeCAAAvmQ9.mp4"
            },
            "player_url": {
                "type": "STRING",
                "string_value": "https://pbs.twimg.com/tweet_video/B3InRPeCAAAvmQ9.mp4"
            },
            "player_width": {
                "type": "STRING",
                "string_value": "208"
            }
        },
        "card_platform": {
            "platform": {
                "device": {
                    "name": "iPhone",
                    "version": "7"
                },
                "audience": {
                    "name": "production",
                    "bucket": null
                }
            }
        }
    }
}
```

次のように各種情報が取得できます。

- `card.binding_values.player_url.string_value`: GIF アニメ（MP4 に変換されたファイル）
- `card.binding_values.player_image.image_value.url`: PNG 形式のサムネイル

## 【補足】スクレイピングで取得する

非公開アカウントの GIF 画像を取得することはできませんが、Twitter の Web をスクレイピングすることでも URL を取得できます。

```bash
$ curl -X GET "https://twitter.com/java_shit/status/536534482828795904"
```

次の正規表現で各種情報が取得できます。

```javascript
/<img src="([a-zA-Z0-9:\\/._-]+)" class="animated-gif-thumbnail"/
```

```javascript
/<source video-src="([a-zA-Z0-9:\\/._-]+)" type="video\/mp4"/
```

```javascript
/class="animated-gif" data-height="(\\d+)" data-width="(\\d+)"/
```

## 埋め込みツイートから

<twitter-tweet id="544569728178466818"></twitter-tweet>

埋め込みツイート API からも GIF の情報を取得できるようです。

```bash
$ curl -X GET "https://syndication.twitter.com/tweets.json?ids=536534482828795904"
```

得られたレスポンスを展開すると以下のように、取れないこともないといった感じです。

```html
  <div class="media">

            <iframe class="autosized-media"
                    allowfullscreen
                    src="https://platform.twitter.com/video/player.html#screen_name=java_shit&amp;status_id=536534482828795904&amp;height=280&amp;placeholder=https%3A%2F%2Fpbs.twimg.com%2Ftweet_video_thumb%2FB3InRPeCAAAvmQ9.png&amp;src=https%3A%2F%2Fpbs.twimg.com%2Ftweet_video%2FB3InRPeCAAAvmQ9.mp4&amp;width=208"
                    width="208" data-width="208"
                    height="280" data-height="280"
                    title="Embedded media player"></iframe>

  </div>
```

とはいえ早く（近いうちにではなくて）サードパーティ向けに仕様公開してほしいものです……。

## 【追記】ようやく対応する模様

<twitter-tweet id="552807479147778049"></twitter-tweet>

2015年1月6日の発表記事によれば、同年2月2日から REST API ならびに Streaming API の双方において、`extended_entities` フィールドで MP4 形式の GIF アニメーションが取得できるようになるようです。ようやくか………。
