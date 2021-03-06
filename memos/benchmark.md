- [結局、Go 言語をやめる理由はなかった件 - Qiita](https://qiita.com/Maki-Daisuke/items/23c1285500208048de80)
  > プログラムの実行時間は次のような時間の合計です：
  > ユーザー空間で実行されてる時間（user time)
  > カーネル空間で実行されている時間（system time）
  > ファイルやネットワークなどの入出力結果を待っている時間（idle time）

Go の database/sql（正確にいうと go-sql-driver/mysql）では Exec の SQL 文のパース結果をキャッシュしません。そのため、毎回 SQL 文のパース処理が行われます。

Go の場合は、何度も同じ SQL 文を実行するなら明示的に Prepare を使うべきです。

- ベンチマークをする時には制約条件を明確にしましょう
- 想定するデータの制約
- 利用可能なメモリの制約
- 利用していい手段の制約（たとえば Cgo とか CFFI を使って C でゴリゴリにチューニングするのはアリか？）
- ベンチマークをするときには、何を測定しているのかを明確にしましょう
- ネットワーク遅延も含めたワークロード全体？
- CPU が仕事をしている時間？
- ユーザー空間で CPU を使っている時間？
- 自分が書いた部分のコードが CPU を使っている時間？
- ベンチマークをするときは、結果を再現可能するための情報を可能な限り記録しましょう
- 実行環境（マシンの種類、CPU、RAM 等）
- 実行したコード
- 実行したコマンドの履歴
- ベンチマークをするときは、標準的なツールを使いましょう
- Go なら go test -bench、Python なら pytest
- ただし、異なる言語間での比較をしたい場合はツールを揃えるのは難しい
- でも、time コマンドはほぼすべての UNIX-like 環境で使える
- [pprof - The Go Programming Language](https://golang.org/pkg/runtime/pprof/)
