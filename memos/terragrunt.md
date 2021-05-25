### COMMAND<!--{{{-->

run-all
plan-all (DEPRECATED: use run-all)
apply-all (DEPRECATED: use run-all)
output-all (DEPRECATED: use run-all)
destroy-all (DEPRECATED: use run-all)
validate-all (DEPRECATED: use run-all)
terragrunt-info
validate-inputs
graph-dependencies
hclfmt
aws-provider-patch

---

options:

terragrunt-config
terragrunt-tfpath
terragrunt-no-auto-init
terragrunt-no-auto-retry
terragrunt-non-interactive
terragrunt-working-dir
terragrunt-download-dir
terragrunt-source
terragrunt-source-map
terragrunt-source-update
terragrunt-ignore-dependency-errors
terragrunt-iam-role
terragrunt-iam-assume-role-duration
terragrunt-exclude-dir
terragrunt-include-dir
terragrunt-strict-include
terragrunt-ignore-dependency-order
terragrunt-ignore-external-dependencies
terragrunt-include-external-dependencies
terragrunt-parallelism
terragrunt-debug
terragrunt-check
terragrunt-hclfmt-file
terragrunt-override-attr

<!--}}}-->

### Terraform built-in functions<!--{{{-->

find_in_parent_folders
path_relative_to_include
path_relative_from_include
get_env
get_platform
get_terragrunt_dir
get_parent_terragrunt_dir
get_original_terragrunt_dir
get_terraform_commands_that_need_vars
get_terraform_commands_that_need_input
get_terraform_commands_that_need_locking
get_terraform_commands_that_need_parallelism
get_aws_account_id
get_aws_caller_identity_arn
get_terraform_command
get_terraform_cli_args
get_aws_caller_identity_user_id
run_cmd
read_terragrunt_config
sops_decrypt_file
get_terragrunt_source_cli_flag

<!--}}}-->

### Configuration Blocks and Attributes<!--{{{-->

Blocks
terraform
remote_state
include
locals
dependency
dependencies
generate
Attributes
inputs
download_dir
prevent_destroy
skip
iam_role
iam_assume_role_duration
terraform_binary
terraform_version_constraint
terragrunt_version_constraint
retryable_errors

<!--}}}-->

### consept

1. Keep your Terraform code DRY
   -> DRY common Terraform code with Terragrunt generate blocks

2. Keep your remote state configuration DRY
3. Keep your Terraform CLI arguments DRY
4. Promote immutable, versioned Terraform modules across environments

| Terraform Version | Terragrunt Version                                                           |
| ----------------- | ---------------------------------------------------------------------------- |
| 0.15.x            | >= [0.29.0](https://github.com/gruntwork-io/terragrunt/releases/tag/v0.29.0) |
| 0.14.x            | >= [0.27.0](https://github.com/gruntwork-io/terragrunt/releases/tag/v0.27.0) |

### terragrunt.hcl
