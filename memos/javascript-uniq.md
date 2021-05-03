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
```
