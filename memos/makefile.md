- [Make覚書 - Qiita](https://qiita.com/Shigets/items/27170827707e5136ee89)

| target | memo |
| --- | --- |
| all | 全ての作業 |
| install | インストール |
| clean | バイナリ削除 |
| deisclean | 元の配布物以外の生成物を削除 |
| TAGS | エディタが使用するtagsを作成する |
| info | GNU infoを作成する |
| check | テスト実行 |

| var | memo |
| --- | --- |
| \\$@ | ターゲットファイル名 |
| \\$% | ターゲットがアーカイブメンバだったときのターゲットメンバ名 |
| \\$< | 最初の依存するファイルの名前 |
| \\$? | ターゲットより新しいすべての依存するファイル名 |
| \\$^ | すべての依存するファイルの名前 |
| \\$+ | Makefileと同じ順番の依存するファイルの名前 |
| \\$\* | サフィックスを除いたターゲットの名前 |

| symbol | memo |
| --- | --- |
| CURDIR | カレントディレクトリ |
| MAKEFILE\_LIST | makeが読み込んだファイルのリスト |
| .VARIABLES | 変数のリスト |

| symbol | memo | default |
| --- | --- | --- |
| CXX | C++コンパイルコマンド | g++ |
| CXXFLAGS | C++コンパイルオプション |  |
| CPPFLAGS | プリプロセッサ用オプション |  |
| TARGET\_ARCH |  |  |
| LDFLAGS | リンカ用オプション |  |
| COMPILE.cc | C++コンパイル実行 | \\$(CXX) \\$(CXXFLAGS) \\$(CPPFLAGS) \\$(TARGET\_ARCH) -c |
| COMPILE.C | C++コンパイル実行 | \\$(COMILE.cc) |
| COMPILE.cpp | C++コンパイル実行 | \\$(COMILE.cc) |
| LINK.cc | C++リンク実行 | \\$(CXX) \\$(CXXFLAGS) \\$(CPPFLAGS) \\$(LDFLAGS) \\$(TARGET\_ARCH) |
| LINK.C | C++リンク実行 | \\$(LINK.cc) |
| LINK.cpp | C++リンク実行 | \\$(LINK.cc) |
| LINK.o | オブジェクのリンク | \\$(CC) \\$(LDFLAGS) \\$(TARGET\_ARCH) |
| OUTPUT\_OPTION |  | -o $@ |

| target | memo |
| --- | --- |
| .PHONY | 疑似ターゲット指定 |
| .INTERMEDIATE | 中間ファイル指定(make終了後自動削除) |
| .SECONDARY | 中間ファイル指定(自動削除しない) |
| .PRECIOUS | make中断時に勝手に削除しない |
| .DELETE\_ON\_ERROR | make中断時に削除する |

| ope | memo |
| --- | --- |
| := | 右辺を直ぐに展開 |
| = | 変数が使われる時に展開 |
| \\?= | 変数が値を持っていない場合にのみ代入 |
| += | 変数に追加 |

| func | memo |
| --- | --- |
| \\$(filter pattern, text) | textをスペースで区切られたリストとしてpatternとマッチしたものを返す |
| \\$(filter-out pattern, text) | filterの逆 |
| \\$(findstring string, text) | stringとマッチした時にstringを返す |
| \\$(subst search-string,replace-string,text) | 置換 |
| \\$(patsubst search-pattern,replace-pattern,text) | 置換(パターンなので%が使える) |
| \\$(words text) | text内の単語数を返す |
| \\$(word n, text) | text内のn番目の単語を返します |
| \\$(firstword text) | text内の最初の単語を返します |
| \\$(wordlist start\_num, end\_num, text) | start\_numからend\_numまでの単語列を返す |
| \\$(sort list) | 重複を取り除き並び替える |
| \\$(shell commad) | コマンドを実行して標準出力を返す(標準エラー出力は返さない) |
| \\$(wildcard pattern) | パターンを展開して返す |
| \\$(dir list) | listのファイル名を取り除きディレクトリ部分だけにして返す |
| \\$(notdir name) | nameのファイル名だけを返す |
| \\$(suffix name) | nameのサフィックスのリストを返す |
| \\$(basename name) | ファイルからサフィックスすを取り除いたものを返す |
| \\$(addsuffix suffix,name) | nameの各単語に対してsuffixを付加する |
| \\$(addprefix prefix,name) | nameの各単語に対してprefixを付加する |
| \\$(join prefix-list,suffix-list) | prefixとsuffixをひとつづつ結合してリストを返す |



```
> 2>dev/null will redirect the error output so you don't see it, it will not prevent the shell to raise the error level. And the - sign in front of your shell command will tell GNU make to continue even if the error level is raised but it will not either prevent the shell to raise it.

:= は即時評価
= は遅延評価
```
