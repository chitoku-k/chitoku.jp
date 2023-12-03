---
title: gomock の Matcher を自作して gomock.Any() 回避！
created: 2020-05-24T22:25:50+09:00
category: プログラミング
tags:
  - Go
---
Go でテストを記述する際、モックの生成にはしばしば [gomock](https://pkg.go.dev/go.uber.org/mock) が使われますが、引数の検証に使う [Matcher](https://pkg.go.dev/go.uber.org/mock/gomock#Matcher) は標準では限られたもののみが用意されています。

たとえば、以下のテストの 12 行目では `go¦gomock.Eq(...)` を使って `go¦api.Client` に対して `go¦Get("/v1/info")` という呼び出しが 1 回されることを期待しています。

```go{numberLines: true}
//go:generate mockgen -source=client.go -destination=client_mock.go -package=api

package api

import (
	"io"
	"net/http"
)

type Client interface {
	Get(url string) (*http.Response, error)
	Post(url, contentType string, body io.Reader) (*http.Response, error)
}
```

```go{numberLines: true}
import (
	"testing"

	"go.uber.org/mock/gomock"
)

func TestServiceGet(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mock := api.NewMockClient(ctrl)
	// highlight-next-line
	mock.EXPECT().Get(gomock.Eq("/v1/info")).Return(nil, nil)

	service := domain.NewService(mock)
	service.DoFancyStuff()
}
```

このような単純な比較であれば標準の Matcher でも事足りますが、以下のテストの 15 行目のように引数の検証が比較演算でできないケースもあり、`go¦gomock.Any()` を使って引数の検証自体を省略したままにしてしまうこともあります。

<!-- more -->

```go{numberLines: true}
import (
	"testing"

	"go.uber.org/mock/gomock"
)

func TestServicePost(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mock := api.NewMockClient(ctrl)
	mock.EXPECT().Post(
		gomock.Eq("/v1/comments"),
		gomock.Eq("application/x-www-form-urlencoded"),
		// highlight-next-line
		gomock.Any(),
	).Return(nil, nil)

	service := domain.NewService(mock)
	service.DoFancyStuff()
}
```

今回は上記のラッパーの `go¦Post()` が期待した `go¦body` の値で呼び出されているか検証する `go¦Matcher` を記述して対処してみます。
メインロジックでは、21 行目で `go¦url.Values` をエンコードした文字列をラップする `go¦io.Reader` を渡し、これが正しく渡されているかをテストします[^1]。

```go{numberLines: true}
import (
	"net/url"
	"strings"
)

type service struct {
	client api.Client
}

func NewService(c api.Client) *service {
	return &service{c}
}

func (s *service) DoFancyStuff() {
	values := url.Values{}
	values.Add("name", "test me")

	s.client.Post(
		"/v1/comments",
		"application/x-www-form-urlencoded",
		// highlight-next-line
		strings.NewReader(values.Encode()),
	)
}
```

## 環境

+------------------+--------+
| Go               | 1.21.4 |
+------------------+--------+
| go.uber.org/mock | 0.3.0  |
+------------------+--------+

## 設計

gomock には別の Matcher を入れ子に持つ `go¦Not`[^2] のような Matcher がすでにあるため、汎化するために `go¦io.Reader` を検証する Reader の Matcher と、`go¦url.Values` を検証する Query の Matcher の 2 つに分けて、以下のように呼び出せるようにしておきます。

```go
mock.EXPECT().Post(
	"/v1/comments",
	"application/x-www-form-urlencoded",
	Reader(
		Query(
			gomock.Eq(
				url.Values{
					"name": []string{"test me"},
				},
			),
		),
	),
)
```

### `go¦io.Reader` の Matcher

渡された `go¦io.Reader` からすべて読み取り、期待する `go¦[]byte` と比較する Matcher に委譲する Matcher を返します。

```go
func Reader(m gomock.Matcher) gomock.Matcher {
	// TODO
}
```

また、マッチしなかった場合の出力を整形するために `go¦GotFormatter` も実装しておきます[^3]。

### `go¦url.Values` の Matcher

渡された `go¦[]byte` を URL デコードし、期待する `go¦url.Values` と比較する Matcher に委譲する Matcher を返します。

```go
func Query(m gomock.Matcher) gomock.Matcher {
	// TODO
}
```

また、マッチしなかった場合の出力を整形するために `go¦GotFormatter` も実装しておきます[^3]。

## 実装

以下の 2 つのインターフェイスを満たす実装を 1 つずつ作っていきます。  
それぞれの Matcher は生成時に `go¦GotFormatterAdapter(GotFormatter, Matcher)` を通すことでコンパイル時に両方のインターフェイスを満たすことを保証させます[^4]。

```go
type Matcher interface {
	Matches(x any) bool
	String() string
}
```

```go
type GotFormatter interface {
	Got(got any) string
}
```

### `go¦io.Reader` の Matcher と GotFormatter

テスト時に読み取った値を `go¦readerMatcher` にキャッシュしておき、マッチしなかった場合にその値を `go¦Got()` でも使えるようにしておきます。
`go¦Got()` では 34 行目で入れ子の `go¦Matcher` が `GotFormatter` だった場合にその処理を委譲しています。

```go{numberLines: true}
import (
	"fmt"
	"io"

	"go.uber.org/mock/gomock"
)

type readerMatcher struct {
	m    gomock.Matcher
	data []byte
}

func Reader(m gomock.Matcher) gomock.Matcher {
	r := &readerMatcher{m, nil}
	return gomock.GotFormatterAdapter(r, r)
}

func (r *readerMatcher) Matches(x any) bool {
	var err error
	r.data, err = io.ReadAll(x.(io.Reader))
	if err != nil {
		return false
	}
	return r.m.Matches(r.data)
}

func (r *readerMatcher) String() string {
	return fmt.Sprintf("data(%s)", r.m.String())
}

func (r *readerMatcher) Got(got any) string {
	f, ok := r.m.(gomock.GotFormatter)
	if ok {
		// highlight-next-line
		return fmt.Sprintf("data(%s)", f.Got(r.data))
	}
	return fmt.Sprintf("%#v", r.data)
}
```

### `go¦url.Values` の Matcher と GotFormatter

`go¦io.Reader` への `go¦Read()` とは異なりバイト列の URL デコードは冪等性があるのでキャッシュしません。
`go¦Got()` では 39 行目で入れ子の `go¦Matcher` が `GotFormatter` だった場合にその処理を委譲しています。

```go{numberLines: true}
import (
	"fmt"
	"net/url"

	"go.uber.org/mock/gomock"
)

type queryMatcher struct {
	m gomock.Matcher
}

type queryGotFormatter struct {
	m gomock.Matcher
}

func Query(m gomock.Matcher) gomock.Matcher {
	return gomock.GotFormatterAdapter(
		&queryGotFormatter{m},
		&queryMatcher{m},
	)
}

func (q *queryMatcher) Matches(x any) bool {
	values, err := url.ParseQuery(string(x.([]byte)))
	if err != nil {
		return false
	}
	return q.m.Matches(values)
}

func (q *queryMatcher) String() string {
	return fmt.Sprintf("url.Values(%s)", q.m.String())
}

func (q *queryGotFormatter) Got(got any) string {
	values, _ := url.ParseQuery(string(got.([]byte)))
	f, ok := q.m.(gomock.GotFormatter)
	if ok {
		// highlight-next-line
		return fmt.Sprintf("url.Values(%s)", f.Got(values))
	}
	return fmt.Sprintf("url.Values(%v)", values)
}
```

## 動作確認

実際に冒頭の `go¦TestServicePost()` を使ってテストしてみると、期待した引数（`go¦"test me"`）で呼び出されているためテストが通過していることが確認できます。

```
ok      github.com/chitoku-k/custom-matcher-test    0.010s
```

つづいて、実装側で `go¦Post()` の第 3 引数を `go¦"テスト"` に変更してテストを再実行してみると、テストが正しく失敗し、GotFormatter によって出力が整形できていることが確認できます。

```
--- FAIL: TestService (0.00s)
    matcher_test.go:103: Unexpected call to *api.MockClient.Post([/v1/comments application/x-www-form-urlencoded 0xc00000e3e0]) at /usr/src/custom-matcher-test/api/client_mock.go:40 because:
        expected call at /usr/src/custom-matcher-test/matcher_test.go:87 doesn't match the argument at index 2.
        Got: data(url.Values(map[name:[テスト]]))
        Want: data(url.Values(is equal to map[name:[test me]]))
    panic.go:617: missing call(s) to *api.MockClient.Post(is equal to /v1/comments, is equal to application/x-www-form-urlencoded, data(url.Values(is equal to map[name:[test me]]))) /usr/src/custom-matcher-test/matcher_test.go:87
    panic.go:617: aborting test due to missing call(s)
FAIL
FAIL    github.com/chitoku-k/custom-matcher-test    0.009s
FAIL

```

## 脚注

[^1]: 本来は単に実装側で [Client.PostForm(string, url.Values)](https://pkg.go.dev/net/http#Client.PostForm) を使えば済みます
[^2]: [func Not(any) Matcher](https://pkg.go.dev/go.uber.org/mock/gomock#Not)
[^3]: [GotFormatter](https://pkg.go.dev/go.uber.org/mock/gomock#GotFormatter)
[^4]: [func GotFormatterAdapter(GotFormatter, Matcher) Matcher](https://pkg.go.dev/go.uber.org/mock/gomock#GotFormatterAdapter)
