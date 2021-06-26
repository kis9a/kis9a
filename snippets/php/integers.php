<?php
$a = 1234;
$a = 01234;
$a = 0x1A;

$large_number = 2147483647;
var_dump($large_number);                     // int(2147483647)

$large_number = 2147483648;
var_dump($large_number);                     // float(2147483648)

$million = 1000000;
$large_number =  50000 * $million * $million * $million;
var_dump($large_number);                     // float(5.0E+22)

var_dump(25 / 7);
var_dump((int) (25 / 7));
var_dump(round(25 / 7));
