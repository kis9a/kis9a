# Generate serial code

## In short

```sh
# create csv
for n in {1..900000}; do shuf -zer -n10 {a..z} {0..9};echo; done | perl -ne 's/\W//g;print $_ . "\n"' | sort | uniq | sort -R | head -n 800000 > result.csv

# check
cat result.csv | wc -l
##expected: 800000
cat result.csv | sort | uniq -c | awk '{if($1 > 1) { print $2 }}'
##expected: ''
```

## Create 900000 rows csv

### for n in {1..900000}; do shuf -zer -n10 {a..z} {0..9};echo; done > zserial.csv

or

### for n in {1..900000}; do echo $(bash serial.bash); done > bserial.csv

```bash
#!/bin/bash
chars=abcdefghijklmnopqrstuvwxyz0123456789
for i in {1..10}; do
 echo -n "${chars:random%${#chars}:1}"
done
echo ''
```

or

### for n in {1..900000}; do echo $(php keygen.php); done > serial.csv

this is slow.
10 倍ぐらい遅い

```php
<?php
function keygen($len, $chars = false)
{
  if (!isset($len)) $len = 10;
  if (!$chars) $chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  $key = '';
  $clen = strlen($chars);
  for ($i = 0; $i < $len; $i++) {
    $key .= $chars[rand(0, $clen - 1)];
  }
  return $key;
}

print(keygen(10));
```

## Uniq and squeeze to 800000 rows

cat $file | sort | uniq | sort -R | head -n 800000 > $squeezedfile
time( for n in {1..1000}; do; shuf -zer -n10 {a..z} {0..9}; echo; done; )
1.13s user 1.46s system 72% cpu 3.566 total

time ( ./main; )
0.01s user 0.00s system 83% cpu 0.012 total

```go
package main

import (
 "crypto/rand"
 "fmt"
)

func main() {
 const l = "abcdefghijklmnopqrstuvwxyz0123456789"
 for range make([]int, 1000) {
  b := make([]byte, 10)
  rand.Read(b)
  var r string
  for _, v := range b {
   r += string(l[int(v)%len(l)])
  }
  fmt.Println(r)
 }
}
```

