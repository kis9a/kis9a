[色んなプロジェクトを跨いだ Ansible のベストプラクティスについて改めて考えてみる - Qiita](https://qiita.com/t-okibayashi/items/2dd340dfd16c2d2e4ca1)

- [Ansible の基本 ① - Ansible の概要](https://zenn.dev/kudloid/articles/6b7e1584f204d6)
- [Ansible 勉強＆実践結果（随時更新） - Qiita](https://qiita.com/comefigo/items/d749001da5637e09cb1b)
- [[随時更新]ansible でよく使うコマンド・モジュールまとめ - Qiita](https://qiita.com/uzresk/items/1aa391eef232766bf817)
- [検索 | Zenn](https://zenn.dev/search?q=ansible)

Python 製
非エージェント型の構成管理ツール
プラットフォーム問わずに利用できる（Linux、Windows、Docker、Iaas、ベアメタル、ネットワーク機器、HW ベンダーのマネージド機器）
yml、json で構成定義ファイル（Playbook）を書けるため、学習コストが低い
Red Hat 社がメインで開発している OSS
Red Hat がバックについているので、長期的な開発が見込める
各ベンダーを巻き込んだ取り組みをしていることもあり、対応プラットフォームが多い
NASA、NEC、HP、Juniper、CISCO、EA、CocaCola など名だたる大企業が使っている

Ansible Core ･･･ Ansible の本体部分
Ansible Tower ･･･ Red Hat 社が提供する Web GUI ベースの Ansible 管理ツール（AWX の特定のバージョンから切り出したバージョン）
Ansible Engine ･･･ Red Hat 社がエンタープライズ向けに有償保証を加えた商品（コアモジュールも保証対象）
AWX ･･･ Ansible Tower の開発版で Apache v2 ライセンスで運用されている

Ansible 本体
Inventory ･･･ 操作対象のマシン(ホスト)の管理ファイル
Module ･･･ 操作対象のマシンを操作する
コアモジュールと有志モジュールが多数（13000？）
自作モジュールも簡単に作れる
Playbook ･･･ どの Inventory にどの Module でどのように操作するかを定義する定義ファイル（手順書）

Inventory
Inventory(静的)
INI 形式、YAML 形式でホスト情報を記述
ホストの接続情報があらかじめわかっている
Dynamic Inventory(動的)
ホスト情報を json に出力するスクリプト
ansible コマンド実行時にリアルタイムでスクリプトが実行される
スクリプト経由で動的にホスト情報を取得できる

ansible-playbook -v

Terraform and Ansible is a powerful combo that I use for provisioning cloud infrastructure. For basic cloud instances setup, I invoke Ansible with local-exec and later I invoke Ansible separately with dynamic inventory.
You can find an example of how I do it at c10k/infrastructureThanks! Until next time!

プッシュベース
操作を行いたいタイミングでクライアント（開発用 PC）からホスト（サーバー）に必要なスクリプトやコードを送信し、ホスト上で操作を実行します。
対義語のプルベースの設定管理システムは、ホスト上にエージェントをインストールし、リポジトリの変更やタイマーなどの何らかのイベントをきっかけにしてリポジトリから必要なスクリプトやコードをプルし、ホスト上で操作を実行します。Ansible はプルベースの設定管理システムに比べ、ホスト上に余計なソフトウェアをインストールする必要がないため、サーバーの構成はシンプルとなり保守性が高まります。

宣言的
ホストで何をするか（手続き的）ではなく、ホストがどういう状態であるかを記述します。つまり開発者は具体的な操作やその手順をあまり意識しなくてもホストを望んだ状態に設定することができます。

冪等性
ホストが既に playbook によって指定された状態にある場合、Ansible は何もしません。つまり Ansible を何度実行してもホストは同じ状態になります。間違って複数回実行してもホストの環境を破壊することはありません。
