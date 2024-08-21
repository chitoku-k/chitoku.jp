---
title: Bash の getopts でロングオプションを処理する
created: 2019-09-01T18:49:30+09:00
category: プログラミング
tags:
  - Bash
  - シェルスクリプト
---
Bash で書かれたシェルスクリプトで引数を処理するためには、ビルトインコマンドの `bash¦getopts` [^1]が使用できますが、このコマンドは `bash¦--foo` のようなロングオプションをサポートしていません。
ロングオプションを GNU の `bash¦getopt` を持たない macOS などの環境を含めてサポートしたい場合は自前で解析する方法や[^2][^3]、`bash¦getopts` に `-:` を渡して処理する方法[^4][^5]がありますが、この記事では後者の `bash¦getopts` を使用した方法で、前述のリンク先の手法を参考にしながら、オプションの引数を受けてショートオプションとロングオプションを共通で扱う方法を考えてみます。

## ロングオプションの引数

ロングオプションで引数を取るコマンド群には代表的なもので次の種類があります。

### `--foo=bar`: 区切り文字として `=` を使って受け入れる

`--foo=bar` のみを受け入れる実装は見当たりませんでした。  
この記事の [--foo=bar を処理する方法](#--foobar-を処理する方法)で扱っています。

### `--foo bar`: 引数を分けて受け入れる

[FreeBSD tar](https://www.freebsd.org/cgi/man.cgi?query=tar&sektion=1)、[curl](https://curl.se/docs/manpage.html)、[Ruby](https://docs.ruby-lang.org/ja/latest/doc/spec=2frubycmd.html#ruby)、[Python](https://docs.python.org/3/using/cmdline.html) などで採用されている方式です。  
この記事の [--foo bar を処理する方法](#--foo-bar-を処理する方法)で扱っています。

### `--foo=bar` と `--foo bar` の両方を受け入れる

[GNU Coreutils](https://www.gnu.org/software/coreutils/manual/coreutils.html)、[GNU Grep](https://www.gnu.org/software/grep/manual/grep.html#Command_002dline-Options)、[Git](https://git-scm.com/docs/git)、[Node.js](https://nodejs.org/api/cli.html)、[GNU Awk](https://www.gnu.org/software/gawk/manual/html_node/Options.html#Options) など多くで採用されている方式です。  
この記事の [--foo=bar と --foo bar の両方を処理する方法](#--foobar-と---foo-bar-の両方を処理する方法)で扱っています。

<!-- more -->

### `-foo:bar`: 区切り文字として `:` を使って受け入れる

[Java](https://docs.oracle.com/en/java/javase/22/docs/specs/man/java.html#standard-options-for-java) で採用されている方式です。

### `-foo bar`: 引数を分けて受け入れる

[OpenSSL](https://docs.openssl.org/master/man1/openssl-s_client/)、[Go](https://pkg.go.dev/cmd/go) で採用されている方式です。

## getopts の機能

ここでは以下の基本的な関数を例にして、これをロングオプションに対応させてみます。

```bash
timestr() {
    local opt h m s

    while getopts h:m:s:v opt; do
        case "$opt" in
            h)
                h="$OPTARG"
                ;;
            m)
                m="$OPTARG"
                ;;
            s)
                s="$OPTARG"
                ;;
            v)
                echo 'v0.0.0'
                exit
                ;;
            \?)
                exit 1
                ;;
        esac
    done
    shift $((OPTIND - 1))

    local message="$1"
    echo "$message $h:$m:$s"
}
```

`bash¦getopts` は第一引数にオプション文字を並べてパースさせ、その結果が第二引数の変数に代入されるコマンドです。
これを繰り返し呼び出していくことでオプションをパースしていきます。不明なオプションが指定されるとオプション名には `?` が代入されます。

引数を取るオプションは、`h:` のようにしてオプションの文字のあとに `:` を続けると `bash¦$OPTARG` 変数に引数が代入されます。
上記の例では `-h`、`-m`、`-s` の 3 つが引数を取るため、`h:m:s:` と記述して引数を取得しています。
引数を取らない `-v` のようなオプションは単純に `v` と記述します。

引数を処理し終わったら `bash¦$OPTIND - 1` 個分引数を `bash¦shift`[^6] させることで、処理し終えた引数の続きから `bash¦$1`, `bash¦$2`, ... として使用することができます。

```bash
$ timestr -h 1 -m 23 -s 45 'Time is'
Time is 1:23:45

$ timestr -v
v0.0.0

$ timestr -d
timestr.bash: illegal option -- d
```

## --foo=bar を処理する方法

区切り文字として `=` を使って受け入れるタイプの処理方法です。  
オプション文字として `-:` を指定することで、その引数を利用してパースする仕組みです。  
ここでは変数展開[^7]を利用して `=` の前後で分割した引数を `bash¦$optarg` という変数に代入しています。  
また `--` を処理しているため、`-` で始まる引数を渡すことができます。

```bash
timestr() {
    local opt optarg h m s

    while getopts h:m:s:v-: opt; do
        # OPTARG を = の位置で分割して opt と optarg に代入
        optarg="$OPTARG"
        [[ "$opt" = - ]] &&
            opt="-${OPTARG%%=*}" &&
            optarg="${OPTARG/${OPTARG%%=*}/}" &&
            optarg="${optarg#=}"

        case "-$opt" in
            -h|--hour)
                h="$optarg"
                ;;
            -m|--minute)
                m="$optarg"
                ;;
            -s|--second)
                s="$optarg"
                ;;
            -v|--version)
                echo 'v0.0.0'
                exit
                ;;
            --)
                break
                ;;
            -\?)
                exit 1
                ;;
            --*)
                echo "$0: illegal option -- ${opt##-}" >&2
                exit 1
                ;;
        esac
    done
    shift $((OPTIND - 1))

    local message="$1"
    echo "$message $h:$m:$s"
}
```

実行結果は以下のとおりです。

```bash
$ timestr -h 1 -m 23 --second=45 'Time is'
Time is 1:23:45

$ timestr --hour=1 --minute=23 --second=45 'Time is'
Time is 1:23:45

$ timestr --hour=1 --minute=23 --second=45 -- '-- Time --'
-- Time -- 1:23:45

$ timestr --version
v0.0.0

$ timestr --day
timestr.bash: illegal option -- day
```

## --foo bar を処理する方法

引数を分けて受け入れるタイプの処理方法です。  
こちらもオプション文字として `-:` を指定していますが、ロング/ショートの両方で処理を統一するために、ショートオプションは引数の有無に関わらず引数なしとしてパースさせています。  
オプションのうち引数を要求するものについては、`bash¦$OPTIND`[^8] 番目の変数から取り出して `bash¦$optarg` に代入し、処理後に `bash¦shift`[^6] を使用して引数をシフトさせます。  
また `--` を処理しているため、`-` で始まる引数を渡すことができます。

```bash
timestr() {
    local opt optarg h m s

    # 引数を取る指定は - のみ
    while getopts hmsv-: opt; do
        # OPTIND 番目の引数を optarg へ代入
        optarg="${!OPTIND}"
        [[ "$opt" = - ]] && opt="-$OPTARG"

        case "-$opt" in
            -h|--hour)
                h="$optarg"
                shift
                ;;
            -m|--minute)
                m="$optarg"
                shift
                ;;
            -s|--second)
                s="$optarg"
                shift
                ;;
            -v|--version)
                echo 'v0.0.0'
                exit
                ;;
            --)
                break
                ;;
            -\?)
                exit 1
                ;;
            --*)
                echo "$0: illegal option -- ${opt##-}" >&2
                exit 1
                ;;
        esac
    done
    shift $((OPTIND - 1))

    local message="$1"
    echo "$message $h:$m:$s"
}
```

実行結果は以下のとおりです。

```bash
$ timestr -h 1 -m 23 --second 45 'Time is'
Time is 1:23:45

$ timestr --hour 1 --minute 23 --second 45 'Time is'
Time is 1:23:45

$ timestr --hour 1 --minute 23 --second 45 -- '-- Time --'
-- Time -- 1:23:45

$ timestr --version
v0.0.0

$ timestr --day
timestr.bash: illegal option -- day
```

## --foo=bar と --foo bar の両方を処理する方法

`--foo=bar` と `--foo bar` の方法を組み合わせた処理方法です。最もよく使われています。  
こちらもオプション文字として `-:` を指定し、次のようにパースします。

- `--foo=bar` の場合
  - オプション: `foo`、引数: `bar`
- `--foo bar` の場合
  - オプション: `foo`、引数: `bar`
- `--foo=--bar` の場合
  - オプション: `foo`、引数: `--bar`
- `--foo --bar` の場合
  - オプション: `foo`、引数: なし
  - オプション: `bar`、引数: なし

ショートオプションにおいて引数を要求するかどうかは、`bash¦getopts` の `:` を指定するかどうかに依存します。
一方でロングオプションにおいて引数を要求するかどうかは、各オプションの実装ではなくユーザーの入力に依存します。そのため `bash¦shift` は不要です。
こちらも `--` を処理しているため、`-` で始まる引数を渡すことができます。

```bash
timestr() {
    local opt optarg h m s

    while getopts h:m:s:v-: opt; do
        # OPTARG を = の位置で分割して opt と optarg に代入
        optarg="$OPTARG"
        if [[ "$opt" = - ]]; then
            opt="-${OPTARG%%=*}"
            optarg="${OPTARG/${OPTARG%%=*}/}"
            optarg="${optarg#=}"

            if [[ -z "$optarg" ]] && [[ ! "${!OPTIND}" = -* ]]; then
                optarg="${!OPTIND}"
                shift
            fi
        fi

        case "-$opt" in
            -h|--hour)
                h="$optarg"
                ;;
            -m|--minute)
                m="$optarg"
                ;;
            -s|--second)
                s="$optarg"
                ;;
            -v|--version)
                echo 'v0.0.0'
                exit
                ;;
            --)
                break
                ;;
            -\?)
                exit 1
                ;;
            --*)
                echo "$0: illegal option -- ${opt##-}" >&2
                exit 1
                ;;
        esac
    done
    shift $((OPTIND - 1))

    local message="$1"
    echo "$message $h:$m:$s"
}
```

実行結果は以下のとおりです。

```bash
$ timestr -h 1 -m 23 --second=45 'Time is'
Time is 1:23:45

$ timestr -h 1 -m 23 --second 45 'Time is'
Time is 1:23:45

$ timestr --hour=1 --minute=23 --second=45 'Time is'
Time is 1:23:45

$ timestr --hour 1 --minute 23 --second 45 'Time is'
Time is 1:23:45

$ timestr --hour=1 --minute=23 --second=45 -- '-- Time --'
-- Time -- 1:23:45

$ timestr --hour 1 --minute 23 --second 45 -- '-- Time --'
-- Time -- 1:23:45

$ timestr --version
v0.0.0

$ timestr --day
timestr.bash: illegal option -- day
```

## Bash Cheat Sheet

Bash のビルトインコマンドや各種コマンドがまとまったチートシート（websentra.com より）

- [Bash Cheat Sheet](https://www.websentra.com/bash-cheat-sheet/)

## 脚注

[^1]: [Bourne Shell Builtins (Bash Reference Manual)](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-getopts)
[^2]: [bash によるオプション解析 - Qiita](https://web.archive.org/web/20211216092819/https://qiita.com/b4b4r07/items/dcd6be0bb9c9185475bb)（Wayback Machine）
[^3]: [Bashでちょっと凝ったオプションの解析をする - 🐾 Nekonote.](https://dojineko.hateblo.jp/entry/2016/06/30/225113)
[^4]: [shell scriptでlong optionを処理する - うしねずみの技術メモ](https://usinezumi.com/blog/2016/10/16/304/)
[^5]: [bashでロングオプションとショートオプションの両方に対応する #Bash - Qiita](https://qiita.com/akameco/items/0e932d8ec372b87ccb34)
[^6]: [Bourne Shell Builtins (Bash Reference Manual)](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html#index-shift)
[^7]: [Shell Parameter Expansion (Bash Reference Manual)](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html)
[^8]: [Bourne Shell Variables (Bash Reference Manual)](https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Variables.html#index-OPTIND)
