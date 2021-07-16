
### ripgrep

-t js, include javascript filtype.
-T js, exclude javascript filetype.

globとファイルの中身への検索を組み合わせてrg foo -g '*.min.js' ./publicとか書けるのがいい。 部分一致でなくパターンマッチングも使えます、rg -e '^foo' -g '*.md'


### fd

オプション無しでregexパターンを渡します。cd /etc && fd '^x.*rc$'
末尾でのディレクトリ指定が直感的でいい。 fd '^x.*rc$' /etc
-e 拡張子指定。あんま使わないかも、fd 'png$'みたいにパターンマッチを書くことのほうが多い。
-d maxDepthのこと。あんま使わないかな。
-E excludeパターンマッチを書ける。-iよりこっちのほうがよく使うかも。node_modulesの除外などに。
-0 検索結果をNULLでセパレートしてくれる、検索結果をリダイレクトしてxargsへ渡したいときに助かります。

### json2csv

- [GitHub - jehiah/json2csv: command line tool to convert json to csv](https://github.com/jehiah/json2csv)
