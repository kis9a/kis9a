variable "domain" {
  description = "The Domain which you want to serve the website on. (e.g. `example.com`)"
}

variable "zone_id" {
  description = "The ID of hosted zone which your domain will be hosted."
}

variable "bucket_name" {
  description = "The name of S3 bucket which store site fiels for your web site"
}

variable "acm_certificate_arn" {
  description = "The Domain of site. (e.g. `example.com`)"
}
