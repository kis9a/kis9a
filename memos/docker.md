```
docker run --name temp_alpine394 -itd alpine:3.9.4 /bin/sh

# or

docker pull alpine:3.9.4
docker images
docker run -itd <image id> /bin/sh
docker exec -it <container id | container name> /bin/sh
apk update
apk upgrade
apk info
```

```
apk add git
apk add curl
apk add fzf
apk add zsh
apk add bash
apk add make
apk add vim
(cd ~/; git clone https://github.com/kis9a/dotfiles; cd ~/dotfiles)
```

<!--{{{-->

setopt no_beep
setopt nolistbeep
setopt auto_cd
setopt auto_pushd
setopt hist_ignore_dups
setopt hist_ignore_all_dups
setopt hist_ignore_space
setopt hist_reduce_blanks
setopt share_history
setopt prompt_subst
setopt aliases
unsetopt PROMPT_SP
disable r

# zinit

if [[! -f $HOME/.zinit/bin/zinit.zsh]]; then
command mkdir -p "$HOME/.zinit" && command chmod g-rwX "$HOME/.zinit"
command git clone https://github.com/zdharma/zinit "$HOME/.zinit/bin" && print -P "success" || print -P "fail"
fi

if [ $DOTFILES/.zshrc -nt ~/.zshrc.zwc ]; then
zcompile ~/.zshrc
fi

source "$HOME/.zinit/bin/zinit.zsh"
source "$HOME/bin/z"

autoload -Uz \_zinit
autoload -Uz add-zsh-hook
autoload -Uz colors && colors
autoload -Uz compinit
autoload -Uz vcs_info

(( ${+\_comps} )) && \_comps[zinit]=\_zinit
zinit ice depth=1

# zinit light jeffreytse/zsh-vi-mode

zinit light zsh-users/zsh-autosuggestions
zinit ice wait'!0'; zinit load zsh-users/zsh-syntax-highlighting
zinit ice wait'!0'; zinit load zsh-users/zsh-completions

# function zvm_after_init() {

zinit light zsh-users/zsh-history-substring-search
zinit light zdharma/history-search-multi-word

# }

zvm_after_init_commands+=(zvm_after_init)

# prompt

zstyle ':vcs*info:git:*' check-for-changes true
zstyle ':vcs_info:git:*' stagedstr "%F{yellow}!"
zstyle ':vcs_info:git:*' unstagedstr "%F{red}+"
zstyle ':vcs_info:*' formats "%F{green} %c%u%b%f"
zstyle ':vcs_info:\*' actionformats '%b|%a'
precmd () { vcs_info; precmd() { echo } }
\_vcs_precmd () { vcs_info }
add-zsh-hook precmd \_vcs_precmd
PROMPT='%F{142}< %~%f${vcs_info_msg_0*} %F{142}>%f '

# bindkey

bindkey -v
bindkey -s '^v' 'nvim .^M'
bindkey -M viins '^K' backward-kill-line
bindkey '^F' autosuggest-accept
bindkey '^P' history-substring-search-up
bindkey '^N' history-substring-search-down
bindkey '^I' expand-cmd-path
bindkey '^I' complete-word
bindkey '^A' end-of-line
bindkey '^B' backward-char
bindkey '^E' forward-char
bindkey '^D' backward-delete-char

function f() {
dir=$(fd -t d -d 3 | fzf)
  if [ "$(echo $dir)" ]; then
cd $dir
fi
}

function ff() {
baseDir=$DEV
  dir=$(fd -t d --base-directory $baseDir -d 3 | fzf)
  cd $baseDir/$dir
}

function fzf-z-search() {
local res=$(z | sort -rn | cut -c 12- | fzf)
    if [ -n "$res" ]; then
BUFFER+="cd $res"
zle accept-line
else
return 1
fi
}

zle -N fzf-z-search
bindkey '^j' fzf-z-search

<!--}}}-->

<!--{{{-->

FROM alpine:3.4

ENV NGINX_VERSION 1.11.1

RUN apk --update add pcre-dev openssl-dev \
 && apk add --virtual build-dependencies build-base curl \
 && curl -SLO http://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz \
 && tar xzvf nginx-${NGINX_VERSION}.tar.gz \
  && cd nginx-${NGINX_VERSION} \
 && ./configure \
 --with-http_ssl_module \
 --with-http_gzip_static_module \
 --prefix=/usr/share/nginx \
 --sbin-path=/usr/local/sbin/nginx \
 --conf-path=/etc/nginx/conf/nginx.conf \
 --pid-path=/var/run/nginx.pid \
 --http-log-path=/var/log/nginx/access.log \
 --error-log-path=/var/log/nginx/error.log \
 && make \
 && make install \
 && ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log \
 && cd / \
 && apk del build-dependencies \
 && rm -rf \
 nginx-${NGINX_VERSION} \
       nginx-${NGINX_VERSION}.tar.gz \
 /var/cache/apk/\*

VOLUME ["/var/cache/nginx"]

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]

<!--}}}-->

|       | image ?????? | ?????????????????? | ?????????????????? |
| ----- | ---------- | ------------ | ------------ |
| build | ???          | ??            | ??            |
| up    | ???          | ???            | ???            |
| start | ??          | ??            | ???            |
| run   | ??? ???????????? | ??? ????????????   | ??? ????????????   |
