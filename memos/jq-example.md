- [コマンドライン JSON プロセッサー jq の演算子と関数 エラーの向こうへ](https://tech.mktime.com/entry/127)
- [jq コマンドで覚えておきたい使い方 17 個 | 俺的備忘録 〜なんかいろいろ〜](https://orebibou.com/ja/home/201605/20160510_001/)

https://qiita.com/bouzuya/items/36e21c778539ce6bc486<!--{{{-->

```sh
// [{ "title": 'hello' "id": 1}, {"title": 'happy', "id": 2}]
| jq -r 'map(.title)'

[
  'hello',
  'happy'
]

```

```sh
// [{ "title": 'hello' "id": 1}, {"title": 'happy', "id": 2}]
| jq -r 'map(.title)[]'

hello,
happy

```

```sh
// [{ "title": 'hello' "id": 1}, {"title": 'happy', "id": 2}]
| jq -r '.[] | { "title" } | .title'

hello
happy

```

<!--}}}-->

<!-- array1 {{{-->

```
# 返送配列変数を定義

$ declare -A MAP

# 連想配列に値をセット

$ MAP["key1"]=1
$ MAP["key2"]=2
$ MAP["key3"]="hoge"
$ MAP["key4"]=

# JSON 変換

$ for i in "${!MAP[@]}"; do

# 奇数行にキーを、偶数行に値を出力し、jq コマンドに食わせる

echo "$i"
  echo "${MAP[$i]}"
done | jq -c -n -R 'reduce inputs as $i ({}; . + { ($i): (input|(tonumber? // .)) })'
```

<!--}}}-->

<!-- array2 -->{{{

[]

```json
{
  "ObjectID": [0, 1, 2, 3, 4],
  "Name": ["Apple", "Orange", "Grape", "Banana", "Jackfruit"],
  "Color": ["Red", "Orange", "Green", "Yellow", "null"],
  "Acidity": [3.9, 3.5, 2.99, 6, 5.0]
}
```

# jq --raw-output 'to_entries|map(.key),(map(.value)|transpose[])|@csv'

```csv
ObjectID,Name,Color,Acidity
0,Apple,Red,3.9
1,Orange,Orange,3.5
2,Grape,Green,2.99
3,Banana,Yellow,6
4,Jackfruit,null,5.0
```

<!--}}}-->

<!-- array3 -->{{{

```json
[
    {
        "name": "A",
        "keys": ["k1", "k2", "k3"]
    },
    {
        "name": "B",
        "keys": ["k2", "k3", "k4"]
    }
]
I'd like to transform it to:

{
    "k1": ["A"],
    "k2": ["A", "B"],
    "k3": ["A", "B"],
    "k4": ["A"],
}
```

```
map({ name, key: .keys[] })
    | group_by(.key)
    | map({ key: .[0].key, value: map(.name) })
    | from_entries
```

https://stackoverflow.com/questions/32357240/transposing-objects-in-jq

<!--}}}-->

array4<!--{{{-->

```json
{
  "123": "abc",
  "231": "dbh",
  "452": "xyz"
}
```

to_entries[] | [.key, .value]

```
[
  "123",
  "abc"
],
[
  "231",
  "dbh"
],
[
  "452",
  "xyz"
]
```

```
 echo '{
  "123" : "abc",
  "231" : "dbh",
  "452" : "xyz"
}' | jq 'to_entries | map([.key, .value]|join(","))'

[
  "123,abc",
  "231,dbh",
  "452,xyz"
]

```

<!--}}}-->

<!--{{{-->

```
{
    "name": "John",
    "email": "john@company.com"
}
{
    "name": "Brad",
    "email": "brad@company.com"
}
```

$ jq -s '.' < tmp.json

```

[
    {
        "name": "John",
        "email": "john@company.com"
    },
    {
        "name": "Brad",
        "email": "brad@company.com"
    }
]

``

```

<!--}}}-->

```
jq -n '{christmas: $ARGS.named}' \
  --arg one 'partridge in a "pear" tree' \
  --arg two 'turtle doves'

{
  "christmas": {
    "one": "partridge in a \"pear\" tree",
    "two": "turtle doves"
  }
}
```

```
jq -n '{first: {name: $one, count: $ARGS.positional[0]}, all: $ARGS}' \
  --arg one 'partridge in a "pear" tree' \
  --arg two 'turtle doves' \
  --args 1 2 3

{
  "first": {
    "name": "partridge in a \"pear\" tree",
    "count": "1"
  },
  "all": {
    "positional": [
      "1",
      "2",
      "3"
    ],
    "named": {
      "one": "partridge in a \"pear\" tree",
      "two": "turtle doves"
    }
  }
}

```
