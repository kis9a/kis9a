# tasks

I use only GTD technique for task management.

_No time management,
\_Think causality of productivity_

.zshenv

```sh
export MEMOS=$HOME/kis9a/memos
export TASK=$HOME/kis9a/tasks/$(date +%Y)/$(date +%m).md
export BOX=$HOME/notes/tasks/box
```

.vimrc

```vim
nnoremap <silent> <Leader>n :tabnew<CR>:cd $MEMOS<CR>
nnoremap <silent> <Leader>b :tabnew<CR>:e $BOX<CR>
nnoremap <silent> <Leader>j :tabnew<CR>:e $TASK<CR>
```

```
tasks
├── 2020
│   ├── 11.md
│   └── 12.md
├── 2021
│   ├── 01.md
│   └── 02.md
---
└── box

```
