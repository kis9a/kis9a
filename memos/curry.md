引数の数可変バージョン

[JavaScript:カリー化してくれる関数 - Qiita](https://qiita.com/ttatsf/items/cf21381a386c89247200)

```js
const curry = (f) => {
  //関数partの定義。
  const part = (...xs) =>
    xs.length < f.length ? (y) => part(...xs, y) : f(...xs);
  // partを呼び、返す。
  return part;
};
```
