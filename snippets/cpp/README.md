```
> brew install clang-format


  "diagnostic-languageserver.formatters": {
    "clang-format": {
      "command": "clang-format"
    }
  },
  "diagnostic-languageserver.formatFiletypes": {
    "c": "clang-format"
    "cpp": "clang-format"
  }

let g:coc_global_extensions = [
      \, 'coc-clangd'
      \, ]
```
