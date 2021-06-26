<?php
$a = 1.234;
$b = 1.2e3;
$c = 7E-10;

function float_max($mul = 2, $affine = 1)
{
  $max = 1;
  $omax = 0;
  while ((string)$max != 'INF') {
    $omax = $max;
    $max *= $mul;
  }

  for ($i = 0; $i < $affine; $i++) {
    $pmax = 1;
    $max = $omax;
    while ((string)$max != 'INF') {
      $omax = $max;
      $max += $pmax;
      $pmax *= $mul;
    }
  }
  return $omax;
}
