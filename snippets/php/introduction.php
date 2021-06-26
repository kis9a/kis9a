<?php
function main()
{
  $a_bool = true;
  $a_str = "foo";
  $a_int = 12;

  echo gettype($a_bool);
  echo gettype($a_str);

  if (is_int($a_int)) {
    $a_int += 4;
  }

  if (is_string($a_bool)) {
    echo "String: $a_bool";
  }
}

main();
