variable "aws_region" {
  type    = string
  default = "ap-northeast-1"
}

variable "profile" {
  type    = string
  default = "kis9a-src"
}

variable "domain_name" {
  type    = string
  default = "me.kis9a.com"
}

variable "bucket_name" {
  default = "kis9a-sources"
}
