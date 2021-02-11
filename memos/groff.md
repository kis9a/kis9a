
function! Compile()
		let extension = expand('%:e')
		if extension == "ms"
				execute "! groff -ms % -T pdf > /tmp/op.pdf"
		elseif extension == "tex"
				execute "! pandoc -f latex -t latex % -o /tmp/op.pdf"
		elseif extension == "md"
				execute "! pandoc % -s -o /tmp/op.pdf"
		endif
endfunction


echo '.PS
box wid 3 "My first ASCII box"
arrow down 1 from last box.s
box wid 3 "My first ASCII box"
.PE' | pic | groff -ms -Tascii


man ls | groff -mandoc 

