# vim

I am in in back log applciation of my workflow experiment

application does .

:for i in range(1,10) | put ='192.168.0.'.i | endfor

" 基本設定 <C-k> (ctrl-k) で詳細表示
set autochdir
set autoindent
set clipboard+=unnamedplus
set clipboard=unnamed
set cursorline
set encoding=UTF-8
set expandtab
set foldmethod=marker
set hidden
set ignorecase
set laststatus=2
set lazyredraw
set modifiable
set mouse=nv
set nobackup
set noerrorbells
set noruler
set noshowcmd
set noshowmode
set noswapfile
set novisualbell
set number relativenumber
set redrawtime=10000
set regexpengine=1
set shiftwidth=2
set shortmess+=c
set showtabline=2
set signcolumn=yes
set smartcase
set spelllang=en_us
set splitright
set switchbuf+=newtab
set synmaxcol=200
set tabpagemax=100
set tabstop=2
set termguicolors
set timeoutlen=1000
set ttimeoutlen=0
set updatetime=300
set viminfo="NONE"
set virtualedit=block

" 特別なキーマップ変数<Leader>, <MapLeader>を定義
let mapleader="\<Space>"
let maplocalleader="\,"

" デフォルトのプラグインを読み混まないようにするため
let g:loaded_netrwPlugin = 1
let g:loaded_man = 1
let g:loaded_gzip = 1
let g:loaded_tar = 1
let g:loaded_tarPlugin = 1
let g:loaded_zip = 1
let g:loaded_zipPlugin = 1
let g:loaded_rrhelper = 1
let g:loaded_2html_plugin = 1
let g:loaded_vimball = 1
let g:loaded_vimballPlugin = 1
let g:loaded_getscript = 1
let g:loaded_getscriptPlugin = 1
let g:loaded_matchparen = 1
let g:loaded_shada_plugin = 1
let g:loaded_tutor_mode_plugin = 1

" gx を押した時にカーソル下がリンクの場合ブラウザで開くコマンドの定義
let g:netrw_browsex_viewer="open"

" プラグインの設定ファイルの読み込み
source ~/.config/nvim/plugins.vim

" ; と : の入れ替え
nnoremap ; :
nnoremap : ;

" x と s のヤンクをしない
nnoremap x "\_x
nnoremap s "\_s

" カーソルが中央に来るように (zz)
nnoremap n nzz
nnoremap N Nzz

" ファイル全体のインデントを整える
nnoremap == gg=G''

" z-, z0, zz での移動
nnoremap z0 zt

" gF key でカーソルしたのファイルパスをタブでファイルを開く
nnoremap gF <C-w>gF

" ss で水平分割、sv で垂直分割、sn でタブ分割
nnoremap ss :sp<CR>
nnoremap sv :vsp<CR>
nnoremap sn :tab split<CR>

" <C-s>でファイル保存
nnoremap <silent> <C-s> :w!<cr>
" <C-c>でバッファを閉じる
nnoremap <silent> <C-c> :bd<cr>
" <C-q>でファイルを閉じる
nnoremap <silent> <C-q> :q!<cr>

" バッファ全部閉じる
nnoremap <silent> <C-w><C-q> :%bd<CR>

"　置換
nnoremap <Leader>r :%s///g<Left><Left>
" 置換 with 確認
nnoremap <Leader>rc :%s///gc<Left><Left><Left>

" ファイルパスをコピーする
nnoremap <silent> su :let @+ = expand("%:p")<cr>

" $Variable を開く、編集する。
nnoremap <silent> <Leader>b :tabnew<CR>:cd $MEMOS<CR>
nnoremap <silent> <Leader>d :tabnew<CR>:e $MYVIMRC<CR>
nnoremap <silent> <Leader>j :tabnew<CR>:e $TASK<CR>

" 設定ファイルを再読み込みする
nnoremap <silent> <Leader>rl :so $MYVIMRC<CR>
nnoremap <silent> <Leader>o :set spell!<CR>
nnoremap <Leader>w :!trans -b
nnoremap md :r! mdl

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

" --- statusline ---
" set statusline=[%n]\ %F%m%r%h%w\ >>\ %l,%v:%p%%\ >>\ %{strftime('%m/%d/%H:%M')}

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

" --- command ---{{{
command! Rmt :%s/\s\+$//e " delete trailing space
match errorMsg /\s\+$/ " hilight trailing space
" }}}

```
" -- not usually {{{
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
"}}}
```

| オプション名 | 補足                                                     |
| ------------ | -------------------------------------------------------- |
| expandtab    | tab キーを押すとスペースが入力される                     |
| tabstop      | 画面上で表示する 1 つのタブの幅                          |
| softtabstop  | いくつの連続した空白を 1 回で削除できるようにするか      |
| shiftwidth   | 自動インデントでのインデントの長さ                       |
| autoindent   | 改行した時に自動でインデントします                       |
| smartindent  | {があると次の行は自動で 1 段深く自動インデントしてくれる |
