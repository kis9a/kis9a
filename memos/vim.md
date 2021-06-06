# lua<!--{{{-->

<https://zenn.dev/hituzi_no_sippo/articles/871c06cdbc45b53181e3#package-manager>

<!--}}}-->

put <!--{{{-->
:for i in range(1,10) | put ='192.168.0.'.i | endfor

<!--}}}-->

mode and command<!--{{{-->

```
"---------------------------------------------------------------------------|
" Commands \ Modes | Normal | Insert | Command | Visual | Select | Operator |
" map  / noremap   |    @   |   -    |    -    |   @    |   @    |    @     |
" nmap / nnoremap  |    @   |   -    |    -    |   -    |   -    |    -     |
" vmap / vnoremap  |    -   |   -    |    -    |   @    |   @    |    -     |
" omap / onoremap  |    -   |   -    |    -    |   -    |   -    |    @     |
" xmap / xnoremap  |    -   |   -    |    -    |   @    |   -    |    -     |
" smap / snoremap  |    -   |   -    |    -    |   -    |   @    |    -     |
" map! / noremap!  |    -   |   @    |    @    |   -    |   -    |    -     |
" imap / inoremap  |    -   |   @    |    -    |   -    |   -    |    -     |
" cmap / cnoremap  |    -   |   -    |    @    |   -    |   -    |    -     |
"---------------------------------------------------------------------------"
" :h mode-switching
```

<!--}}}-->

" --- statusline ---{{{
" set statusline=[%n]\ %F%m%r%h%w\ >>\ %l,%v:%p%%\ >>\ %{strftime('%m/%d/%H:%M')}

<!--}}}-->

auto installation<!--{{{-->
neovim

```vim
if empty(glob('~/.local/share/nvim/site/autoload/plug.vim'))
  silent !curl -fLo ~/.local/share/nvim/site/autoload/plug.vim  --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
  autocmd VimEnter * PlugInstall | source ~/.config/nvim/init.vim
endif
```

vim

```vim
if empty(glob('~/.vim/autoload/plug.vim'))
 silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
   \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
 autocmd VimEnter * PlugInstall | source $MYVIMRC
endif

```

<!--}}}-->

" --- command ---{{{
command! Rmt :%s/\s\+$//e " delete trailing space
match errorMsg /\s\+$/ " hilight trailing space
" }}}

" -- not usually {{{

```
" Plug 'gruvbox/gruvbox.vim'
" Plug 'wakatime/vim-wakatime'
" Plug 'easymotion/vim-easymotion'
" Plug 'voldikss/vim-translator'
" Plug 'thinca/vim-quickrun', { 'on': 'QuickRun' }
" Plug 'cocopon/colorswatch.vim', { 'on': 'ColorSwatchGenerate' }
" Plug 'dhruvasagar/vim-table-mode', { 'for': 'markdown' }
" Plug 'lambdalisue/gina.vim', { 'on': 'Gina' }
" Plug 'iamcco/markdown-preview.nvim', { 'for': 'markdown', 'on': 'MarkdownPreview' }
" Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
" Plug 'junegunn/fzf.vim', { 'on': [ 'Files', 'GFiles', 'Commands', 'Commits', 'Buffers', 'Rg' ] }
" Plug 'liuchengxu/vista.vim', { 'on': 'Vista' }
" Plug 't9md/vim-quickhl', { 'on': 'QuickhlCwordToggle' }
" Plug 'kshenoy/vim-signature', { 'on': 'SignatureListGlobalMarks' }
" Plug 'junegunn/vim-easy-align', { 'on': 'EasyAlign' }
" Plug 'mbbill/undotree', { 'on': 'UndotreeToggle' }
" Plug 'dstein64/vim-startuptime', { 'on': 'StartupTime' }
" Plug 'junegunn/limelight.vim', { 'on': [ 'Limelight', 'Limelight!', 'Limelight!!' ] }
" Plug 'simeji/winresizer', { 'on': [ 'WinResizerStartFocus', 'WinResizerStartResize'] }
```

"}}}

