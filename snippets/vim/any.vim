function! s:gitHubSearch()
  let cw = expand("<cword>")
  let uri = "'https://github.com/search?q=language:" . &filetype . "+" . cw . "'"
  silent execute "!open " . uri
endfunction
nnoremap <silent> <Leader>gw :call <SID>gitHubSearch()<CR>

function! s:githubSearchFile()
  let fname = expand('%:t')
  let uri = "'https://github.com/search?q=filename:" . fname ."'"
  silent execute "!open " . uri
endfunction
nnoremap <silent> <Leader>gf :call <SID>GithubSearchFile()<CR>

function! s:getVisualSelection() range
    let s = @a
    silent! normal! gv"ay
    let r = @a
    let @a = s
    return r
endfunction
xnoremap <Leader>g :call <SID>getVisualSelection()<cr>

function! s:getUserInput()
  echohl Question
  call inputsave()
  let input=input("word > ")
  echohl NONE
  call inputrestore()
  echo "\n"
  return input
endfunction

function! s:googleSearch()
  let vs = s:getUserInput()
  if !empty(vs)
    let uri = "'https://www.google.com/search?q=" . vs . "'"
    silent execute "!open " . uri
  end
endfunction
nnoremap <silent> <Leader>gi :call <SID>googleSearch()<CR>

function! s:googleSearchCword()
  let cw = expand("<cword>")
  if !empty(cw)
    let uri = "'https://www.google.com/search?q=" . cw . "'"
    silent execute "!open " . uri
end
endfunction
nnoremap <silent> <Leader>gg :call <SID>googleSearchCword()<CR>

function! s:getCurrent()
" :echo @% 	def/my.txt	directory/name of file (relative to the current working directory of /abc)
" :echo expand('%:t') 	my.txt	name of file ('tail')
" :echo expand('%:p') 	/abc/def/my.txt	full path
" :echo expand('%:p:h')	/abc/def	directory containing file ('head')
" :echo expand('%:p:h:t')	def	First get the full path with :p (/abc/def/my.txt), then get the head of that with :h (/abc/def), then get the tail of that with :t (def)
" :echo expand('%:r') 	def/my	name of file less one extension ('root')
" :echo expand('%:e') 	txt	name of file's extension ('extension')
endfunction

function! s:getBuffers()
  let all = range(0, bufnr('$'))
  let res = []
  for b in all
    if buflisted(b)
      call add(res, bufname(b))
    endif
  endfor
  return res
endfunction

function! s:some()
  let vs = s:getBuffers()
  echo vs
endfunction
nnoremap <silent> <Leader>gu :call <SID>some()<CR>
