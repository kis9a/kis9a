- [【Go】基本文法 ④(配列・スライス) - Qiita](https://qiita.com/k-penguin-sato/items/daad9986d6c42bdcde90)
- [goroutine はなぜ軽量なのか - Carpe Diem](https://christina04.hatenablog.com/entry/why-goroutine-is-good)
- [Non-Blocking I/O, I/O Multiplexing, Asynchronous I/O の区別 - Carpe Diem](https://christina04.hatenablog.com/entry/2017/07/05/005944)
- [Go · GitHub](https://github.com/golang/)
- [Packages - The Go Programming Language](https://golang.org/pkg/)
- [Go で並行処理(基本編)｜ Go での並行処理を徹底解剖！](https://zenn.dev/hsaki/books/golang-concurrency/viewer/basicusage)
- [go 言語の slice 操作をまとめてみた（shift したり push したり） - Qiita](https://qiita.com/egnr-in-5matroom/items/282aa2fd117aab9469bd)
- [Go エラーハンドリング戦略](https://zenn.dev/nobonobo/articles/0b722c9c2b18d5)
  <https://zenn.dev/nobonobo/articles/19c84c231aff46#map%E3%81%AE%E3%82%AD%E3%83%BC%E5%AD%98%E5%9C%A8%E5%88%A4%E5%AE%9A%E3%81%A8%E9%96%A2%E6%95%B0%E3%81%AE%E8%BF%94%E5%80%A4>
- [サンプルで学ぶ Go 言語：Regular Expressions](https://www.spinute.org/go-by-example/regular-expressions.html)
- [Go の言語仕様書精読のススメ 英語彙集](https://zenn.dev/hsaki/articles/gospecdictionary)
- [Golang でプログレスバーを表示するためのパッケージ 3 選 - Qiita](https://qiita.com/Akazawa_Naoki/items/a63193e3ac4c8cd4f19a)
- [Golang におけるエラーハンドリングとロギングのプラクティス - melody](https://techblog.szksh.cloud/golang-logging-error-handling-practice/)
- [Go のエラーハンドリング](https://zenn.dev/spiegel/books/error-handling-in-golang)
- [今 go のエラーハンドリングを無難にしておく方法（2021.07 現在）](https://zenn.dev/nekoshita/articles/097e00c6d3d1c9)
- [Go でシェルの Exit code を扱う | tellme.tokyo](https://tellme.tokyo/post/2018/04/02/golang-shell-exit-code/)
- [GitHub - ztrue/tracerr: Golang errors with stack trace and source fragments.](https://github.com/ztrue/tracerr)
- [GitHub - logrusorgru/aurora: Golang ultimate ANSI-colors that supports Printf/Sprintf methods](https://github.com/logrusorgru/aurora)
- [Go Template、最高のプログラミング言語 - Qiita](https://qiita.com/Syuparn/items/4157d13c39b95185acfd)
- [go の TUI について | Noboru Saito's page](https://noborus.github.io/blog/go_tui/)
- [bufio パッケージによる buffered I/O ｜ Go から学ぶ I/O](https://zenn.dev/hsaki/books/golang-io-package/viewer/bufio)
- [Go の言語仕様書精読のススメ &amp; 英語彙集](https://zenn.dev/hsaki/articles/gospecdictionary)
- [Go 言語で「embedded で継承ができる」と思わないほうがいいのはなぜか？ - Qiita](https://qiita.com/Maki-Daisuke/items/511b8989e528f7c70f80)
- [Rust なのか Go なのか](https://python.ms/rust-or-go/#_2-%E7%94%A8%E9%80%94)
- [Go でオプショナルパラメータをどう扱うか - 1 ミリもわからん](https://raahii.github.io/posts/optional-parameters-in-go/)
- [net/http 2 ＜ Mux ＞｜ Go 言語による Web サーバー作成入門](https://zenn.dev/ichi320/books/0f544e3a076ba2b7212f/viewer/36a3ca)
- [AWS CDK×LINE BOT ハンズオン～アプリとインフラをコード管理しよう～](https://zenn.dev/ufoo68/books/3fbd1969bd4b21c5454b)
- [結局、Go 言語をやめる理由はなかった件 - Qiita](https://qiita.com/Maki-Daisuke/items/23c1285500208048de80)
- [GitHub - imdario/zas: Most zen static website generator in Golang.](https://github.com/imdario/zas)

Go 言語で文字列の連結を行う際には概ね以下の 4 つの方法がある。<!--{{{-->

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
<!--}}}-->

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

<!--}}}-->

cache clean<!--{{{-->

The -i flag causes clean to remove the corresponding installed archive or binary (what 'go install' would create).

The -n flag causes clean to print the remove commands it would execute, but not run them.

The -r flag causes clean to be applied recursively to all the dependencies of the packages named by the import paths.

The -x flag causes clean to print remove commands as it executes them.

The -cache flag causes clean to remove the entire go build cache.

The -testcache flag causes clean to expire all test results in the go build cache.

The -modcache flag causes clean to remove the entire module download cache, including unpacked source code of versioned dependencies.

<!--}}}-->

① Go 言語標準の正規表現ライブラリは、正規表現と検査文字列の長さに対して常に O(n2)O(n2)のオーダーで計算量が増加する安定したアルゴリズムを採用している。<!--{{{-->
② "正規表現オブジェクト"を用いたマッチング処理には排他制御が行われている。

<!--}}}-->

envs<!--{{{-->
このディレクトリは Go modules を利用することで不要になります。
具体的には環境変数 GO111MODULE=on と設定することで、$GOPATH/src から開放されます。

export GO111MODULE=on # Go 1.11 から利用可能
export GOBIN=$HOME/bin
export GOMODCACHE=$HOME/.cache/go_mod # Go 1.15 から利用可能

そのため、例えば ~/bin を使いたい場合は GOBIN=$HOME/bin と指定することにより $GOPATH/bin から開放されます。

<!--}}}-->

- [GitHub - sekky0905/Go_equivalence: Go の等値と等価](https://github.com/sekky0905/Go_equivalence){{{
  等値を確認したい時
  &struct でもって、比較する。アドレスを比較し、指しているものが「完全に同一か」どうかを確認する。&struct1 == &struct2 を用いる。(アドレスを比較すので&をつけてつけて比較) reflect.DeepEqual(&struct1, &struct2) は一見等値に見えるが、そうではないので注意!

等価を確認したい時
struct でもって、比較する。アドレスは別で良くて、単純に指しているものが「同じ内容か」どうかを確認する。struct1 == struct2 か reflect.DeepEqual(struct1, struct2) だが、後者を使用した方がよさそう。

<!--}}}-->

Generics<!--{{{-->

- [Why Generics? - The Go Blog](https://blog.golang.org/why-generics)
- [Go 言語にやってくる Generics は我々に何をもたらすのか](https://zenn.dev/mattn/books/4c7de85ec42cb44cf285)
<!--}}}-->

golang module management.<!--{{{-->

- [GitHub - imdario/mergo: Mergo: merging Go structs and maps since 2013.](https://github.com/imdario/mergo)

learn golang topics <https://github.com/pathbox/learning-go/tree/dc1e02df7594f394d559c1fcf466a817473d6ad2/src>

モジュールとパッケージとは
モジュール＝パッケージを一つまたは複数のサブパッケージを取りまとめたカタマリ。
パッケージ＝フォルダ単位で単一ファイルまたは複数ファイルのカタマリ。
サブパッケージ＝サブフォルダにおくだけで扱いはパッケージと同等。

<!--}}}-->

pointer<!--{{{-->

```
type Hoge struct {
	Field string
}
func func1() {
	m := map[string]*Hoge{"hoge": &Hoge{}}
	m["hoge"].Field = "hello"
}
func func2 () {
	m := map[string]Hoge{"hoge": Hoge{}}
	m["hoge"].Field = "hello"
}
- [「Go 初心者が気を付けること」の解説](https://zenn.dev/nobonobo/articles/e0af4e8afc6c38b42ae1)

```

func1 ではマップから取り出した値が構造体ポインタなので元の実体のフィールドに代入することはできます。func2 ではマップから取り出した値は構造体のコピーなのでそのフィールドを書き換えても元の値が書き換わることはありません。

<!--}}}-->

go2<!--{{{-->

```
package main

import (
	"fmt"
)

func ʔ[T any](cond bool, t, f T) T {
	if cond {
		return t
	}
	return f
}

func main() {
	fmt.Println(ʔ(true, "yes", "no"))
	fmt.Println(ʔ(false, "yes", "no"))
}
```

<!--}}}-->

io.Reader , io.Writer の抽象性<!--{{{-->

```
func TranslateIntoGerman(r io.Reader) {
	data := make([]byte, 300)
	len, _ := r.Read(data)
	str := string(data[:len])

	result := strings.ReplaceAll(str, "Hello", "Guten Tag")
	fmt.Println(result)
}
```

```
// ファイルの中身を読み込んで文字列置換する関数
func FileTranslateIntoGerman(f *os.File) {
	data := make([]byte, 300)
	len, _ := f.Read(data)
	str := string(data[:len])

	result := strings.ReplaceAll(str, "Hello", "Guten Tag")
	fmt.Println(result)
}

// ネットワークコネクションからデータを受信して文字列置換する関数
func NetTranslateIntoGerman(conn net.Conn) {
	data := make([]byte, 300)
	len, _ := conn.Read(data)
	str := string(data[:len])

	result := strings.ReplaceAll(str, "Hello", "Guten Tag")
	fmt.Println(result)
}
```

bufio.Reader 型を作るための元になるリーダーが、具体型ではなく io.Reader であることで、「ネットワークでもファイルでもその他の I/O であっても、buffered I/O にできる」のです。
ここからも「io パッケージによる I/O 抽象化」のメリットを感じることができます。

ですが「ファイルを 1 個 1 個用意する」とかいう面倒な方法をせずとも、strings.Reader 型を使うことで、テスト内容をコード内で用意することができるのです。

<!--}}}-->

Go でリテラルと呼ばれるものを挙げると以下の通り。<!--{{{-->

整数リテラル
小数点リテラル
複素数リテラル
rune リテラル
文字列リテラル
型リテラル
composite リテラル
構造体リテラル
配列リテラル
スライスリテラル
マップリテラル
関数リテラル

<!--}}}-->

// Go cmd<!--{{{-->

go list -m all で、現在の依存モジュールを表示する
go mod tidy で、使われていない依存モジュールを削除する

<!--}}}-->

GOOS=linux GOARCH=amd64 go build main.go
