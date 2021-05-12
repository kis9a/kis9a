├── examples
│ └── basic
│ └── main.tf [可能な限り] このモジュールのミニマムな使用例を書きます
│ 何も変更せずともこの basic ディレクトリで
│ terraform init && terraform apply が通るようにします
├── modules [必要に応じて] ネストしたモジュール(このモジュール内でのみ使用するモジュール)はここで宣言します
│ ├── master-nodes [必要に応じて]
│ └── worker-nodes [必要に応じて]
├── LICENSE [必要に応じて] 公開モジュールの場合は必ず置きましょう
├── README.md [必須] モジュールの概要と用途を書きます。場合によっては図を含めましょう
│ 使用例は examples/basic 以下に実際に動くコードとして書き、
│ ここからはリンクするにとどめたほうがよいです
├── variables.tf [必須] 何も variable がない場合でも空のファイルを作ります。
│ また variable の description は必ず書きます。
│ 単にリソースの argument へ引き回しており自明に思えるときは
│ https://www.terraform.io/docs/providers/aws/r/instance.html#ami
│ などその argument 項目へのリンクを書くと良いです。
├── main.tf [必須] 基本的にはここへリソース宣言を置きます。
├── another.tf [必要に応じて] main.tf が長くなりすぎた場合は Root Module と同じく
│ 種別ごとに tf ファイルを分けて書きます。
└── outputs.tf [必須] 何も output がない場合でも空のファイルを作ります。
また output の description は必ず書きます。
単にリソースの output を引き回しており自明に思えるときは
https://www.terraform.io/docs/providers/aws/r/instance.html#id
などその output 項目へのリンクを書くと良いです。

# 初期化

$ terraform init

# 構成をフォーマットして検証

$ terraform fmt

# dry-run

$ terraform plan

# 特定のリソースだけ実行

$ terraform plan -target={type.local-name01,type.local-name02}

# 実行

$ terraform apply

# 既存のインフラリソースをインポート

$ terraform import aws_vpc.vpc vpc-09a9f1827bfd851f4
※予め対応するリソースを tf ファイルに記述しておく必要がある

四則演算

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
| 用語 | 意味 |
| ------------- | ------------------------------------------------------------------------------------------- |
| Configuration | インフラ設定のコード。要するに `*.tf` ファイルに DSL で書く Terraform のコードのこと。 |
| HCL | HashiCorp Configuration Language の略。 |
| Resource | Terraform で管理する対象の基本単位。 |
| Data Source | Terraform 管理外だけど、Terraform 内で参照したい参照専用の外部データ。 |
| Provider | Resource や Data Source などを作成/更新/削除するプラグイン。aws/google/azurerm など。 |
| Provisioner | リソースの作成/削除時に実行するスクリプトなどのプラグイン。local-exec/remote-exec/chef など |
| State | Terraform が認識しているリソースの状態。 `*.tfstate` ファイルのこと。 |
| Backend | State の保存先。local/s3/gcs など。 |
| Module | Resource や Data Source などを再利用可能なようにまとめた Configuration の単位。 |

| 項目              | 意味                                                                                                                                                                                            |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| version           | State ファイルのフォーマットバージョンです。State ファイル自体のフォーマットが変更された場合にマイグレーションできるようにフォーマット自体のバージョンがあります。                              |
| terraform_version | Terraform のバージョン。古い Terraform で書かれた State は新しい Terraform で読めますが、その逆はエラーになります。                                                                             |
| serial            | シリアル番号です。State が更新されるたびにインクリメントされます。諸般の事情で手動で State を編集する場合は、このシリアル番号もインクリメントする必要があります。                               |
| lineage           | State の血統です。うっかり間違って無関係の State を上書いたりしないように、シリアル番号を比較することに意味があるかどうかを判別するため、State が初期化されるタイミングで UUID が発行されます。 |
| modules           | モジュールの状態です。                                                                                                                                                                          |

| 項目 | 意味                                                                                                                                                           |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path | モジュールのツリーのパスです。必ず root モジュールが 1 つ存在します。root モジュールから読み込まれている hoge module の場合は、root から見たツリー上の位置が、 |

`[root, hoge]`
というように記録されてます。 |
| output | モジュールの output です。 |
| resources | リソースの状態です。 |
| depends_on | モジュール間の依存です。 |

| 項目       | 意味                                 |
| ---------- | ------------------------------------ |
| type       | リソースの種類です。                 |
| depends_on | リソース間の依存です。               |
| primary    | アクティブなインスタンスの状態です。 |
| deposed    | 削除予定のインスタンスです。         |

`create_before_destroy`
のときに使われます。 |
| provider | プロバイダの名前です。プロバイダはマルチリージョンしたりするのに、エイリアスを作ったりできるので記録されています。 |

| 項目 | 意味                                                                       |
| ---- | -------------------------------------------------------------------------- |
| id   | リソース ID です。何が ID になりうるかはリソースタイプによって異なります。 |

`null_resouce`
の場合はただの乱数ですが、一般的にはインスタンス ID など、API などでそのリソース情報を取得するのにユニークに特定し得る値が使われます。 |
| attributes | リソース属性です。リソースの設定項目などの具体的な値を保存しているのはここです。 |
| meta | Terraform コアからは無視されるけど外部ツールが使うことを意図したメタ情報です。 |
| tainted | 汚染フラグです。リソースを tainted 状態にすると、次回の plan で削除=>作成で再作成する plan になります。 |

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

| ファイル    | 説明                                      |
| ----------- | ----------------------------------------- |
| main.tf     | resource を定義します                     |
| output.tf   | 他の Module で利用する値を定義します      |
| variable.tf | Module への入力するための変数を定義します |

resources, provider, modules, functions, variables.

