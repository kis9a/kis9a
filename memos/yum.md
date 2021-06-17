- yum install ＜パッケージ＞
  インストールする。

- yum groupinstall ＜パッケージグループ＞
  パッケージグループをインストールする。「パッケージグループ」については
  参考サイト 9 を参照。

- yum clean packages
  ダウンロードした rpm ファイルを削除する。

- yum clean all
  キャッシュ（今までダウンロードした rpm ファイル、ヘッダファイルなど）すべてを削除する。

- yum update ＜パッケージ＞
  アップデートする。

- yum remove ＜パッケージ＞
  アンインストールする。

- yum list installed [＜パッケージ＞]
  インストール済みパッケージの一覧を表示する。
  インストールされたパッケージのうち、パッケージ名が "php70" で始まるもののリストを表示するコマンドは以下。
- yum list installed "php70\*"

- yum list [＜パッケージ＞]
  インストール可能なパッケージの一覧を表示する。

- yum provides ＜ファイル名＞
  指定したファイル名を含むパッケージを検索する。

- yum info [installed] [＜パッケージ＞]
  パッケージの情報を表示する。

- yum check-update
- yum list updates
  インストールしたパッケージでアップデートが必要（できる）一覧を表示する。

- yum -v grouplist
  インストール可能なパッケージグループを表示する。
  -v オプションについて下で説明する。

- yum groupinfo ＜パッケージグループ＞
  パッケージグループの情報を表示する。

- yum deplist ＜パッケージ＞
  パッケージの依存関係を表示する。

- yum repolist [all | enabled | disabled | ＜リポジトリ名＞]
  リポジトリを表示する。
  all：すべてのリポジトリ
  enabled：有効なリポジトリ
  disabled：無効なリポジトリ

- yum search ＜検索文字列＞
  リポジトリ名やサマリーからパッケージ名を検索する。

- yum list available ＜パッケージ名の一部＞
  完全なパッケージ名が分からないときにパッケージ名の一覧を表示する。引数にはワイルドカードを使用する。
  例えば "abc" で始まるパッケージ名を調べたい場合は以下のようにする。
  　 yum list available 'abc\*'

- yum provides ＜ファイルのパス＞
  指定したファイルを含むパッケージと該当するリポジトリを表示する。
  例： yum provides '\*bin/yum'

- yum install ＜ URL ＞
  URL からインストールする。
