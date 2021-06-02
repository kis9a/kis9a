# terraform

basics<!--{{{-->

| 用語          | 意味                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------- |
| Configuration | インフラ設定のコード。要するに `*.tf` ファイルに DSL で書く Terraform のコードのこと。      |
| HCL           | HashiCorp Configuration Language の略。                                                     |
| Resource      | Terraform で管理する対象の基本単位。                                                        |
| Data Source   | Terraform 管理外だけど、Terraform 内で参照したい参照専用の外部データ。                      |
| Provider      | Resource や Data Source などを作成/更新/削除するプラグイン。aws/google/azurerm など。       |
| Provisioner   | リソースの作成/削除時に実行するスクリプトなどのプラグイン。local-exec/remote-exec/chef など |
| State         | Terraform が認識しているリソースの状態。 `*.tfstate` ファイルのこと。                       |
| Backend       | State の保存先。local/s3/gcs など。                                                         |
| Module        | Resource や Data Source などを再利用可能なようにまとめた Configuration の単位。             |

| 項目       | 意味                                 |
| ---------- | ------------------------------------ |
| type       | リソースの種類です。                 |
| depends_on | リソース間の依存です。               |
| primary    | アクティブなインスタンスの状態です。 |
| deposed    | 削除予定のインスタンスです。         |

| ファイル    | 説明                                      |
| ----------- | ----------------------------------------- |
| main.tf     | resource を定義します                     |
| output.tf   | 他の Module で利用する値を定義します      |
| variable.tf | Module への入力するための変数を定義します |

blocks

- Input: Variables serve as parameters for a Terraform module, so users can customize behavior without editing the source.
- Output: Values are like return values for a Terraform module.
- Local: Values are a convenience feature for assigning a short name to an expression.
- Resource: Each resource block describes one or more infrastructure objects, such as virtual networks, compute instances, or higher-level components such as DNS records.
<!--}}}-->

functions<!--{{{-->

# integer

add = "${1 + 2 + 3}" # add = 6
sub = "${10 - 5}" # sub = 5
mul = "${2 * 5}" # mul = 10
div = "${10 / 5}" # div = 2
mod = "${11 % 3}" # mod = 2

# float

add_f= "${1.5 + 2.5 + 3.5}" # add_f = 7.5
sub_f = "${10 - 4.5}" # sub_f = 5.5
mul_f = "${2.5 * 5}" # mul_f = 12.5
div_f = "${12.5 / 5.0}" # div_f = 2.5

等価演算子
true_result_eq = "${1 == 1}" # true_result_eq = true
false_result_eq = "${1 == 2}" # false_result_eq = false
true_result_ne = "${1 != 2}" # true_result_ne = true
false_result_ne = "${1 != 1}" # false_result_ne = false

比較演算子
result_gt = "${10 > 10}" # result_gt = false
result_ge = "${10 >= 10}" # result_ge = true
result_lt = "${5 < 10}" # result_lt = true
result_le = "${10 <= 5}" # result_le = false

二値論理演算子
true_result_and = "${true && true}" # true_result_and = true
false_result_and = "${truel && false}" # false_result_and = false
true_result_or = "${true || false}" # true_result_or = true
fasle_result_or = "${false || false}" # false_result_or = false
true_result_unary = "${true && ! false}" # true_result_unary = true
false_result_unary = "${!(true || false)}" # false_result_unary = false

三項演算子
true_cond = "${true ? 10 : 0}" # true_cond = 10
false_cond = "${false ? 10 : 0}" # false_cond = 0

組み込み関数
cidrhost(iprange, hostnum)
concat(list1, list2, ...)
contains(list, element)
element(list, index)
format(format, args, ...)
index(list, elem)
join(delim, list)
length(list)
list(items, ...)
lookup(map, key, [default])
map(key, value, ...)
merge(map1, map2, ...)
split(delim, string)
timestamp()
title(string)
values(map)
演算子
四則演算
等価演算子
比較演算子
二値論理演算子
三項演算子

- number functions

abs
ceil
floor
log
max
min
parseint
pow
signum

- string functions

chomp
format
formatlist
indent
join
lower
regex
regexall
replace
split
strrev
substr
title
trim
trimprefix
trimsuffix
trimspace
upper

- collections functions

alltrue
anytrue
chunklist
coalesce
coalescelist
compact
concat
contains
distinct
element
flatten
index
keys
length
list
lookup
map
matchkeys
merge
one
range
reverse
setintersection
setproduct
setsubtract
setunion
slice
sort
sum
transpose
values
zipmap

- encoding functions

base64decode
base64encode
base64gzip
csvdecode
jsondecode
jsonencode
textdecodebase64
textencodebase64
urlencode
yamldecode
yamlencode

<!--}}}-->

