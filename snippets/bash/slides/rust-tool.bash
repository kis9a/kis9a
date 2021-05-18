#!/usr/bin/bash

# bash install.sh ;
# https://wonderwall.hatenablog.com/entry/rust-command-line-tools

# =============================================================================
# app list
# =============================================================================

HOGE=$(cat << EOS
bat
ripgrep
fd-find
starship
exa
nu
navi
git-delta
hyperfine
xsv
py-spy
bandwhich
hexyl
lsd
broot
gping
tokei
genact
monolith
shellharden
ripgrep-all
fnm
pastel
gitui
volta
onefetch
dog
skim
watchexec
dust
zoxide
ytop
mcfly
sd
fselect
topgrade
pueue
procs
bottom
grex
silicon
bingrep
tealdeer
nat
angle-grinder
ht
diskonaut
drill
git-interactive-rebase-tool
dua-cli
desed
zenith
oha
choose
dutree
globe-cli
tmux-thumbs
csview
glitchcat
EOS
)

list=(`echo $HOGE`)

echo "install apps num => ${#list[@]}" ;

# =============================================================================
# install apps 
# =============================================================================

for app in "${list[@]}" ; do

    echo "========= cargo install ${app} =========";
    cargo install $app ;

done

# =============================================================================
# show app version
# =============================================================================

for app in "${list[@]}" ; do

    echo "----- installed ${app} version check ----";
    $app --version ;

done
