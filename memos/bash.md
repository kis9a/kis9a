[bash tips](http://kodama.fubuki.info/wiki/wiki.cgi/bash/tips?lang=jp)

- https://gnu.org/savannah-checkouts/gnu/bash/manual/bash.html
- https://github.com/google/styleguide/blob/gh-pages/shellguide.md
- https://github.com/josa42/coc-sh
- https://github.com/koalaman/shellcheck
- https://github.com/lfkdev/bashtemplate

bash デバッグ Tips

- https://qiita.com/rsooo/items/ef1d036bcc7282a66d7d
- https://qiita.com/mashumashu/items/ee436b770806e8b8176f
- https://qiita.com/aosho235/items/4e913905a130c0eaf86d

[標準出力に出しつつ、パイプ先のコマンドにも繋ぐ | tellme.tokyo](https://tellme.tokyo/post/2020/02/07/tee-command/)

その他の演算子
ファイルやディレクトリの存在を確認する際に使用できる演算子についてまとめました。

演算子 説明
-a ファイル ファイルがあれば真
-b ファイル ファイルがありブロックス特殊ファイルであれば真
-c ファイル ファイルがありキャラクター特殊ファイルであれば真
-d ファイル ファイルがありディレクトリであれば真
-e ファイル ファイルがあれば真
-f ファイル ファイルがあり通常のファイルであれば真
-g ファイル ファイルがあり SGID(特殊なアクセス権)であれば真
-G ファイル ファイルがあり実行グループ ID による所有者であれば真
-h ファイル ファイルがありシンボリックであれば真（-L と同じ）
-k ファイル ファイルがありステッキービットが設定されていれば真
-L ファイル ファイルがありシンボリックであれば真（-h と同じ）
-O ファイル ファイルがあり実行ユーザ ID による所有者であれば真
-p ファイル ファイルがあり名前付きパイプ（named pipe）であれば真
-r ファイル ファイルがあり読み取り可能であれば真
-s ファイル ファイルがありサイズが 0 より大きければ真
-S ファイル ファイルがありソケットであれば真
-t FD FD（ファイルディスクリプタ）が端末でオープンされていれば真
-u ファイル ファイルがあり SUID(特殊なアクセス権)であれば真
-w ファイル ファイルがあり書き込み可能であれば真
-x ファイル ファイルがあり実行可能であれば真

- [bash, zsh で yes/no 判定をするワンライナー - Qiita](https://qiita.com/u1and0/items/a628db9644a72b11584c)

- [shell - How do you echo a 4-digit Unicode character in Bash? - Stack Overflow](https://stackoverflow.com/questions/602912/how-do-you-echo-a-4-digit-unicode-character-in-bash)

```bash
a_flag=''
b_flag=''
files=''
verbose='false'

print_usage() {
  printf "Usage: ..."
}

while getopts 'abf:v' flag; do
  case "${flag}" in
    a) a_flag='true' ;;
    b) b_flag='true' ;;
    f) files="${OPTARG}" ;;
    v) verbose='true' ;;
    *) print_usage
       exit 1 ;;
  esac
done
```

```
-eq

    is equal to

    if [ "$a" -eq "$b" ]
-ne

    is not equal to

    if [ "$a" -ne "$b" ]
-gt

    is greater than

    if [ "$a" -gt "$b" ]
-ge

    is greater than or equal to

    if [ "$a" -ge "$b" ]
-lt

    is less than

    if [ "$a" -lt "$b" ]
-le

    is less than or equal to

    if [ "$a" -le "$b" ]
<

    is less than (within double parentheses)

    (("$a" < "$b"))
<=

    is less than or equal to (within double parentheses)

    (("$a" <= "$b"))
>

    is greater than (within double parentheses)

    (("$a" > "$b"))
>=

    is greater than or equal to (within double parentheses)

    (("$a" >= "$b"))

string comparison

=

    is equal to

    if [ "$a" = "$b" ]

    Caution

    Note the whitespace framing the =.

    if [ "$a"="$b" ] is not equivalent to the above.
==

    is equal to

    if [ "$a" == "$b" ]

    This is a synonym for =.

    Note

    The == comparison operator behaves differently within a double-brackets test than within single brackets.

    [[ $a == z* ]]   # True if $a starts with an "z" (pattern matching).
    [[ $a == "z*" ]] # True if $a is equal to z* (literal matching).

    [ $a == z* ]     # File globbing and word splitting take place.
    [ "$a" == "z*" ] # True if $a is equal to z* (literal matching).

    # Thanks, Stéphane Chazelas

!=

    is not equal to

    if [ "$a" != "$b" ]

    This operator uses pattern matching within a [[ ... ]] construct.
<

    is less than, in ASCII alphabetical order

    if [[ "$a" < "$b" ]]

    if [ "$a" \< "$b" ]

    Note that the "<" needs to be escaped within a [ ] construct.
>

    is greater than, in ASCII alphabetical order

    if [[ "$a" > "$b" ]]

    if [ "$a" \> "$b" ]

    Note that the ">" needs to be escaped within a [ ] construct.

    See Example 27-11 for an application of this comparison operator.
-z

    string is null, that is, has zero length

     String=''   # Zero-length ("null") string variable.

    if [ -z "$String" ]
    then
      echo "\$String is null."
    else
      echo "\$String is NOT null."
    fi     # $String is null.

-n

    string is not null.

    Caution

    The -n test require

```

```

| オプション | 説明 | 補足 |
| --- | --- | --- |
| -eq | 等しければ真 | equal |
| -ne | 等しくなければ真 | not equal |
| -lt | より小なら真 | less than |
| -le | 以下なら真 | less than or equal |
| -gt | より大なら真 | greater than |
| -ge | 以上なら真 | greater than or equal |

| オプション | 説明 |
| --- | --- |
| = | 等しければ真 |
| != | 等しくなければ真 |

| オプション | 説明 |
| --- | --- |
| -d | ディレクトリなら真 |
| -f | 普通のファイルなら真 |
| -s | サイズが 0 より大きければ真 |
| -e | 存在するなら真 |
| -r | 読み取り可能なら真 |
| -w | 書き込み可能なら真 |
| -x | 実行可能なら真 |

| オプション | 説明 |
| --- | --- |
| -z | 文字列長が 0 なら真 |
| -n | 文字列長が 0 より大なら真 |

| 変数 | 説明 |
| --- | --- |
| $# | 実行時に指定された引数の数 |
| $1 | 実行時に指定された 1 番目の引数 |
| $n | 実行時に指定された n 番目の引数 |

| 変数 | 説明 |
| --- | --- |
| $? | 直前のコマンドの実行結果 |

シングルクォート　「’」　内容を文字列として出力
ダブルクォート 　「”」　変数の内容を文字列として出力
バッククォート 　「`」　コマンドとして実行して結果を出力
```
