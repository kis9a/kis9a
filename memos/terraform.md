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

resources

| 種別     | リソース種類                   | 名前        | 備考                                                              |
| -------- | ------------------------------ | ----------- | ----------------------------------------------------------------- |
| resource | aws_iam_role                   | default     | IAM ロール                                                        |
| data     | aws_iam_policy_document        | assume_role | 信頼ポリシー（ポリシードキュメント）                              |
| resource | aws_iam_policy                 | default     | IAM ポリシー                                                      |
| resource | aws_iam_role_policy_attachment | default     | IAM ポリシーのアタッチ（IAM ロールに IAM ポリシーをアタッチする） |

| 種別     | リソース種類                      | 名前    | 備考                                                |
| -------- | --------------------------------- | ------- | --------------------------------------------------- |
| resource | aws_s3_bucket                     | private | プライベートバケット                                |
| resource | aws_s3_bucket_public_access_block | private | プライベートバケットのパブリックアクセス定義        |
| resource | aws_s3_bucket                     | public  | パブリックバケット                                  |
| resource | aws_s3_bucket                     | alb_log | ログバケット（後に定義する ALB 用のログを格納する） |
| data     | aws_iam_policy_document           | alb_log | ALB ログを書き込むための IAM ポリシー               |

| 種別 | リソース種類            | 名前    | 備考                                                           |
| ---- | ----------------------- | ------- | -------------------------------------------------------------- |
| data | aws_elb_service_account | alb_log | ログの書き込みに使用されるアカウント ID を自動的にフェッチする |

| 調整前リスト No. | 名称                                             | 調整後リスト No. |
| ---------------- | ------------------------------------------------ | ---------------- |
| リスト 7.2       | パブリックサブネット                             | リスト 7.12      |
| リスト 7.６      | パブリックサブネット用ルートテーブルの関連付け   | リスト 7.13      |
| リスト 7.7       | プライベートサブネット                           | リスト 7.14      |
| リスト 7.８      | プライベートサブネット用ルートテーブルと関連付け | リスト 7.16      |
| リスト 7.9       | プライベートサブネット用の EIP                   | リスト 7.15      |
| リスト 7.10      | プライベートサブネット用の NAT ゲートウェイ      | リスト 7.15      |
| リスト 7.11      | プライベートサブネット用のルート                 | リスト 7.16      |

| 種別     | リソース種類                | 名前          | 備考                                                     |
| -------- | --------------------------- | ------------- | -------------------------------------------------------- |
| resource | aws_vpc                     | example       | VPC                                                      |
| resource | aws_internet_gateway        | example       | インターネットゲートウェイ                               |
| resource | aws_subnet                  | public_0      | AZ0 のパブリックサブネット                               |
| resource | aws_subnet                  | public_1      | AZ1 のパブリックサブネット                               |
| resource | aws_route_table             | public        | パブリックサブネット用ルートテーブル                     |
| resource | aws_route                   | public        | パブリックサブネット用ルート（ルートテーブルのレコード） |
| resource | aws_route_table_association | public_0      | AZ0 のパブリックサブネットとルートテーブルの関連付け     |
| resource | aws_route_table_association | public_1      | AZ1 のパブリックサブネットとルートテーブルの関連付け     |
| resource | aws_subnet                  | private_0     | AZ0 のプライベートサブネット                             |
| resource | aws_subnet                  | private_1     | AZ1 のプライベートサブネット                             |
| resource | aws_eip                     | nat_gateway_0 | AZ0 の NAT ゲートウェイ用 EIP                            |
| resource | aws_eip                     | nat_gateway_1 | AZ1 の NAT ゲートウェイ用 EIP                            |
| resource | aws_nat_gateway             | nat_gateway_0 | AZ0 の NAT ゲートウェイ                                  |
| resource | aws_nat_gateway             | nat_gateway_1 | AZ1 の NAT ゲートウェイ                                  |
| resource | aws_route_table             | private_0     | AZ0 のプライベートサブネットのルートテーブル             |
| resource | aws_route_table             | private_1     | AZ1 のプライベートサブネットのルートテーブル             |
| resource | aws_route                   | private_0     | AZ0 のプライベートサブネットのルート                     |
| resource | aws_route                   | private_1     | AZ1 のプライベートサブネットのルート                     |
| resource | aws_route_table_association | private_0     | AZ0 のプライベートサブネットのルートテーブルの関連付け   |
| resource | aws_route_table_association | private_1     | AZ1 のプライベートサブネットのルートテーブルの関連付け   |

