[VIM で置換するときの s コマンドの使い方メモ - Qiita](https://qiita.com/yamazon/items/32ddc0f1cc8a8b63e339)

s コマンドを使うと、vim 内で sed と同じことができる。

:s/before/after/
現在カーソルがある行の一番はじめに出てくる before を after に置換

:s/before/after/g
現在カーソルがある行の全ての before を after に置換

:1s/before/after/
現在開いているファイル 1 行目の一番はじめに出てくる before を after に置換

:1s/before/after/g
現在開いているファイル 1 行目に出てくる全ての before を after に置換

:1,10s/before/after/g
現在開いているファイル 1〜10 行目に出てくる全ての before を after に置換

:%s/before/after/
現在開いているファイルの各行の一番はじめに出てくる before を after に置換

:%s/before/after/g
現在開いているファイルに出てくる全ての before を after に置換

:%s/before/after/gc
c をつけると、確認(yes/no)が出るようになります。

:1,10s#before#after#gc
"/"は別の文字でも可能。オススメは "#" (見易いので。また、/を\でエスケープしなくてよくなる)。

:%s#a\|b#c#g
a または b を、c に置換する。
BRE の (sed や grep と同じ) 正規表現になる。
| は or 条件を表す。
\ で | をメタ文字にする(エスケープする)。

:%s#\va|b#c#g
a または b を、c に置換する
\v で ERE の (grep -e、egrep、awk、perl と同じ) 正規表現になる。

:%s#\v(a|b)#\1c#g
a または b を、ac または bc に置換する
\1 は ( ) にマッチしたパターン文字列になる
oniguruma の$1 と同じ
