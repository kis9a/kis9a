## grep

+ requires that the pattern before it would have at least one match and can also have more.
* on the other hand doesn't require a match. It could have 0, 1 or more than 1 matches.
If you also need to match empty values i.e. name="" you can use *.
By the way the difference with + (no quoting with \) from (\+) is that the former is a form of extended regex while the latter is for a normal form of regular expression.
At least with grep/egrep the statement is true. – konsolebox Jul 8 '14 at 13:24

-c	指定したパターンにマッチした行数を出力
-h	ファイル名を先頭に付ける
-i	大文字と小文字を区別しない
-l	ファイル名のみを出力する
-n	マッチした行の行番号を出力する
-s	エラーを表示しない
-v	パターンにマッチした行以外を出力する
-w	パターンを単語としてマッチ
-E	正規表現を利用してマッチングを行う場合、-Eで明示しておくと良い

grep 検索したい文字列 検索したいテキストファイル

コマンド | grep 検索したい文字列

grep -e 検索したい文字列1 -e 検索したい文字列2 検索したいテキストファイル

grep -i 検索したい文字列 検索したいテキストファイル
grep -E '正規表現' source.txt

#利用できる正規表現

.                    改行文字以外の任意の1文字
*                    直前の1文字の0回以上の繰り返しに一致。直前の文字は正規表現でも構わない
^                    行の先頭
$                    行の末尾
[ ]                  かっこ内の任意の1文字に一致。ハイフン（-）で範囲指定もできる
[^ ]                 かっこ内の任意の1文字に不一致。ハイフン（-）で範囲指定もできる
\+                   直前の文字の1個以上の繰り返しに一致
\?                   直前の文字の0または1文字に一致
\{n\}                直前の文字のn個の繰り返しに一致
\{n,\}               直前の文字のn個以上の繰り返しに一致
\{,m\}               直前の文字のm個以下の繰り返しに一致
\{n,m\}              直前の文字のn個以上，m個以下の繰り返しに一致
pattern1\|pattern2   pattern1またはpattern2のいずれかに一致
\(pattern\)          patternをグループ化する。マッチした内容は\numで参照できる
\                    正規表現に使われる記号を普通の文字として扱う

例
grep '\[0-9]' source.txt                           # '[0-9]'の文字列を検索
grep -E '(\[0-9]){2}' source.txt                   # '[0-9]'が2回続く文字列を検索
grep '[Ll]inux' source.txt                         # 「Linux」または「linux」が含む行を検索する
grep '\<[Ll]inux\>' source.txt                     #  独立した「Linux」または「linux」が含む行を検索する、RedhatLinuxとかは含まない
grep '[1-9][0-9][0-9][A-Z][0-9]' source.txt        # 先頭に0を含まず123A7のようなパターンに一致
grep '^[0-9]' source.txt                           # 数字を含まない行を検索する
grep '.....' source.txt                            # 5文字以上の行だけ探す
grep '\<W...s\>$' source.txt                       # 先頭がW、末尾がsの文字列を探す
grep '.' source.txt                                # 空行を除外
grep '^\<EX\>\{1,3\}' source.txt                   # EXという文字が1～3回出る行
grep '\<[A-Z]\{\6,15\}\>' source.txt               # 大文字アルファベットが6～15文字含む行
grep '\<[A-Za-z]\{\6,15\}\>' source.txt            # 大文字小文字アルファベットが6～15文字含む行
grep '\<[^0-9A-Za-z]\{\6,15\}\>' source.txt        # 大文字小文字アルファベットと数字以外の文字が6～15文字含む行
grep '[0-9]\{3\}-[0-9]\{3\}-[0-9]\{4\}' source.txt # 電話番号000-000-0000を含む行

複数のパターンで検索する
grep -E 'パターン1|パターン2' source.txt

大文字小文字区別せずに検索する
grep -i 'パターン' source.txt

パターンを除外して表示
grep -v 'パターン' source.txt

#たとえばps auxをした際
ps aux | grep java
#とすると"grep java"自体もヒットしてしまうが
ps aux | grep java | grep -v grep
#とすれば、grep自体は引っ掛からない

パータンの出現行数を数える
grep -c 'パターン' source.txt

grep -w 'パターン' source.txt

#たとえば
grep -w 'if' source.txt
#とやると、elseifやendif、iftopなどifを含むものは引っ掛からず、" if "と独立しているモノだけ引っ掛かる

banana を含むファイルを検索します。
user@host: ~$ grep -lr banana .

apple を含むファイルを検索します。
user@host: ~$ grep -lr apple .

banana を含まないファイルを検索します。
user@host: ~$ grep -vlr banana .

grep -lr <肯定条件> . | xargs grep -L <否定条件>

## ripgrep

```
o Recursively search the current directory for a regex pattern:
rg pattern

o Search for pattern including all .gitignored and hidden files:
rg -uu pattern

o Search for a pattern only in a certain filetype (e.g., html, css, etc.):
rg -t filetype pattern

Search for a pattern only in a subset of directories:
rg pattern set_of_subdirs

Search for a pattern in files matching a glob (e.g., README.*):
rg pattern -g glob

o Only list matched files (useful when piping to other commands):
rg --files-with-matches pattern

o Show lines that do not match the given pattern:
rg --invert-match pattern

o Search a literal string pattern:
rg -F string
```

---


