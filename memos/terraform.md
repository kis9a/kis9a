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


- [Terraform設計・運用のノウハウ  - Qiita](https://qiita.com/naomichi-y/items/4501331d114b4ef9d584)
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
```

