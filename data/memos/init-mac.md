Plug 'jalvesaq/Nvim-R', { 'for': 'r' }
Plug 'gaalcaras/ncm-R', { 'for': 'r' }
Plug 'vim-pandoc/vim-pandoc', { 'for': 'rmd' }
Plug 'vim-pandoc/vim-pandoc-syntax', { 'for': 'rmd'}
Plug 'vim-pandoc/vim-rmarkdown', { 'for': 'rmd' e
:CocInstall coc-r-lsp

<https://www.youtube.com/watch?v=nm45WagtV3w&ab_channel=RohitFarmer>
https://pandoc.org/installing.html


- https://joongsup.rbind.io/post/2019/04/05/r-markdown-revisited/
- https://qiita.com/nozma/items/bbd681490b2aaaf9ec93 powerpoint
- https://qiita.com/tomotagwork/items/c92fb40a76f56ea16aa4 reporting


rstudio vim https://xvideos.hatenablog.com/entry/r_vim_keybindings

RMarkdown command :set filetype=rmarkdown.
https://github.com/vim-pandoc/vim-rmarkdown/issues/11

brew install r
which r
disable r

brew link r


r stdio

$ brew tap caskroom/cask
$ brew cask install rstudio
$ open /Applications/RStudio.app

tinytex
TinyTeX is installed to ~/Library/TinyTeX on macOS:
curl -sL "https://yihui.org/tinytex/install-bin-unix.sh" | sh

rstudio
enstall.packages("rmarkdown", dep = TRUE)

install.packages("tinytex")
tinytex::install_tinytex()  # install TinyTeX
install.packages("rmarkdown", repos = "https://cran.revolutionanalytics.com")


ERROR

Quitting from lines 2-6 (r-sample.rmd) 
Error in library(ggplot2) : there is no package called 'ggplot2'
Calls: render ... withCallingHandlers -> withVisible -> eval -> eval -> library

Execution halted
install.packages("tidyverse")
```

```

sudo chown -R $(whoami) /usr/local