commands:<!--{{{-->

Main commands:
init Prepare your working directory for other commands
validate Check whether the configuration is valid
plan Show changes required by the current configuration
apply Create or update infrastructure
destroy Destroy previously-created infrastructure

All other commands:
console Try Terraform expressions at an interactive command prompt
fmt Reformat your configuration in the standard style
force-unlock Release a stuck lock on the current workspace
get Install or upgrade remote Terraform modules
graph Generate a Graphviz graph of the steps in an operation
import Associate existing infrastructure with a Terraform resource
login Obtain and save credentials for a remote host
logout Remove locally-stored credentials for a remote host
output Show output values from your root module
providers Show the providers required for this configuration
refresh Update the state to match remote systems
show Show the current state or a saved plan
state Advanced state management
taint Mark a resource instance as not fully functional
untaint Remove the 'tainted' state from a resource instance
version Show the current Terraform version
workspace Workspace management

Global options (use these before the subcommand, if any):
-chdir=DIR Switch to a different working directory before executing the
given subcommand.
-help Show this help output, or the help for a specified subcommand.
-version An alias for the "version" subcommand.

<!--}}}-->

<!--practice {{{-->

- 公式ドキュメントを読もう
- tf ファイルを書く技術
  - インデントを揃える
  - 組み込み関数に親しむ
  - lifecycle ブロックを使う
    - リソースの差分を無視する
    - リソース再生成のときに新しいのを作ってから古いのを削除する
    - リソースのうっかり削除の保護
  - テンプレートを使う
    - 外部ファイルを文字列として読み込む
    - テンプレートに変数を埋め込む
  - モジュールでコードを共通化する
    - モジュールの作り方
    - production/staging などの環境差分を管理する
    - モジュール間で値を参照する
    - State を跨いで値を参照する
  - 条件分岐したい
    - 条件によって変数の値を変える
    - 条件によってリソースを作成したりしなかったり
- Terraform のバージョンを管理する技術
  - Terraform をバージョンアップする
  - Terraform のバージョンを切り替える
  - Terraform のバージョンを固定する
  - Terraform プロバイダをバージョンアップする
  - Terraform プロバイダのバージョンを固定する
- tfstate ファイルを書く技術
  - ローカルでミニマムの State を見てみる
  - リモートの State を見る
  - 強制的にリソースを再生成する
  - Terraform 管理外の既存のリソースを Terraform 管理下に入れる
  - tf ファイルをリファクタリングする
- Terraform をデバッグする技術
  - デバッグログを出力する
  - Terraform のソースコードをコンパイルする
  - デバッグログにソースコードのファイル名と行番号を付ける
  - Terraform をデバッガでステップ実行する

<!--}}}-->

- [第 1 回「EC2」@Baby Step Terraform for AWS - Qiita](https://qiita.com/sky0621/items/4fa9a9e0f7c9de4b46bf){{{

1. アプリ（※）を EC2 上で動かしてみる。
2. マネージドな DB に接続しにいく。
3. デフォルトのネットワークを使うのではなく vpc、subnet を定義する。
4. マルチ AZ(アベイラビリティゾーン)化とロードバランサーを導入する。 (5. 画像ファイルを S3 に置いて CloudFront 経由でアクセスさせる。) ※
5. アプリ（※）を Docker 化して ECS で動かすようにする。
6. 最後は CI/CD。GitHub にアプリのソースをプッシュしたら自動でビルド・デプロイが走るようにする。
7. Route 53 使って独自ドメインでアクセスできるようにする。
8. デフォルトユーザーを変える(ec2-user)
9. https での接続
10. ECS で作成
11. 秘匿情報をパラメーターストアで管理
12. RDS にログの追加
13. メールサーバーの設定
14. VPN の導入
15. 本番運用を想定した記述。tfstate の管理
<!--}}}-->

- [Terraform 職人再入門 2020 - Qiita](https://qiita.com/minamijoyo/items/3a7467f70d145ac03324)
- [Documentation - Terraform by HashiCorp](https://www.terraform.io/docs/index.html)
- [Terraform 入門 - Qiita](https://qiita.com/kobayashi-m42/items/247cf9708044db8a234e)
- [10 分で理解する Terraform - Qiita](https://qiita.com/Chanmoro/items/55bf0da3aaf37dc26f73)
- [Terraform 設計・運用のノウハウ - Qiita](https://qiita.com/naomichi-y/items/4501331d114b4ef9d584)

best practice.

- [terraform-best-practices](https://www.terraform-best-practices.com/)
- [Terraform のモジュール設計の 3 つのベストプラクティス](https://zenn.dev/aquamarinearia/articles/terraform_module_best_practice)
- 依存関係の反転 (Dependency Inversion)
- マルチクラウドの抽象化 (Multi-cloud Abstractions)
- data ブロックのみのモジュール (Data-only Modules)

- [Terraform から Ansible の playbook を実行する - Qiita](https://qiita.com/hayaosato/items/ee0d6eabb7b3d0a22136)
