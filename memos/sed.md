'#'で始まるコメント行を削除する。
sed '/^#/d' source.txt

空行を削除
sed '/^$/d' source.txt

先頭#の行と空行を削除
cat source.txt | grep -v '^#' | sed '/^$/d'

file1.txt の 15 行目から 26 行目までを削除して file2.txt に保存する。
sed '15,26d' file1.txt > file2.txt

指定行の間でコメントアウト解除する(89 ～ 94 行目の先頭の#を外す)
sed -i -e "89,94s:^#::" source.txt

CR+LF を LF にする
sed -i -e 's/\r//g' source.txt

LF に CR を追加して CR+LF にする #よく間違うのが's/\n/\r\n/'では置換出来ないので注意
sed -i -e 's/$/\r/' source.txt

1 ～ 9 行目を削除する
sed '1,9d' sample.txt

1 番目に出現した'Linux'を'リナックス'に
sed -e '0,/claudio/ s/claudio/claudia/' nomi
sed -e 's/Linux/リナックス/' source.txt

3 番目に出現した'Linux'を'リナックス'に
sed -e 's/Linux/リナックス/3' source.txt

すべての'Linux'を'リナックス'に
sed -e 's/Linux/リナックス/g' source.txt
'Linux LINUX linux' をすべて'リナックス'へ
sed -e 's/(Linux|LINUX|linux)/リナックス/g' source.txt

#もしくは末尾に大文字小文字無視の i をつけてもいい
sed -e 's/linux/リナックス/gi' source.txt

特定文字を含む行に対して置換

# /～/ を前置すると～を含む行という条件になる

# /～/!で前置すると～を含まない行という条件になる

# ,で始まる行に対しての例

# ,で始まる行で大文字小文字を無視してすべての'linux'を'リナックス'に

sed -e '/^,/s/linux/リナックス/gi' source.txt

# ,で始まらない行に対しての例

# ,で始まらない行で大文字小文字を無視してすべての'linux'を'リナックス'に

sed -e '/^,/!s/linux/リナックス/gi' source.txt
正規表現でマッチして文字を追加
#'>'を含む行で、A-Z の 6 ケタ[ ¥([A-Z]\{6\}¥) ]の文字を見つけたら、それに対して'\_'を付与する

# > CENTOS67 という文字を対象にした場合、> CENTOS_67 に置換される

sed -e 's/^>¥([A-Z]\{6\}¥)/\1\_/g' source.txt
置換した行だけ表示する(p)
sed -n 's/linux/リナックス/p' source.txt
複数の条件で置換する
sed -e 's/AAA/BBB/g' -e 's/CCC/DDD/g' source.txt
置換範囲を限定する
#11 行目～ 25 行目まで AAA を BBB に置換する
sed -e '11,25 s/AAA/BBB/g' source.txt
開始と終了の文字列を指定して置換する

# '#START'から'#END'く括られた範囲で置換をする

sed -e '/#START/,/#END/ s/YYYYMM/201603/g' source.txt
特定文字列が出たら読み飛ばす

# '#SKIP'が出たら次の行(N;)は読み飛ばす、数行読み飛ばす場合は N;N;みたいにする

sed '/#SKIP/{N; s/YYYY/2016/g}' source.txt
文字列の変換
sed -e "s/oldtext/newtext/g"

文字列の削除
sed -e "s/text//"

行頭に text があった場合削除
sed -e "s/^text//"

行末に text があった場合削除
sed -e "s/text\$//"

abc の後に文字列を追加
sed -e "s/abc/abcxyz/g"

行頭に文字列を追加
sed -e "s/^/text/"

行末に文字列を追加
sed -e "s/\$/text/"

._は全ての文字列を abc に
sed -e "s/._/abc/"

タブをスペースに変換
sed -e 's/<tab>/<space>/g'

複数のスペースを 1 つのスペースに変換
sed -e 's/<space><space>\*/<space>/g'

ホワイトスペースを 1 つのスペースに変換
sed -e 's/[<space><tab>][<space><tab>]\*/<space>/g'

行頭のホワイトスペースを削除
sed -e 's/^[<space><tab>]\*//'

行末のホワイトスペースを削除
sed -e 's/[<space><tab>]\*$//'

text を含んだ行を削除
sed -e "/text/d"

空白行を削除
sed -e '/^$/d'

5 行目から 20 行目を変換
sed -e "5,20s/oldtext/newtext/g"

1 行目を削除
sed -e '1d'

1 行目を表示
sed -n '1p'

特定行数ごとに何かする

# 45 行毎に改行を入れる

sed 's/.\{45\}/&\n/g' source.txt

メタ文字(よく忘れるので)
^ 先頭
$ 後尾
. 任意の 1 文字

- 直前の文字の 0 回以上の繰り返し
  \+ 直前の文字の 1 回以上の繰り返し
  \? 直前の文字が 0 回または 1 回のみ出現
  [] 文字クラス、[abc0-9] ならば数字と a, b, c のどれか 1 文字
  \| OR、[ab|ap] ならば ab または ap
  \{3\} 直前の文字が 3 回だけ出現
  \{3,5\} 直前の文字が 3〜5 回出現
  \b 単語区切り
  アドレスコマンド(ほぼ s しか使わないかも)
  d その行を出力しない
  p その行を出力する、-n をつけると変換前のものは出力しない
  s 置換
  y 一文字ずつ置換
  q 終了
  SED のオプション(大体はパイプを通すので上書きオプションとか忘れがち)

# 条件式スクリプトを直接指定

-e 'スクリプト'

# 条件式スクリプトが記述されているファイルを指定

-f 'スクリプトファイル名'

# 表示を抑制（明示的にスクリプト中で p をすれば表示も可能）

-n 'スクリプト'

# 拡張正規表現を使ったスクリプトを記述

-r '正規表現を使ったスクリプト'

-i 入力ファイルの上書き

# 上書き前のファイルに拡張子.bak をつけて保管することもできる

sed -i.bak -e '/^#/d' config.txt
SED の条件式
行数 処理する行数を指定する
行数,行数 指定した行数間の文字列を処理する。$を指定すると最後の行を表せる
/文字列/     指定した文字列が現れる行を処理する。先頭に「^」を付けると指定した文字列から始まる行，末尾に「$」を付けると指定した文字列で終わる行が対象になる。行数の範囲指定でも利用できる
:ラベル b および t コマンド用のラベル #コメント コメント
{..} 括弧（かっこ）内をブロックとして扱う
= 現在の行番号を表示する
a 文字列 文字列を追加する。ただし改行をしたい場合はその前に\を付ける
i 文字列 文字列を挿入する。ただし改行をしたい場合はその前に\を付ける
q 処理を中断し sed を終了する
r ファイル名 指定したファイルを読み出し，追加する
b ラベル 指定したラベルに移動する
t ラベル s///が成功していれば指定したラベルに移動する
c 文字列 選択している行を文字列に置換する。ただし改行をしたい場合はその前に\を付ける
d パターン・スペースを削除する
D パターン・スペース内の最初の改行までを削除する
h パターン・スペースをホールド・スペースにコピーする
H パターン・スペースをホールド・スペースに追加する
g ホールド・スペースをパターン・スペースにコピーする
G ホールド・スペースをパターン・スペースに追加する
x ホールド・スペースとパターン・スペースを入れ替える
n 次の行をパターン・スペースに読み込む
N 次の行をパターン・スペースに追加する
p 現在のパターン・スペースを表示する
P 現在のパターン・スペースの最初に現われる改行までを表示する
w ファイル名 現在のパターン・スペースを指定したファイルに書き込む
s/置換条件/置換文字/ 置換条件を置換文字に変換する。最後に g を付けた場合は置換条件に当てはまるすべての文字列が置換される
y/変換対象の文字/変換文字/ 変換対象の文字を変換文字に変換する

echo 'VIRTUALBOX UTILITIES' | boxes | sed -e 's/\*/#/g' | sed -e 's/\//#/g'

```

 UNIX         |  SED
 -------------+----------------------------------------------------------------
 cat          |  sed ':'
 cat -s       |  sed '1s/^$//p;/./,/^$/!d'
 tac          |  sed '1!G;h;$!d'
 grep         |  sed '/patt/!d'
 grep -v      |  sed '/patt/d'
 head         |  sed '10q'
 head -1      |  sed 'q'
 tail         |  sed -e ':a' -e '$q;N;11,$D;ba'
 tail -1      |  sed '$!d'
 tail -f      |  sed -u '/./!d'
 cut -c 10    |  sed 's/\(.\)\{10\}.*/\1/'
 cut -d: -f4  |  sed 's/\(\([^:]*\):\)\{4\}.*/\2/'
 tr A-Z a-z   |  sed 'y/ABCDEFGHIJKLMNOPQRSTUVWXYZ/abcdefghijklmnopqrstuvwxyz/'
 tr a-z A-Z   |  sed 'y/abcdefghijklmnopqrstuvwxyz/ABCDEFGHIJKLMNOPQRSTUVWXYZ/'
 tr -s ' '    |  sed 's/ \+/ /g'
 tr -d '\012' |  sed 'H;$!d;g;s/\n//g'
 wc -l        |  sed -n '$='
 uniq         |  sed 'N;/^\(.*\)\n\1$/!P;D'
 rev          |  sed '/\n/!G;s/\(.\)\(.*\n\)/&\2\1/;//D;s/.//'
 basename     |  sed 's,.*/,,'
 dirname      |  sed 's,[^/]*$,,'
 xargs        |  sed -e ':a' -e '$!N;s/\n/ /;ta'
 paste -sd:   |  sed -e ':a' -e '$!N;s/\n/:/;ta'
 cat -n       |  sed '=' | sed '$!N;s/\n/ /'
 grep -n      |  sed -n '/patt/{=;p;}' | sed '$!N;s/\n/:/'
 cp orig new  |  sed 'w new' orig
 hostname -s  |  hostname | sed 's/\..*//'

```