| 種別     | リソース種類            | 名前    | 備考                                         |
| -------- | ----------------------- | ------- | -------------------------------------------- |
| resource | aws_security_group      | default | セキュリティグループ                         |
| resource | aws_security_group_rule | ingress | セキュリティグループルール（インバウンド）   |
| resource | aws_security_group_rule | egress  | セキュリティグループルール（アウトバウンド） |

| 種別     | リソース種類         | 名前                   | 備考                                                                               |
| -------- | -------------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| resource | aws_lb               | example                | ALB                                                                                |
| module   | -                    | http_sg                | HTTP 用セキュリティグループ                                                        |
| module   | -                    | https_sg               | HTTPS 用セキュリティグループ                                                       |
| module   | -                    | http_redirect_sg       | HTTP から HTTPS へのリダイレクト用セキュリティグループ                             |
| resource | aws_lb_listener      | http                   | HTTP リスナーの定義(HTTPS 化を行わない場合)                                        |
| resource | aws_lb_listener      | https                  | HTTPS リスナーの定義(HTTPS 化を行う場合)                                           |
| resource | aws_lb_listener      | redirect_http_to_https | HTTP から HTTPS へのリダイレクトリスナーの定義(HTTPS 化を行う場合)                 |
| resource | aws_lb_target_group  | example                | ターゲットグループ                                                                 |
| resource | aws_lb_listener_rule | example                | リスナールール（HTTPS 化を行う場合と行わない場合で listener_arn の設定値が異なる） |

| 種別     | リソース種類       | 名前                | 備考                                                 |
| -------- | ------------------ | ------------------- | ---------------------------------------------------- |
| data     | aws_route53_zone   | example             | ホストゾーンの参照(ホストゾーンがすでにある場合)     |
| resource | aws_route53_zone   | example_test        | ホストゾーンの作成(ホストゾーンを新規に作成する場合) |
| resource | aws_route53_record | example             | ALB の DNS レコード                                  |
| resource | aws_route53_record | example_certificate | SSL 証明書の検証用レコード                           |

| 種別     | リソース種類                   | 名前    | 備考                                                                                                                  |
| -------- | ------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------- |
| resource | aws_acm_certificate            | example | SSL 証明書                                                                                                            |
| resource | aws_acm_certificate_validation | example | SSL 証明書の検証完了まで待機（apply 時に SSL 証明書の検証が完了するまで待つ。何かのリソースが作られるわけではない。） |

| 種別     | リソース種類            | 名前     | 備考                                                         |
| -------- | ----------------------- | -------- | ------------------------------------------------------------ |
| resource | aws_ecs_cluster         | example  | ECS クラスター                                               |
| resource | aws_ecs_task_definition | example  | ECS タスク定義                                               |
| resource | aws_ecs_service         | example  | ECS サービス（起動タスクの数やタスクの維持、ALB との橋渡し） |
| module   | -                       | nginx_sg | Nginx 用セキュリティグループ                                 |

| 種別     | リソース種類             | 名前                           | 備考                                                                  |
| -------- | ------------------------ | ------------------------------ | --------------------------------------------------------------------- |
| resource | aws_cloudwatch_log_group | for_ecs                        | CloudWatch Logs                                                       |
| data     | aws_iam_policy           | ecs_task_execution_role_policy | ECS タスク実行 IAM ロールポリシーの参照（AWS が管理しているポリシー） |
| data     | aws_iam_policy_document  | ecs_task_execution             | ECS タスク実行 IAM ロールのポリシードキュメント                       |
| module   | -                        | ecs_task_execution_role        | ECS タスク実行 IAM ロール                                             |

