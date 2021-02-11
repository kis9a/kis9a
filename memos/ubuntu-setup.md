sudo apt-get update -y
sudo apt-get install build-essential curl git make file
sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"
export PATH='/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin':"$PATH"

sudo apt-get install build-essential
echo 'eval $(/home/ubuntu/.linuxbrew/bin/brew shellenv)' >> /home/ubuntu/.profile
eval $(/home/ubuntu/.linuxbrew/bin/brew shellenv)

brew install gcc

brew install tmux
brew install tree
brew install neovim
brew install fzf
brew install fd
brew install riggrep
brew install reattach-to-user-namespace
brew install git
brew install wget
brew install make
brew install cask
brew install curl

brew install python

brew install nodebrew
brew install node

brew install go
brew install goenv
brew install groff

sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs \
 https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
npm install -g yarn

npm install -g neovim
brew install python
sudo apt-get install python
sudo apt update python
python3 -m pip install pip
brew install ruby
sudo apt update gem

sudo passwd ubuntu
sudo passwd
sudo chsh

```
apt で入るもの
flameshot: スクショを撮って画像を加工できます
peek: GIF を撮るのに便利です
simplescreenrecorder: GIF 以外はこっちを使っています
ffmpeg: 撮影した動画をさくっと圧縮するのに便利です
silversearcher-ag: grep はもう使っていられない…
mlocate: locateが使えるようになります
bat: いい感じにシンタックスハイライトしてcatしてくれます（apt版だとコマンドはbatcatです）
fd-find: find のオプションも僕には難しすぎるので…（apt版だとコマンドはfdfindです）
fzf: これ単体で使うことは少ないですが、色んなツールが依存していたりします
tig: TUI で Git ログを見れます
tree: ディレクトリ構造を見れます
xsel: 標準出力をクリップボードにコピーできます（pbcopy のエイリアスを作るのがオススメです）
htop: これを表示させているだけで仕事している感が出るとか出ないとか
jq: JSON ファイルから何かを抽出したい時（ほとんどの人は滅多になさそう）に使えます
brew で入るもの
ripgrep: ag に飽きた方へ（あまり使ってないです）
sd: sed の使い方イマイチわからん人でも使えると思います
ghq: git clone 時にどこに置くか考えなくて良くなるので便利です
yq: jq の YAML 版です
```
