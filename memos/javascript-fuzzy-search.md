```js
"use strict";

function fuzzysearch(needle, haystack) {
  var hlen = haystack.length;
  var nlen = needle.length;
  if (nlen > hlen) {
    return false;
  }
  if (nlen === hlen) {
    return needle === haystack;
  }
  outer: for (var i = 0, j = 0; i < nlen; i++) {
    var nch = needle.charCodeAt(i);
    while (j < hlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}

module.exports = fuzzysearch;

// ビット反転演算子
if (~str.indexOf("hoge")) {
  //strにhogeを含む場合の処理
}
```

- [Javascript Searching Algorithms - DEV Community Exit fullscreen mode](https://dev.to/imranib/javascript-searching-algorithms-2il2)
