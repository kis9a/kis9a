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

https://github.com/jorgebucaran/hyperapp/issues/682

V2 の README https://github.com/jorgebucaran/hyperapp/blob/master/README.md
V2 マイルストーン https://github.com/jorgebucaran/hyperapp/milestone/7
V2 のプルリク https://github.com/jorgebucaran/hyperapp/pull/726
Action API https://github.com/jorgebucaran/hyperapp/issues/749
Effects API https://github.com/jorgebucaran/hyperapp/issues/750
Subscriptions API https://github.com/jorgebucaran/hyperapp/issues/752
class/className attribute API https://github.com/jorgebucaran/hyperapp/issues/754
Lazy Views https://github.com/jorgebucaran/hyperapp/pull/777
Middleware API https://github.com/jorgebucaran/hyperapp/issues/753

ハイパーアプリビューは、入力としていくつかの状態を受け取り、出力として仮想 DOM 表現を生成する純粋関数です。スコープ、バインディング、this、async / await、promise、callback、observable、reactive 式、reactive 割り当て、reactive 宣言、サブクラス化、フック、ミューテーション、グローバル状態、または副作用はありません。

- [V2 Effects · Issue #750 · jorgebucaran/hyperapp · GitHub](https://github.com/jorgebucaran/hyperapp/issues/750)
- [](https://github.com/okwolf/hyperapp-fx/blob/master/api.md)
