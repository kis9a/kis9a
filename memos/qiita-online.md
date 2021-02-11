```sh
curl -s https://qiita.com | pup '.css-qrra2n json{}' | jq -r -C '.[] | [.text, .href] | join(" < ")' | cat -n | fzf -m --ansi --border --prompt="Qiita trends open > " | xargs -I {} | grep -Eo '(http|https)://[^/"]+\/[^/"]+\/items/[^/"]+' | xargs open

curl -s https://qiita.com | pup '.css-qrra2n json{}' | jq -r -C '.[] | [.text, .href] | join(" < ")' | cat -n | fzf -m --ansi --border --prompt="Qiita trends open > " | xargs -I {} | grep -Eo '(http|https)://[^/"]+\/[^/"]+\/items/[^/"]+' | xargs curl -s | pup '.it-MdContent' | pup 'text{}' | sed '/^[[:space:]]*$/d' | less

curl -s https://qiita.com | pup '.css-qrra2n json{}' | jq -r -C '.[] | [.text, .href] | join(" < ")' | cat -n | fzf -m --ansi --border --prompt="Qiita trends fetch > " | xargs -I {} | grep -Eo '(http|https)://[^/"]+\/[^/"]+\/items/[^/"]+' | xargs -I {} curl {} | pup 'body text{}'
```
