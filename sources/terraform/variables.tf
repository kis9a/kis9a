variable "aws_region" {
  type    = string
  default = "ap-northeast-1"
}

variable "profile" {
  type    = string
  default = "kis9a-src"
}

variable "hosted_zone" {
  type    = string
  default = "kis9a.com"
}

variable "domain_name" {
  type    = string
  default = "me.kis9a.com"
}

variable "site_domain" {
  default = "me.kis9a.com"
}

variable "root_domain" {
  default = "kis9a.com"
}

variable "bucket_name" {
  default = "kis9a-sources"
}

