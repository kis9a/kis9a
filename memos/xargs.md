find . -type d -name "_log_" | xargs -I {} sh -c "echo {}; ls -la {} | tail -2"

ls -1 \*.png | xargs -n 1 bash -c 'convert "$0" "${0%.png}.jpg"'
find . -type d -name "_log_" | xargs -I {} sh -c "echo {}; ls -la {} | tail -2"

ls | xargs -r -L 2 bash -c 'echo "Output:" ${0}'

echo 'https://nav.kis9a.com/' | xargs -r -L 2 -I@ `echo @ echo curl -s @ | grep -o "<title>[^<]*" | tail -c+8 | xargs -I {} echo '[{}]()_'`

echo -n '['`curl -s 'https://nav.kis9a.com' | grep -o "<title>[^<]*" | tail -c+8`']'; echo -n '(https://nav.kis9a.com)'

curl -s https://qiita.com | pup '.css-qrra2n text{}, attr{href}' | cat -n | fzf -m | xargs -I {} | cut -d " " -f 1

seq 100 | xargs -t -P3 -n4 ruby -e 'sleep 5'

seq 0 0.1 1 | xargs -I@ bash -c 'owari big | lolcat -f --freq=@' | textimg -asl29 -d8

-t 実行する前にそのコマンドラインを表示する
-P3 3 プロセスを並列に実行
-n4 各プロセスが引数 4 個をとるようにする（入力をスペースによって引数に区切る）

-P を指定した場合は-n または-L も同時に指定すること。そうしないと 1 プロセスしか起動してこない。

-n と-L の違い
-n3 各プロセスが引数 3 個をとるようにする（入力をスペースによって引数に区切る）
-L3 各プロセスが引数 3 個をとるようにする（入力を改行によって引数に区切る）

get ASN for any targets via dig + whois tools…

dig +short uber | xargs -I %% bash -c 'whois -h http://whois.cymru.com " -f -p %%"'

seq 3 8 | nl | xargs -n2 bash -c 'seq $1 | sed "s/^/printf \$(tput setaf 0)\$(tput setab $(($0 % 9)))$1\$(tput sgr0)\"...

bash gist2localmd.bash | jq | sed -e "s/[//g' -e 's/]//g" | tr -s "\n"

curl -s "https://api.github.com/users/milanboers/repos?per_page=100" | jq -r ".[].git_url" | xargs -L1 git clone
