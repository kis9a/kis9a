######
# S3
######
resource "aws_s3_bucket" "static_site" {
  bucket = "${var.bucket_name}"
  acl = "private"
}

resource "aws_s3_bucket_policy" "static_site" {
  bucket = "${aws_s3_bucket.static_site.id}"
  policy = "${data.aws_iam_policy_document.static_site_policy.json}"
}

data "aws_iam_policy_document" "static_site_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.static_site.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["${aws_cloudfront_origin_access_identity.static_site.iam_arn}"]
    }
  }
}

######
# CloudFront
######
locals {
  s3_origin_id = "s3-origin-${var.domain}"
}

resource "aws_cloudfront_origin_access_identity" "static_site" {
  comment = "${var.domain}"
}

resource "aws_cloudfront_distribution" "static_site" {
  aliases = ["${var.domain}"]
  origin {

    domain_name = "${aws_s3_bucket.static_site.bucket_regional_domain_name}"
    origin_id   = "${local.s3_origin_id}"

    s3_origin_config {
      origin_access_identity = "${aws_cloudfront_origin_access_identity.static_site.cloudfront_access_identity_path}"
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.domain}"
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "${local.s3_origin_id}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  price_class = "PriceClass_200"

  viewer_certificate {
    acm_certificate_arn = "${var.acm_certificate_arn}"
    ssl_support_method = "sni-only"
    minimum_protocol_version = "TLSv1"
  }
}

######
# Route53
######
resource "aws_route53_record" "site" {
  zone_id = "${var.zone_id}"
  name = "${var.domain}"
  type = "A"

  alias {
    name = "${aws_cloudfront_distribution.static_site.domain_name}"
    zone_id = "${aws_cloudfront_distribution.static_site.hosted_zone_id}"
    evaluate_target_health = false
  }
}
