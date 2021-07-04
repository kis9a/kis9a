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

:%s/^/\=line('.').". "

" url parse<!--{{{-->

# フォーマット：指定したパターンにマッチしない行を削除

:%v/<パターン>/d

# 例:a タグを含まない行を削除

:%v/<a/d

フォーマット

:%s/<置換前パターン>/<置換後パターン>/gc

# 例：href の中身だけを抽出（それ以外の部分は削除）

:%s/^._href="\([^"]_\)"[^>]_._$/\1/gc

# 例２：相対 URL を絶対 URL に置換

:%s/^\//http:\/\/b.hatena.ne.jp\//

<!--}}}-->

sudo yum -y install libtool autoconf automake cmake gcc gcc-c++ make pkgconfig unzipi
./configure --disable-selinux --enable-cscope --enable-fontset --enable-gpm --enable-multibyte --enable-rubyinterp --enable-xim

" puremourning/vimspector {{{
fun! GotoWindow(id)
   :call win_gotoid(a:id)
 endfun
 func! AddToWatch()
   let word = expand("<cexpr>")
   call vimspector#AddWatch(word)
 endfunction
 let g:vimspector_base_dir = expand('$HOME/.config/vim/vimspector-config')
 let g:vimspector_sidebar_width = 60
 nnoremap <leader>sa :call vimspector#Launch()<CR>
 nnoremap <leader>sc :call GotoWindow(g:vimspector_session_windows.code)<CR>
 nnoremap <leader>sv :call GotoWindow(g:vimspector_session_windows.variables)<CR>
 nnoremap <leader>sw :call GotoWindow(g:vimspector_session_windows.watches)<CR>
 nnoremap <leader>ss :call GotoWindow(g:vimspector_session_windows.stack_trace)<CR>
 nnoremap <leader>so :call GotoWindow(g:vimspector_session_windows.output)<CR>
 nnoremap <leader>si :call AddToWatch()<CR>
 nnoremap <leader>sx :call vimspector#Reset()<CR>
 nnoremap <leader>sX :call vimspector#ClearBreakpoints()<CR>
 nnoremap <leader>st :call vimspector#StepOut()<CR>
 nnoremap <leader>sf :call vimspector#StepInto()<CR>
 nnoremap <leader>ss :call vimspector#StepOver()<CR>
 nnoremap <leader>s_ :call vimspector#Restart()<CR>
 nnoremap <leader>sn :call vimspector#Continue()<CR>
 nnoremap <leader>src :call vimspector#RunToCursor()<CR>
 nnoremap <leader>sh :call vimspector#ToggleBreakpoint()<CR>
 nnoremap <leader>se :call vimspector#ToggleConditionalBreakpoint()<CR>
 let g:vimspector_sign_priority = {
   \    'vimspectorBP':         998,
   \    'vimspectorBPCond':     997,
   \    'vimspectorBPDisabled': 996,
   \    'vimspectorPC':         999,
   \ }
"}}}

"Plug 'easymotion/vim-easymotion'
"" easymotion/vim-easymotion{{{
"map , <Plug>(easymotion-overwin-f)
""}}}

Plug 'scrooloose/vim-slumlord', { 'for': 'uml' }
Plug 'aklt/plantuml-syntax', { 'for': 'uml' }
" Plug 'honza/vim-snippets'

- [Vim プラグインを書く言語について と宣伝](https://zenn.dev/octaltree/articles/c5757d9a126415)