| 種別     | リソース種類            | 名前          | 備考                    |
| -------- | ----------------------- | ------------- | ----------------------- |
| resource | aws_ecs_task_definition | example_batch | バッチ用 ECS タスク定義 |

| 種別     | リソース種類                | 名前                    | 備考                                   |
| -------- | --------------------------- | ----------------------- | -------------------------------------- |
| resource | aws_cloudwatch_log_group    | for_ecs_scheduled_tasks | バッチ用 CloudWatch Logs               |
| module   | -                           | ecs_events_role         | CloudWatch イベント IAM ロール         |
| data     | aws_iam_policy              | ecs_events_role_policy  | CloudWatch イベント IAM ロールポリシー |
| resource | aws_cloudwatch_event_rule   | example_batch           | CLoudWatch イベントルール              |
| resource | aws_cloudwatch_event_target | example_batch           | CloudWatch イベントターゲット          |

| 種別     | リソース種類      | 名前        | 備考                        |
| -------- | ----------------- | ----------- | --------------------------- |
| resource | aws_ssm_parameter | db_username | DB のユーザ名の定義         |
| resource | aws_ssm_parameter | db_password | DB のダミーパスワードの定義 |

| 種別     | リソース種類  | 名前    | 備考                                                         |
| -------- | ------------- | ------- | ------------------------------------------------------------ |
| resource | aws_kms_key   | example | カスタマーマスターキー                                       |
| resource | aws_kms_alias | example | エイリアスの定義(カスタマーキーの UUID では判別しづらいため) |

| 種別     | リソース種類           | 名前     | 備考                                                                                        |
| -------- | ---------------------- | -------- | ------------------------------------------------------------------------------------------- |
| resource | aws_db_parameter_group | example  | DB パラメータグループ                                                                       |
| resource | aws_db_option_group    | example  | DB オプショングループ（DB エンジンにオプション機能を追加する。例は MariaDB 監査プラグイン） |
| resource | aws_db_subnet_group    | example  | DB サブネットグループ(DB を稼働させるサブネットの定義)                                      |
| resource | aws_db_instance        | example  | DB インスタンス                                                                             |
| module   | -                      | mysql_sg | DB インスタンスのセキュリティグループ                                                       |

| 種別     | リソース種類                      | 名前     | 備考                                                       |
| -------- | --------------------------------- | -------- | ---------------------------------------------------------- |
| resource | aws_elasticache_parameter_group   | example  | ElastiCache パラメータグループ                             |
| resource | aws_elasticache_subnet_group      | example  | ElastiCache サブネットグループ                             |
| resource | aws_elasticache_replication_group | example  | ElastiCache レプリケーショングループ（Redis サーバの作成） |
| module   | -                                 | redis_sg | ElastiCache レプリケーショングループのセキュリティグループ |

| 種別     | リソース種類             | 名前    | 備考                       |
| -------- | ------------------------ | ------- | -------------------------- |
| resource | aws_ecr_repository       | example | ECR レポジトリ             |
| resource | aws_ecr_lifecycle_policy | example | ECR ライフサイクルポリシー |

| 種別     | リソース種類  | 名前     | 備考                             |
| -------- | ------------- | -------- | -------------------------------- |
| resource | aws_s3_bucket | artifact | アーティファクトストア用バケット |

| 種別     | リソース種類            | 名前           | 備考                                           |
| -------- | ----------------------- | -------------- | ---------------------------------------------- |
| data     | aws_iam_policy_document | codebuild      | CodeBuild サービスロールのポリシードキュメント |
| module   | -                       | codebuild_role | CodeBuild サービルロール                       |
| resource | aws_codebuild_project   | example        | CodeBuild プロジェクト                         |

