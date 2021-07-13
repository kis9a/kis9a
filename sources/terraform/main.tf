provider "aws" {
  region                 = var.aws_region
  profile                = "kis9a-src"
  skip_region_validation = true
}

terraform {
  backend "s3" {
    region                 = "ap-northeast-1"
    encrypt                = true
    key                    = "kis9a-src.tfstate"
    bucket                 = "kis9a-terraform-states"
    skip_region_validation = true
  }
}

# module "website" {
#   source      = "./modules/website"
#   hosted_zone = var.hosted_zone
#   domain_name = var.domain_name
#   aws_region  = var.aws_region
# }
