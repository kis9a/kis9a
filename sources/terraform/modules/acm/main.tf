resource "aws_acm_certificate" "acm_cert" {
  provider                  = "aws"
  domain_name               = var.root_domain
  subject_alternative_names = ["*.${var.root_domain}"]
  validation_method         = "DNS"
}

resource "aws_route53_record" "acm_cert" {
  name    = tolist(aws_acm_certificate.acm_cert.domain_validation_options)[0].resource_record_name
  type    = tolist(aws_acm_certificate.acm_cert.domain_validation_options)[0].resource_record_type
  zone_id = var.zone_id
  records = [tolist(aws_acm_certificate.acm_cert.domain_validation_options)[0].resource_record_value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "acm_cert" {
  certificate_arn         = aws_acm_certificate.acm_cert.arn
  validation_record_fqdns = aws_route53_record.acm_cert.*.fqdn
}
