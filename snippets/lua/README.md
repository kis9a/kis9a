### Install

```
brew install lua
brew install luarocks
brew install luajit
```

if align luarocks and lua version.

```
./configure --lua-version=5.1 --versioned-rocks-dir
make build
sudo make install
```

### neovim configure

- formatter: [GitHub - Koihik/LuaFormatter: Code formatter for Lua](https://github.com/Koihik/LuaFormatter)
- lsp: [GitHub - josa42/coc-lua: Lua language server extension using lua-lsp for coc.nvim.](https://github.com/josa42/coc-lua)

```sh

# coc-setting.json

{
  "coc.preferences.formatOnSaveFiletypes": ["*"],
}

"diagnostic-languageserver.formatFiletypes": {
  "lua": "lua-format",
}


# ~/.config/nvim/init.vim

let g:coc_global_extensions = [
      \, 'coc-lua'
      \, ]

```

### Openresty

```
brew install pcre openssl curl
brew install openresity
brew unlink nginx
brew link openrestity

// exmaple
export PATH=/usr/local/Cellar/openresty/1.19.3.1_1/nginx/sbin:$PATH
```

### Refrences to learn

- [Lua 5.1 Reference Manual](lua.org/manual/5.1/index.html)
- [Lua 5.1 リァレンスマニュアル](http://milkpot.sakura.ne.jp/lua/lua51_manual_ja.html)
- [lua-users.org wiki Sample Code](http://lua-users.org/wiki/SampleCode)
- [お気楽 Lua プログラミング超入門](http://www.nct9.ne.jp/m_hiroi/light/lua05.html)

redis

- [GitHub - openresty/lua-resty-redis: Lua redis client driver for the ngx_lua based on the cosocket API](https://github.com/openresty/lua-resty-redis)
- [GitHub - kis9a/redis-cluster-test](https://github.com/kis9a/redis-cluster-test)
- [GitHub - openresty/lua-resty-redis: Lua redis client driver for the ngx_lua based on the cosocket API](https://github.com/openresty/lua-resty-redis)
- [GitHub - steve0511/resty-redis-cluster: Openresty lua client for redis cluster.](https://github.com/steve0511/resty-redis-cluster)
フ
