---
title: 'Vim で Markdown の改行をおしゃれにする'
created: 2019-03-17T23:21:21+0900
category: コンピューター
tags:
  - Vim
---
Vim の小ネタです。  
Markdown では改行を行末に半角スペースを 2 つ並べて表しますが、エディター上で改行かどうかが見つけにくくなります。

そこで Vim の conceal[^1] 機能を活用してちょっとだけ見つけやすくしてみます。  
ハイライトも設定できるので通常よりは分かりやすくなるはずです！

![](../media/markdown-line-break.png)

## 設定例

`after/ftplugin/markdown.vim`[^2] などで次のように `vim:syntax` の設定を追加します。`cchar` は `conceal` 部分に表示される文字です。

```vim
syntax match markdownLineBreak /\s\s$/ conceal cchar=↵
setlocal concealcursor=nvic
setlocal conceallevel=1
```

もし [bronson/vim-trailing-whitespace](https://github.com/bronson/vim-trailing-whitespace) のような行末の空白をハイライトするプラグインを入れている場合は一緒に無効化しておくと良いかもしれません。

```vim
let g:extra_whitespace_ignored_filetypes = [
      \   'markdown',
      \ ]
```

## 脚注

[^1]: [syntax - Vim日本語ドキュメント](https://vim-jp.org/vimdoc-ja/syntax.html#conceal)
[^2]: [usr_41 - Vim日本語ドキュメント](https://vim-jp.org/vimdoc-ja/usr_41.html#write-filetype-plugin)
