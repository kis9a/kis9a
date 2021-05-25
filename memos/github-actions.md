- [GitHub - actions/checkout: Action for checking out a repo](https://github.com/actions/checkout)
- [GitHub - actions/github-script: Write workflows scripting the GitHub API in JavaScript](https://github.com/actions/github-script)
- [GitHub - technote-space/get-diff-action: GitHub Actions to get git diff](https://github.com/technote-space/get-diff-action)

```
# name: test

# on:
#   push:
#     branches:
#       - main
#   pull_request:
#     branches:
#       - main

# jobs:
#   tf_plan:
#     runs-on: ubuntu-latest
#     strategy:
#       matrix:
#         dir: [infra/]
#     steps:
#       # - uses: actions/checkout@v2
#       - uses: hashicorp/setup-terraform@v1.2.1
#         with:
#           terraform_version: 0.15.3

#       - name: Terraform format
#         id: fmt
#         run: terraform fmt -check -recursive
#         working-directory: ${{ matrix.dir }}
#         continue-on-error: true

#       - name: Configure aws credentials
#         uses: aws-actions/configure-aws-credentials@v1
#         with:
#           aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
#           aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
#           aws-region: ap-northeast-3

#       - name: Terraform Init
#         id: init
#         run: terraform init
#         working-directory: ${{ matrix.dir }}

#       - name: Terraform Plan
#         id: plan
#         run: terraform plan -no-color
#         continue-on-error: true
```
