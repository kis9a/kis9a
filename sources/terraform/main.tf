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

resource "aws_route53_zone" "site_zone" {
  name = "kis9a.com"
}

module "acm" {
  source      = "./modules/acm"
  root_domain = "kis9a.com"
  zone_id     = aws_route53_zone.site_zone.zone_id
}

module "static_site_root" {
  source              = "./modules/static_site"
  bucket_name         = "kis9a-sources"
  domain              = "kis9a.com"
  zone_id             = aws_route53_zone.site_zone.zone_id
  acm_certificate_arn = module.acm.certificate_arn
}

module "static_site_foo" {
  source              = "./modules/static_site"
  bucket_name         = "kis9a-sources"
  domain              = "me.kis9a.com"
  zone_id             = aws_route53_zone.site_zone.zone_id
  acm_certificate_arn = module.acm.certificate_arn
}

module "static_site_bar" {
  source              = "./modules/static_site"
  bucket_name         = "kis9a-sources"
  domain              = "me.kis9a.com"
  zone_id             = aws_route53_zone.site_zone.zone_id
  acm_certificate_arn = module.acm.certificate_arn
}


output "name_servers" {
  value = aws_route53_zone.site_zone.name_servers
}
