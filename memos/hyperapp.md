### concept

Minimal（最小限）
Pragmatic（実践的）
Standalone（独立）

Hyperapp の関数

### h 関数,

### app 関数

h 関数:仮想 DOM を生成する関数
app 関数: Hyperapp を利用した Application を実行する関数
h(name, props, children) - name {String}…「div」など、HTML 上でのタグ名 - props {Object} … Element に挿入される attributes - children {String | Array} … 子要素

h("a", { href: "#" }, "next page")

// return object
// {
// name: 'a',
// props: {
// href: '#'
// },
// children: 'next page'
// }
app
Hyperapp による Web アプリケーションを起動する

app(state, actions, view, container)

```js
h("div", { id: "app" }, [
  h("h1", { class: "title" }, "Title"),
  h(
    "button",
    {
      onclick: () => {
        hoge: "hoge";
      },
    },
    "–"
  ),
  h(
    "button",
    {
      onclick: () => {
        hoge: "fuga";
      },
    },
    "+"
  ),
  "some text",
]);
```

```json
{
  "name": "div",
  "props": {
    "id": "app"
  },
  "children": [
    {
      "name": "h1",
      "props": { "class": "title" },
      "children": ["Title"]
    },
    {
      "name": "button",
      "props": {
        "onclick": () => {
          hoge: "hoge";
        }
      },
      "children": ["-"]
    },
    {
      "name": "button",
      "props": {
        "onclick": () => {
          hoge: "fuga";
        }
      },
      "children": ["+"]
    },
    "some text"
  ]
}
```

上記のメイン関数から呼ばれる補助的な関数。

copy()
set()
get()
getKey()
setElementProp()
createElement()
updateElement()
removeChildren()
removeElement()
