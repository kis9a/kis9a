terraform {
  backend "s3" {
    region                 = "ap-northeast-1"
    encrypt                = true
    key                    = "kis9a-src.tfstate"
    bucket                 = "kis9a-terraform-states"
    skip_region_validation = true
  }
}

provider "aws" {
  region = "ap-northeast-1"
}

# resource "aws_route53_zone" "site_zone" {
#   name = "me.kis9a.com"
# }

# module "acm" {
#   source      = "./modules/acm"
#   root_domain = "kis9a.com"
#   zone_id     = "Z09579232JIYGMEX3JQS5"
# }

module "static_site_root" {
  source              = "./modules/static_site"
  bucket_name         = var.bucket_name
  domain              = var.domain_name
  zone_id             = "Z09579232JIYGMEX3JQS5"
  acm_certificate_arn = "	arn:aws:acm:us-east-1:298276046670:certificate/55c5ce44-b780-45ea-b5b2-c550cdcde710"
}

# output "name_servers" {
#   value = aws_route53_zone.site_zone.name_servers
# }
