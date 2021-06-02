[【Go】基本文法 ④(配列・スライス) - Qiita](https://qiita.com/k-penguin-sato/items/daad9986d6c42bdcde90)

// Go module

go mod init で、初期化する
go build などのビルドコマンドで、依存モジュールを自動インストールする
go list -m all で、現在の依存モジュールを表示する
go get で、依存モジュールの追加やバージョンアップを行う
go mod tidy で、使われていない依存モジュールを削除する

- [Go · GitHub](https://github.com/golang/)
- [Packages - The Go Programming Language](https://golang.org/pkg/)

- [go 言語の slice 操作をまとめてみた（shift したり push したり） - Qiita](https://qiita.com/egnr-in-5matroom/items/282aa2fd117aab9469bd)

- [サンプルで学ぶ Go 言語：Regular Expressions](https://www.spinute.org/go-by-example/regular-expressions.html)
- [Go の言語仕様書精読のススメ 英語彙集](https://zenn.dev/hsaki/articles/gospecdictionary)
- [Golang でプログレスバーを表示するためのパッケージ 3 選 - Qiita](https://qiita.com/Akazawa_Naoki/items/a63193e3ac4c8cd4f19a)

- [Golang におけるエラーハンドリングとロギングのプラクティス - melody](https://techblog.szksh.cloud/golang-logging-error-handling-practice/)

- [Go でシェルの Exit code を扱う | tellme.tokyo](https://tellme.tokyo/post/2018/04/02/golang-shell-exit-code/)

- [GitHub - ztrue/tracerr: Golang errors with stack trace and source fragments.](https://github.com/ztrue/tracerr)
- [GitHub - logrusorgru/aurora: Golang ultimate ANSI-colors that supports Printf/Sprintf methods](https://github.com/logrusorgru/aurora)

Go 言語で文字列の連結を行う際には概ね以下の 4 つの方法がある。

- “ + ” 演算子で連結する
- strings .Join で連結する
- bytes .Buffer で追記する
- []byte に append する

つまり []byte 配列への append() と strings.Builder への追記と strings.Join() は実質的に同じ処理で，それぞれの前処理分だけ差が出ているということになる。

今回の検証では

やっぱり + 演算子による連結はダメダメ 2
よほどの最適化が要求されない限り []byte 配列への append() は strings.Builder へ代替可能 3
strings.Join() 関数のパフォーマンスは十分なので気軽に使ってよい
文字列連結に限るなら，もはや bytes.Buffer は有利とは言えない
といったところだろうか。

text/template<!--{{{-->

```

{{if true}}
    {{println "got it!"}}
{{else}}
    {{println "no..."}}
{{end}}

{{- /*
コメントは
複数行可能
*/ -}}
{{- `
rawstringも
複数行可能
` -}}

```

- [Go Template、最高のプログラミング言語 - Qiita](https://qiita.com/Syuparn/items/4157d13c39b95185acfd)

<!--}}}-->

- [go の TUI について | Noboru Saito's page](https://noborus.github.io/blog/go_tui/)

cache clean<!--{{{-->

The -i flag causes clean to remove the corresponding installed archive or binary (what 'go install' would create).

The -n flag causes clean to print the remove commands it would execute, but not run them.

The -r flag causes clean to be applied recursively to all the dependencies of the packages named by the import paths.

The -x flag causes clean to print remove commands as it executes them.

The -cache flag causes clean to remove the entire go build cache.

The -testcache flag causes clean to expire all test results in the go build cache.

The -modcache flag causes clean to remove the entire module download cache, including unpacked source code of versioned dependencies.

<!--}}}-->
