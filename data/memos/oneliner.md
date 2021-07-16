# [git] 'tmp-' で始まるブランチを全て削除
git branch --list "tmp-*" | cut -b 3- | xargs -n 1 -I{} git branch -D {}

curl -s https://api.github.com/users/kis9a/repos | grep \"clone_url\" | awk '{print $2}' | sed -e 's/"//g' -e 's/,//g' | xargs -n1 git clone

curl -s https://api.github.com/users/$target_user/gists | grep \"raw_url\" | awk '{print $2}' | sed -e 's/"//g' -e 's/,//g' | xargs -n1 curl -O

xargs -n 1 -P 4 curl -OL < urllist.txt

curl -Ls $URL | xmllint --html --xpath '//img/@src' - | xargs -n 1 | cut -d= -f2 | sed 's/^\/\//https:\/\//' | xargs -n 1 curl -L#O

open "$(brew --prefix sfmono-square)/share/fonts"

# Convert all jpg files to png files:
fd -e jpg -x convert {} {.}.png

# Unpack all zip files (if no placeholder is given, the path is appended):
fd -e zip -x unzip

# Convert all flac files into opus files:
fd -e flac -x ffmpeg -i {} -c:a libopus {.}.opus

# Count the number of lines in Rust files (the command template can be terminated with ';'):
fd -x wc -l \; -e rs

# if statement
 curl -s "https://api.github.com/users/kis9a/repos" | jq '.[] | select(.fork == false) | .'
