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
