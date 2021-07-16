# vim-fold

## keymaps

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

## Folding methods

manual – folds must be defined by entering commands (such as zf)
indent – groups of lines with the same indent form a fold
syntax – folds are defined by syntax highlighting
expr – folds are defined by a user-defined expression
marker – special characters can be manually or automatically added to your text to flag the start and end of folds
diff – used to fold unchanged text when viewing differences (automatically set in diff mode)
