neovim - amazon linux 2

```
#!/usr/bin/env bash
sudo yum groups install -y Development\ tools
sudo yum install -y cmake
sudo yum install -y python34-{devel,pip}
sudo pip-3.4 install neovim --upgrade
(
cd "$(mktemp -d)"
git clone https://github.com/neovim/neovim.git
cd neovim
make CMAKE_BUILD_TYPE=Release
sudo make install
)

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

```

[Amazon EC2 インスタンスで Node.js のセットアップ](https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html)

```
FROM alpine
MAINTAINER Gen Igarashi < igarashi@aizulab.com >
# Package
RUN apk update
RUN apk --update add git make gcc g++ musl-dev ncurses-dev
RUN apk --update add \
  python \
  python-dev \
  python3 \
  python3-dev \
  perl \
  perl-dev \
  lua \
  lua-dev
RUN git clone https://github.com/vim/vim
RUN cd vim && \
  ./configure \
  --enable-fail-if-missing \
  --with-features=huge \
  --disable-selinux \
  --enable-luainterp \
  --enable-perlinterp \
  --enable-pythoninterp=dynamic \
  --with-python-config-dir=/usr/lib/python2.7/config \
  --enable-python3interp=dynamic \
  --with-python3-config-dir=/usr/lib/python3.7/config-3.7m-x86_64-linux-gnu \
  --enable-fontset \
  --enable-multibyte \
  vi_cv_path_python3=/usr/bin/python3.7 && \
  make && make install
```

```
#!/bin/sh
rm -rf ~/tmp/vim
git clone --depth 1 https://github.com/vim/vim.git ~/tmp/vim
cd ~/tmp/vim && ./configure \
  --prefix=/usr/local \
  --enable-multibyte \
  --enable-nls \
  --enable-cscope \
  --without-x \
  --disable-xim \
  --disable-gui \
  --disable-sysmouse \
  --disable-netbeans \
  --disable-xsmp \
  && make install
```
