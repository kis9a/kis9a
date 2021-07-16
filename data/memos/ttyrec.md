ttyrec
ttygif
ttycast
ttyplay


nroff -man ttyplay.1 | less


ターミナル操作のアニメーション化をユースケース毎にまとめてみた
https://dev.classmethod.jp/articles/terminal-animation-creation-summarize-by-case/

ttyrec と ttygif でターミナル操作を gif 画像にする 
ttygif -in file -out outputfile.gif
ttygif -in file -out outputfile.gif -s 2

ターミナル操作をリアルタイム配信する
操作を録画しておくのではなく、リアルタイムに配信することもできます。
一番簡単な方法は、ターミナルの記録と配信を同時に行ってくれるラッパを使うことです

$ ttyreccast <録画ファイル>

$ ttyplay <録画ファイル> | PORT=<ポート> ttycast -s <横>x<縦> # http://0.0.0.0:<ポート> で内容を確認できる
