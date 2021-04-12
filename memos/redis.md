1stcase
create api to return first 20post and thread length.

2stcase


インメモリデータベース
ディスクではなく高速なメインメモリにデータを格納
高速かつ安定したパフォーマンスを提供
大容量のデータに不向き
部分的なデータ保存に向いている
定期的にディスクに書き込みデータを永続化する
別名データ構造サーバ
キーに紐づく値の一般的な関係はもちろん複雑なデータ構造も扱える
KVS
Key, Value Store の頭文字
キーに紐づく値のこと
例）Name(key): "Taro"(value)
長いキーは推奨されていない
データ・タイプ
String：シンプルなデータ
例）Name: "Taro"
List：順番に並べた複数の要素
例）時系列的なデータ
Set：順不同の複数の要素（重複を許さない）
例）タグ，ソーシャルグラフ
Sorted Set：Set の特徴を持ちつつも個々の要素にスコアが付く
例）ランキング
Hashe：連想配列
例）わかりやすいラベルと値のセット

```
brew install redis
redis-server
redis-cli
> select number
> bgsave
> set keyname value
> get key
> mget key1 key2
> get age
> incr age
> decr age
> incrby age 10
> decrby age 10
> keys *
> keys [an]*
<!-- keyの表示 -->
<!-- 形式 -->
<!-- すべてのkeyの取得：keys * -->
<!-- 条件指定：keys 正規表現 -->

<!-- 使える正規表現 -->
<!-- ? ・・・任意の1文字 -->
<!-- * ・・・ 任意の文字列 -->
<!-- [ ] ・・・ 角カッコ内の文字のどれか1文字 -->
> exisits name
> exsist image
> rename age nenrai
> keys age
> keys nenrai
> del keyname 20 <- second
> expire keyname 10 <- second
> sort ...
> rpush keyname value value2 value3
> rpush lindex students 1
> lrange students 0 -1
> llen students <- length
> sadd keyname value value2 value3 <- set value
> smembers keyname <- display value list
> srem keyname value <- delete value
和集合：sunion キー名1 キー名2
差集合：sdiff キー名1 キー名2
積集合：sinter キー名1 キー名2
> sorted set
> zrank keyname value
> zrem key

# キー一覧
keys *

# キーの値を取得
get #{key名}

# キーをセット
set #{key名} #{値}

# キーを削除
del #{key名}

# ttl取得 (-1の場合は値がないか、期限がない)
ttl #{key名}

# キーを全削除
flushall

```

new
connect
set_timeout
set_timeouts
set_keepalive
get_reused_times
close
init_pipeline
commit_pipeline
cancel_pipeline
hmset
array_to_hash
read_reply
add_commands