Intro to Terraform
Terraform CLI
Terraform Cloud
Provider Documentation
Terraform Glossary
Publishing Providers and Modules
Extending Terraform

- Input: Variables serve as parameters for a Terraform module, so users can customize behavior without editing the source.
- Output: Values are like return values for a Terraform module.
- Local: Values are a convenience feature for assigning a short name to an expression.
- Resource: Each resource block describes one or more infrastructure objects, such as virtual networks, compute instances, or higher-level components such as DNS records.

- [Documentation - Terraform by HashiCorp](https://www.terraform.io/docs/index.html)

- [Terraform 入門 - Qiita](https://qiita.com/kobayashi-m42/items/247cf9708044db8a234e)

- [10 分で理解する Terraform - Qiita](https://qiita.com/Chanmoro/items/55bf0da3aaf37dc26f73)

- [GitHub - hashicorp/terraform-provider-aws: Terraform AWS provider](https://github.com/hashicorp/terraform-provider-aws)

- [Perform Dynamic Operations with Functions | Terraform - HashiCorp Learn Show sidebar](https://learn.hashicorp.com/tutorials/terraform/functions?in=terraform/configuration-language)
  hcl:

- [Get Started - AWS | Terraform - HashiCorp Learn Type to Search Show sidebar](https://learn.hashicorp.com/collections/terraform/aws-get-started)

[terraform-best-practices](https://www.terraform-best-practices.com/)

brew install tfenv
tfenv install latest
tfenv install list-remote
tfenv install list
tfenv use $version
terraform plan -var-file=dev.tfvars
terraform apply -destroy

- tfstate file

```
- [Terraform EC2構築 × Ansible Nginxインストール](https://zenn.dev/endo/articles/f893ced432a9d2db8a5b)

# aws configure profile作成  profile名：default
$ aws configure --profile default

# aws configure 確認・編集
$ vim ~/.aws/credentials

# aws configure 削除
$ rm -r ~/.aws

# terraformでモジュール単位でリソース作成
$ terraform apply -target module.VPC

# Ansible Role作成
$ ansible-galaxy init nginx
```

- [Terraform 設計・運用のノウハウ - Qiita](https://qiita.com/naomichi-y/items/4501331d114b4ef9d584)

```
# 構築する対象サービス。EC2、Security Groupといった単位
{service}
  # resourceやmodule
  main.tf

  # main.tfやbackend.tfで参照する変数のリスト
  variables.tf

  # 出力パラメータのリスト
  outputs.tf

  # プロバイダ情報
  providers.tf

  # backendやdataのリスト
  backend.tf

##

providers
  aws
    # AWS運用上必須となる基盤サービス
    base
      # リージョンに依存しないサービス
      global
        iam
        route53
        ...
      # 特定のリージョンを構築するサービス
      ap-northeast-1
        cognito
        cloudtrail
        ...
    # アプリケーションを構成する上で必要となるサービス
    {APP NAME}
      # ワークスペースに依存しないサービス
      base
        route53
        ...
      # ワークスペースで構成されるサービス
      workspace
        ap-northeast-1
          global
            vpc
            ecs
            ...

            Usage: terraform [global options] <subcommand> [args]

The available commands for execution are listed below.
The primary workflow commands are given first, followed by
less common or more advanced commands.

Main commands:
  init          Prepare your working directory for other commands
  validate      Check whether the configuration is valid
  plan          Show changes required by the current configuration
  apply         Create or update infrastructure
  destroy       Destroy previously-created infrastructure

All other commands:
  console       Try Terraform expressions at an interactive command prompt
  fmt           Reformat your configuration in the standard style
  force-unlock  Release a stuck lock on the current workspace
  get           Install or upgrade remote Terraform modules
  graph         Generate a Graphviz graph of the steps in an operation
  import        Associate existing infrastructure with a Terraform resource
  login         Obtain and save credentials for a remote host
  logout        Remove locally-stored credentials for a remote host
  output        Show output values from your root module
  providers     Show the providers required for this configuration
  refresh       Update the state to match remote systems
  show          Show the current state or a saved plan
  state         Advanced state management
  taint         Mark a resource instance as not fully functional
  untaint       Remove the 'tainted' state from a resource instance
  version       Show the current Terraform version
  workspace     Workspace management

Global options (use these before the subcommand, if any):
  -chdir=DIR    Switch to a different working directory before executing the
                given subcommand.
  -help         Show this help output, or the help for a specified subcommand.
  -version      An alias for the "version" subcommand.
```

公式ドキュメントを読もう
tf ファイルを書く技術
インデントを揃える
組み込み関数に親しむ
lifecycle ブロックを使う
リソースの差分を無視する
リソース再生成のときに新しいのを作ってから古いのを削除する
リソースのうっかり削除の保護
テンプレートを使う
外部ファイルを文字列として読み込む
テンプレートに変数を埋め込む
モジュールでコードを共通化する
モジュールの作り方
production/staging などの環境差分を管理する
モジュール間で値を参照する
State を跨いで値を参照する
条件分岐したい
条件によって変数の値を変える
条件によってリソースを作成したりしなかったり
Terraform のバージョンを管理する技術
Terraform をバージョンアップする
Terraform のバージョンを切り替える
Terraform のバージョンを固定する
Terraform プロバイダをバージョンアプする
Terraform プロバイダのバージョンを固定する
tfstate ファイルを書く技術
ローカルでミニマムの State を見てみる
リモートの State を見る
強制的にリソースを再生成する
Terraform 管理外の既存のリソースを Terraform 管理下に入れる
tf ファイルをリファクタリングする
Terraform をデバッグする技術
デバッグログを出力する
Terraform のソースコードをコンパイルする
デバッグログにソースコードのファイル名と行番号を付ける
Terraform をデバッガでステップ実行するッ
