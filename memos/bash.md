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
