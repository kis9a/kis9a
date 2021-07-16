```
function uniq(array) {
  return array.filter((elem, index, self) => self.indexOf(elem) === index);
}
function uniq(array) {
  return [...new Set(array)];
}
function uniq(array) {
  return Array.from(new Set(array));
}


const baseName = (str) => {
  var base = new String(str).substring(str.lastIndexOf("/") + 1);
  return base
  // if (base.lastIndexOf(".") != -1)
  //   base = base.substring(0, base.lastIndexOf("."));
  // return base;
}

```
