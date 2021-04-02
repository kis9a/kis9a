[シェルスクリプトを書くときに気をつける9箇条 - Qiita](https://qiita.com/b4b4r07/items/9ea50f9ff94973c99ebe)

### 1. グローバル変数は大文字
### 2. awk を知る
### 3. bash に依存しているのに #!/bin/sh と書かない
### 4. 改行コードに気をつける
### 5. サブシェルを意識する
cd なども同じです。サブシェルでの移動は影響しないです。カレントディレクトリを一時的に変更して、すぐに戻りたい場合なんかに利用するといいでしょう。

sh
( cd ~/src && tar cf - myproject ) | gzip -c > myproject.tar.gz
### 嵌りやすい場合
### 利用してやる場合
### 6. 汎用性を高める
### 7. 例外に関する対応
### 8. @(#) を書き示す
### 9. 環境変数 PATH を管理する



# [シェルの変数展開 - Qiita](https://qiita.com/bsdhack/items/597eb7daee4a8b3276ba)


| 記述 | 機能 |
| --- | --- |
| ${parameter:-word} | デフォルト値への置換 |
| ${parameter:=word} | デフォルト値の代入 |
| ${parameter:?[word]} | 値の検査とエラー |
| ${parameter:+word} | 代替値の使用 |
| ${#parameter} | 文字列長の取得 |
| ${parameter%word} | 最短後置パターンの削除 |
| ${parameter%%word} | 最長後置パターンの削除 |
| ${parameter#word} | 最短前置パターンの削除 |
| ${parameter##word} | 最長前置パターンの削除 |


### bash インクリメント
```sh
i=0
while [ $((i++)) -lt 10 ]
do
  echo $i
done
```

### csv to array.
```sh
cat data.csv | while read line
do
  cols=(`echo $line | tr ',' ' '`)
  for ((i=0; i < ${#cols[@]}; i++)) {
    echo "Column $((i+1)): ${cols[$i]}"
  }
done
```
### is pipe
```
function is_pipe() {
    if [ -p /dev/stdin ]; then
    #if [ -p /dev/fd/0  ]; then
    #if [ -p /proc/self/fd/0 ]; then
    #if [ -t 0 ]; then
        # echo a | is_pipe
        return 0
    elif [ -p /dev/stdout ]; then
        # is_pipe | cat
        return 0
    else
        # is_pipe (Only!)
        return 1
    fi
}
```
url_encode() {
  while read -r line # 入力を1行ずつ取り出す
  do
    echo "$line" |
      nkf -W8MQ | # ←ここで複数行に分割される
      sed 's/=$//' |
      tr '=' '%' |
      paste -s -d '\0' - | # ←ここで1行に戻す
      sed -e 's/%7E/~/g' \
          -e 's/%5F/_/g' \
          -e 's/%2D/-/g' \
          -e 's/%2E/./g'
  done
}
```

- [Shell Script Tips 完全版 - Qiita](https://qiita.com/syui/items/565cf3b6e2120beeda04)


