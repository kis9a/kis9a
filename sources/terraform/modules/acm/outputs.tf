output "certificate_arn" {
  description = "Arn of validated certificate arn"
  value       = "${aws_acm_certificate_validation.acm_cert.certificate_arn}"
}
