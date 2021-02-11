" --- coc-explorer entry --- {{{
"augroup MyCocExplorer
"  autocmd!
"  autocmd VimEnter * sil! au! F
"  " set window status line
"  autocmd FileType coc-explorer setl statusline=File-Explorer
"  "quit explorer whein it's the last
"  autocmd BufEnter * if (winnr("$") == 1 && &filetype == 'coc-explorer') | q | endif
"  " Make sure nothing opened in coc-explorer buffer
"  autocmd BufEnter * if bufname('#') =~# "\[coc-explorer\]-." && winnr('$') > 1 | b# | endif
"  " open if directory specified or if buffer empty
"  autocmd VimEnter * let d = expand('%:p')
"    \ | if argc() == 0
"      \ | exe 'CocCommand explorer --quit-on-open --position floating --floating-width=10000 --floating-height=10000 --sources buffer+,file+'
"    \ | elseif isdirectory(d) || (bufname()=='')
"      \ | silent! bd
"      \ | exe 'CocCommand explorer --quit-on-open --position floating --floating-width=10000 --floating-height=10000 --sources buffer+,file+ ' . d
"      \ | exe 'cd ' . d
"    \ | else
"      \ | cd %:p:h
"    \ | endif
"  " cd after open
"  autocmd User CocExplorerOpenPost let dir = getcwd() | call CocActionAsync("runCommand", "explorer.doAction", "closest", {"name": "cd", "args": [dir]})
"augroup END
" }}}

" set shell=zsh\ -i

" let g:loaded_gzip = 1
" let g:loaded_tar = 1
" let g:loaded_tarPlugin = 1
" let g:loaded_zip = 1
" let g:loaded_zipPlugin = 1
" let g:loaded_rrhelper = 1
" let g:loaded_2html_plugin = 1
" let g:loaded_vimball = 1
" let g:loaded_vimballPlugin = 1
" let g:loaded_getscript = 1
" let g:loaded_getscriptPlugin = 1

set -g status-right '[#[fg=colour124] #H %Y-%m-%d %H:%M #[default]]'

" --- tmux entry --- {{{
if $TMUX != ""
  augroup TMUXWINR
    autocmd!
    autocmd VimEnter * call system("tmux rename-window " . "'[vim] " . fnamemodify(getcwd(), ':t') . "'")
    autocmd VimLeave * call system("tmux rename-window zsh")
  augroup END
endif
"}}}

" --- netrw gx --- {{{
if !exists("g:netrw_nogx")
 if maparg('gx','n') == ""
  if !hasmapto('<Plug>NetrwBrowseX')
   nmap <unique> gx <Plug>NetrwBrowseX
  endif
  nno <silent> <Plug>NetrwBrowseX :call netrw#BrowseX(expand((exists("g:netrw_gx")? g:netrw_gx : '<cfile>')),netrw#CheckIfRemote())<cr>
 endif
 if maparg('gx','v') == ""
  if !hasmapto('<Plug>NetrwBrowseXVis')
   vmap <unique> gx <Plug>NetrwBrowseXVis
  endif
  vno <silent> <Plug>NetrwBrowseXVis :<c-u>call netrw#BrowseXVis()<cr>
 endif
endif
if exists("g:netrw_usetab") && g:netrw_usetab
 if maparg('<c-tab>','n') == ""
  nmap <unique> <c-tab> <Plug>NetrwShrink
 endif
 nno <silent> <Plug>NetrwShrink :call netrw#Shrink()<cr>
endif
"}}}

mdlink<!--{{{-->
" function! s:SomeFunc(foo)
" " let a:requestString="r! echo -n '['`curl -s 'https://nav.kis9a.com' | grep -o '<title>[^<]*' | tail -c+8`']'; echo -n '(https://nav.kis9a.com)'"
" " r! echo -n '['`curl -s `a:foo` | grep -o "<title>[^<]*" | tail -c+8`']'; echo -n `(a:foo)`
" r! echo -n '['`curl -s 'https://nav.kis9a.com' | grep -o '<title>[^<]*' | tail -c+8`']'; echo -n '(https://nav.kis9a.com)'
" " r! a:requestString
" " echo a:foo
" endfunction

<!--}}}-->

**OUTPUTS**

notes: [kis9a/notes](https://github.com/kis9a/notes)  
zenn: [kis9a/zenn](https://github.com/kis9a/zenn) < [zenn.dev/kis9a](https://zenn./kis9a) >  
twitter: < [twitter.com/kis9a](https://twitter.com/kis9a) >  
navigation: [kis9a/navigation](https://github.com/kis9a/navigation) < [nav.kis9a.com](https://nav.kis9a.com) >

```
Software Engineer Beginner. Kaito.M*kis9a, 2001/8(19). 📚 Typescript, Go, and Vim.
```

"tabnine.disable_filetypes": [
"javascript",
"javascriptreact",
"typescript",
"typescriptreact"
],
