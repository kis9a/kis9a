SHOW VARIABLES LIKE '%commit%';

- [x] make table for test db_trans.
- [x] sort out what kind of sql operations.
- [x] try lua error, pcall method.
- [ ] functions compare pcall xcall trycall.
- [ ] mysql error method.
- [ ] rollback function.

[Search Conversations](https://groups.google.com/g/openresty/search?q=mysql%20transaction)

```
DROP TABLE test_db_transaction_lua;

CREATE TABLE IF NOT EXISTS test_db_transaction_lua (
    name VARCHAR(255) NOT NULL,
    id bigint(20) NOT NULL AUTO_INCREMENT,
    ins_t TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB;

INSERT INTO test_db_transaction_lua (name) VALUES ("one");
INSERT INTO test_db_transaction_lua (name) VALUES ("two");
INSERT INTO test_db_transaction_lua (name) VALUES ("three");
INSERT INTO test_db_transaction_lua (name) VALUES ("four");
DELETE FROM test_db_transaction_lua where name = four

```

INSERT INTO test (name) VALUES ("one");
INSERT INTO test (name) VALUES ("two");
INSERT INTO test (name) VALUES ("three");
INSERT INTO test (name) VALUES ("four");
DELETE FROM test where name = four

<!-- - [ ] -->

- [「トランザクション」とは何か？を超わかりやすく語ってみた！ - Qiita](https://qiita.com/zd6ir7/items/6568b6c3efc5d6a13865)

複数の処理を 1 つにまとめたもの。
ただし、これら「複数の処理」は分離させることはできない。

「トランザクション」は成功か失敗のいずれか

- To start a transaction, you use the START TRANSACTION statement. The BEGIN or BEGIN WORK are the aliases of the START TRANSACTION.
- To commit the current transaction and make its changes permanent, you use the COMMIT statement.
- To roll back the current transaction and cancel its changes, you use the ROLLBACK statement.
- To disable or enable the auto-commit mode for the current transaction, you use the SET autocommit statement.

support

db trans の流れ
PHP のサンプル
https://stackoverflow.com/questions/2708237/php-mysql-transactions-examples
MySQL のサンプル
https://www.mysqltutorial.org/mysql-transaction.aspx/

以下の場所で書きましょう
db.lua
db_trans(schema:string, queries:array)

テスト用の function
tests/test_db.lua
trans()

注意事項
複数台の db がある場合は、
書き込みは全部 master、読み込みは slave
なので、
最初から
local db = db_conn($schema, false)
で一個の master へのコネクションを取得し、
その後の処理は全部同じ db connection を使用する必要があります

終わったら
エラーがなければ db:set_keepalive(conf.db_keepalive, db.db_poolsize)

Q: dbc_query

2.3 – エラー処理
Lua は組み込み型の拡張言語なので、Lua のすべての活動はホストプログラム内の C のコードが Lua のライブラリ関数を呼ぶことから始まります。 (スタンドアロンの Lua を使うときは lua アプリケーションがホストプログラムです。) Lua のチャンクのコンパイル中や実行中にエラーが発生すると、制御がホストに戻り、適切な処置を取ることができます (例えばエラーメッセージを表示するなど)。
Lua のコードからは error 関数を呼ぶことでエラーを明示的に発生できます。 Lua でエラーをキャッチする必要がある場合は、 pcall または xpcall を使って保護モードで関数を呼びます。

エラーが発生すると、エラーオブジェクト (エラーメッセージとも言います) がそのエラーに関する情報とともに伝播されます。 Lua 自身からエラーが発生するときは、エラーオブジェクトは必ず文字列ですが、プログラムからは任意の値をエラーオブジェクトとしてエラーを発生させることができます。 それらのエラーオブジェクトをどう扱うかは、その Lua のプログラムやホスト次第です。

Performing Transactions
Transactions are a mechanism that ensures data consistency. Transactions should have the following four properties −

Atomicity − Either a transaction completes or nothing happens at all.

Consistency − A transaction must start in a consistent state and leave the system in a consistent state.

Isolation − Intermediate results of a transaction are not visible outside the current transaction.

Durability − Once a transaction was committed, the effects are persistent, even after a system failure.

