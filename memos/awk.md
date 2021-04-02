ユーザ毎のCPU使用率を見る
$ ps aux | awk '{ if(NR>1){p[$1] += $3; n[$1]++ }}END{for(i in p) print p[i], n[i], i}'

# 文字数カウント(wc -c)
$ awk '{n+=length($0)} END{print n}' filename

# 単語数カウント(wc -w)
$ awk '{n+=NF} END{print n}' filename

# 行数カウント(wc -l)
$ awk 'END{print NR}' filename

指定行から指定行まで表示
$ awk 'NR==10,NR==20'

# 奇数行
$ awk 'NR%2' filename

# 偶数行
$ awk 'NR%2==0' filename

```
 FS        入力フィールドセパレータ(空白とタブ)
 CNVFMT        数値を文字列に変換するフォーマット
 OFMT          数字の出力フォーマット(%.6g)
 OFS           出力フィールドセパレータ（空白） 
 ORS           出力レコードセパレータ（\n）
 RS        入力レコードセパレータ（\n） 
 SUBSEP        配列添字セパレータ(\034)
 ARGC          コマンド行の引数の数+1
 ARGV          コマンド行の引数の配列 
 ENVIRON["..."] 環境変数の値 
 FILENAME       入力ファイル名 
 FNR           入力ファイルの通算レコード 
 NF        入力レコードのフィールド数 
 NR        入力レコード総数
 RLENGTH       matchで適合した文字列の長さ 
 RSTART        matchで適合した文字列の開始位置

 
printf("%d\n",x)               #整数として出力
printf("%5d\n",x)              #5桁で右詰の整数として出力
printf("%e\n",x)               #浮動小数点数(eの後の数字は10の累乗を表す)
printf("%7.2f\n",x)            #浮動小数点数、7桁で小数第2位まで
printf("%6.2f\n",x)            #浮動小数点数、6桁で小数第2位まで
printf("%5.2f\n",x)            #浮動小数点数、5桁で小数第2位まで
printf("%4.2f\n",x)            #浮動小数点数、4桁で小数第2位まで
printf("%o\n",x)               #8進数として出力
printf("%x\n",x)               #16進数として出力
printf("%c\n",x)               #文字コードして対応するアルファベットを出力
printf("%s\n",x)               #そのまま文字列として出力
printf("%10s\n",x)             #右詰で10桁のスペースに出力
printf("%-10s\n",x)            #左詰で10桁のスペースに出力
printf("%.3s\n",x)             #左詰で3文字のみ出力
printf("%10.3s\n",x)           #右詰で10桁のスペースに3文字を出力
printf("%-10.3s\n",x)          #左詰で10桁のスペースに3文字を出力

#ワンライナーで使う場合は以下のように置き換えればOK
echo 12345 | awk '{ printf("%-10.3s\n",$0) }'
 ```
