<https://zenn.dev/hituzi_no_sippo/articles/871c06cdbc45b53181e3#package-manager>
# vim

:for i in range(1,10) | put ='192.168.0.'.i | endfor

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

"coc.preferences.formatOnSaveFiletypes": ["*"],

前回に編集した箇所を記憶して、次回起動時にその箇所に移動するようにする。

augroup vimrcEx
  autocmd!
  autocmd BufReadPost *
    \ if line("'\"") > 1 && line("'\"") <= line('$') |
    \   exe "normal! g`\"" |
    \ endif
augroup END