indent<!--{{{-->
| オプション名 | 補足 |
| ------------ | -------------------------------------------------------- |
| expandtab | tab キーを押すとスペースが入力される |
| tabstop | 画面上で表示する 1 つのタブの幅 |
| softtabstop | いくつの連続した空白を 1 回で削除できるようにするか |
| shiftwidth | 自動インデントでのインデントの長さ |
| autoindent | 改行した時に自動でインデントします |
| smartindent | {があると次の行は自動で 1 段深く自動インデントしてくれる |

<!--}}}-->

" vim-fold<!--{{{-->

| コマンド    | 動作                           |
| ----------- | ------------------------------ |
| zf          | 折畳作成                       |
| zd          | 折畳削除                       |
| zD          | 折畳を全て削除                 |
| zE          | ページ全体の折畳みを全て削除   |
| visual + zf | 選択範囲を折畳                 |
| 2 + zF      | 2 行折畳                       |
| 2,5 fo      | 2 行から 5 行を折畳            |
| zo          | 折畳を削除せず開く             |
| zO          | 折畳みを全て削除せず開く       |
| zc          | 開いている折畳を閉じる         |
| zC          | 開いている折畳を全て閉じる     |
| za          | 折畳の状態を切り替える         |
| zA          | 全ての折畳の状態を切り替える   |
| zv          | カーソル行を表示               |
| zx          | 折畳の Undo                    |
| zX          | 折畳の Redo                    |
| zm          | ページ内の折畳を一段階閉じる   |
| zM          | ページ内の折畳を全段階閉じる   |
| zr          | ページ内の折畳を一段階開く     |
| zR          | ページ内の折畳を全段階開く     |
| 2,5 foldo   | 2 行から 5 行の折畳を開く      |
| 2,5 foldc   | 2 行から 5 行の折畳を閉じる    |
| zn          | ファイル全体の折畳を開く       |
| zN          | ファイル全体の折畳を閉じる     |
| zi          | ファイル全体の折畳の状態を反転 |
| zj          | 上の折畳に移動                 |
| zk          | 下の折畳に移動                 |

<!--}}}-->

| コマンド | 説明                       |
| -------- | -------------------------- |
| :new     | 新規ファイルを開く(横分割) |
| :vnew    | 新規ファイルを開く(縦分割) |
| :tabnew  | 新規ファイルを開く(タブ)   |

| コマンド | 説明                     |
| -------- | ------------------------ |
| :save    | ファイルを保存する       |
| :saveas  | ファイルを別名で保存する |

| コマンド | 短縮コマンド | キーバインド | 説明                     |
| -------- | ------------ | ------------ | ------------------------ |
| :split   | :sp          | ` <C-w>s`    | ウィンドウを横に分割する |
| :vsplit  | :vs          | `<C-w>v`     | ウィンドウを縦に分割する |

| コマンド | 説明                 |
| -------- | -------------------- |
| `<C-w>j` | 上のウィンドウへ移動 |
| `<C-w>k` | 下のウィンドウへ移動 |
| `<C-w>h` | 左のウィンドウへ移動 |
| `<C-w>l` | 右のウィンドウへ移動 |

| コマンド     | 短縮コマンド | キーバインド | 説明                              |
| ------------ | ------------ | ------------ | --------------------------------- |
| :tabnext     | :tabn        | {count}gt    | {count}で指定した番号のタブへ移動 |
| :tabnext     | :tabn        | gt           | 次のタブへ移動                    |
| :tabprevious | :tabp        | gT           | 前のタブへ移動                    |

| コマンド   | 短縮コマンド | 説明                                               |
| ---------- | ------------ | -------------------------------------------------- |
| :buffers   |              | バッファリストのファイル名をリスト表示             |
| :buffer    | :b           | バッファリストの指定したバッファを開く             |
| :bnext     | :bn          | バッファリストの次のバッファを開く                 |
| :bprevious | :bp          | バッファリストの前のバッファを開く                 |
| :ball      | :ba          | バッファリストのすべてのバッファをウィンドウを開く |
| :badd      | :bad         | バッファリストにバッファを追加                     |
| :bdelete   | :bd          | バッファリストからバッファを削除                   |
| :bfirst    | :bf          | バッファリストの最初のバッファを開く               |
| :blast     | :bl          | バッファリストの最後のバッファを開く               |
| :bmodified | :bm          | バッファリストの次の変更済みバッファを開く         |

| コマンド | 説明                 |
| -------- | -------------------- |
| :jumps   | ジャンプリストを表示 |

| `<C-o>` | 前のジャンプ箇所へ移動 |
| `<C-i>` | 次のジャンプ箇所へ移動 |

| コマンド | 説明               |
| -------- | ------------------ |
| :changes | 変更リストを表示   |
| g;       | 前の変更箇所へ移動 |
| g,       | 次の変更箇所へ移動 |

syntax hilight

<https://github.com/yuzoiwasaki/fluentd.vim>