| 種別     | リソース種類              | 名前              | 備考                                                                                 |
| -------- | ------------------------- | ----------------- | ------------------------------------------------------------------------------------ |
| data     | aws_iam_policy_document   | codepipeline      | CodePipeline サービスロールのポリシードキュメント                                    |
| module   | -                         | codepipeline_role | CodePipeline サービスロール                                                          |
| resource | aws_codepipeline          | example           | CodePipeline(例では 3 つのステージで実装する)                                        |
| resource | aws_codepipeline_webhook  | example           | CodePipeline Webhook                                                                 |
| resource | github_repository_webhook | example           | GitHub Webhook(GitHub 上でのイベントを検知し、コードの変更を通知する Webhook の定義) |

| 種別     | リソース種類      | 名前         | 備考                                     |
| -------- | ----------------- | ------------ | ---------------------------------------- |
| resource | aws_ssm_parameter | github_token | GitHub Token を SSM パラメータとして定義 |

| 種別     | リソース種類             | 名前                  | 備考                                                                                                                              |
| -------- | ------------------------ | --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| data     | aws_iam_policy_document  | ec2_for_ssm           | オペレーションサーバ用ポリシードキュメント                                                                                        |
| data     | aws_iam_policy           | ec2_for_ssm           | Session Manager 用に定義されているポリシーをベースに利用する                                                                      |
| module   | -                        | ec2_for_ssm_role      | オペレーションサーバ用 IAM ロール                                                                                                 |
| resource | aws_iam_instance_profile | ec2_for_ssm           | インスタンスプロファイル(EC2 は直接 IAM ロールを関連付けられないため、IAM ロールをラップしたインスタンスプロファイルを関連付ける) |
| resource | aws_instance             | example_for_operation | オペレーションサーバ用 EC2 インスタンス                                                                                           |

| 種別     | リソース種類  | 名前                  | 備考                                           |
| -------- | ------------- | --------------------- | ---------------------------------------------- |
| resource | aws_s3_bucket | operation_instance_id | オペレーションログを保存する S3 バケットの定義 |

| 種別     | リソース種類             | 名前      | 備考                                         |
| -------- | ------------------------ | --------- | -------------------------------------------- |
| resource | aws_cloudwatch_log_group | operation | オペレーションログを保存する CloudWatch Logs |

| 種別     | リソース種類     | 名前                      | 備考                            |
| -------- | ---------------- | ------------------------- | ------------------------------- |
| resource | aws_ssm_document | session_manager_run_shell | Session Manager 用 SSM document |

| 種別     | リソース種類  | 名前            | 備考                           |
| -------- | ------------- | --------------- | ------------------------------ |
| resource | aws_s3_bucket | cloudwatch_logs | CloudWatch Logs 永続化バケット |

| 種別     | リソース種類                         | 名前                       | 備考                                                                                                                                 |
| -------- | ------------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| data     | aws_iam_policy_document              | kinesis_data_firehose      | Kinesis Data Firehose IAM ロールのポリシードキュメントの定義                                                                         |
| module   | -                                    | kinesis_data_firehose_role | Kinesis Data Firehose 用 IAM ロール                                                                                                  |
| resource | aws_kinesis_firehose_delivery_stream | example                    | Kinesis Data Firehose 配信ストリーム(Kinesis Data Firehose にログが流れるとこの配信ストリームに設定した S3 バケットへログを保存する) |

| 種別     | リソース種類                           | 名前                 | 備考                                              |
| -------- | -------------------------------------- | -------------------- | ------------------------------------------------- |
| data     | aws_iam_policy_document                | cloudwatch_logs      | CloudWatch Logs 用 IAM ロールポリシードキュメント |
| module   | -                                      | cloudwatch_logs_role | CloudWatch Logs 用 IAM ロール                     |
| resource | aws_cloudwatch_log_subscription_filter | example              | CloudWatch Logs サブスクリプションフィルタ        |
