https://github.com/diontools/typerapp

```
export type Effect<S, P = Empty> = [(props: P, dispatch: Dispatch<S>) => void, P]

export type Subscription<S, P = Empty> = [(props: P, dispatch: Dispatch<S>) => () => void, P]

export type Dispatch<S> = {
    (action: Action<S, Empty>): void
    <P>(action: Action<S, P>, params: P): void
    <P>(actionWithParams: [Action<S, P>, P]): void
    (result: ActionResult<S>): void
    <P>(all: Action<S, Empty> | [Action<S, P>, P] | ActionResult<S>): void
}

```

Subscription : [SubscriberFn, Payload?]
SubscriberFn : (DispatchFn, Payload?) -> CleanupFn

subscriptions プロパティ
subscriptions プロパティには、Subscription オブジェクトの配列を返す関数を指定します。第一引数に State が渡されます。省略可能。
この関数は State が変更されるたびに呼び出され、Effect に似た Subscription オブジェクトを返します。Effect との唯一の違いは、Effect Runner で「購読を解除する関数」を返すところです。

```
// 指定した時間間隔で指定したActionを定期的に呼び出すEffect Runner
const tickRunner = (dispatch, { action, interval }) => {
  const id = setInterval(() => dispatch(action), interval);
  return () => clearInterval(id); // 購読解除用関数
};

// tickRunnerを実行するSubscriptionを作成するSubscription Constructor
const tick = (action, { interval }) => [
  tickRunner,
  { action, interval }
];

// tickで呼び出されるAction
const action = state => ({ ...state, value: state.value + 1 });

app({
  // valueが1のときにtickを購読
  subscriptions: state => [
      state.enabled && tick(action, { interval: 1000 })
  ],
});

// State の enabled が true のとき tick を購読します。enabled が false になると tick が購読解除されます。
```

- Subscription を定義する場合、effect プロパティに指定する Effect Runner は別変数に格納しておきましょう。匿名関数を使用すると正しく購読が継続されません。effect の値が別オブジェクトと認識され、State が変化するたびに再講読されてしまいます。

- Subscriptions は複数の Subscription オブジェクトを返せます。

```
app({
  subscriptions: state => [
    tick(...),
    foo(...),
  ],
});
```

app()の subscriptions に指定する関数は、subscriptions の配列を返す必要がある。subsciptions 自体は[sub, props]という配列であるため、二重配列ということになる。
ノードの on イベントに渡すのは[action, props]または(node, evente) => [action, props]になったっぽい。イベントオブジェクトをアクションに渡したいときは(\_, e) => [Action, {value: e.target.value)]みたいな書き方が必要。

- [feature: support string type styles (#617) by huozhi · Pull Request #618 · jorgebucaran/hyperapp · GitHub](https://github.com/jorgebucaran/hyperapp/pull/618)

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
- [] https://github.com/jorgebucaran/hyperapp-router
  @hyperapp/render
- [GitHub - kwasniew/hyperapp2-real-world-example: https://hyperapp2.netlify.com/](https://github.com/kwasniew/hyperapp2-real-world-example)

oncreate … Element が DOM として構築されたとき
onupdate … Element の要素が更新されたとき
onremove … Element が DOM から消える直前
ondestroy … Element が DOM から消える直後

```
const SuccessResponse = (state, response) => ({
  ...state,
  response,
  error: null,
  fetching: false
});

const ErrorResponse = (state, error) => ({
  ...state,
  response: null,
  error,
  fetching: false
});

const SendHttp = state => [
  { ...state, response: "...", error: null, fetching: true },
  Http({
    url: state.url,
    response: "text",
    action: SuccessResponse,
    error: ErrorResponse
  })
];

// ---

/* eslint-disable */

const fx = (argsToProps, fx) => (...args) => [fx, argsToProps(args)];

export const pushUrl = fx(
  ([url]) => ({ url }),
  (_, { url }) => {
    history.pushState({}, "", url);
    dispatchEvent(new CustomEvent("hyperapp-pushstate"));
  }
);

export const onUrlChange = fx(
  ([action]) => ({ action }),
  (dispatch, { action }) => {
    const popstate = (_) => dispatch(action, location);

    addEventListener("popstate", popstate);
    addEventListener("hyperapp-pushstate", popstate);

    return () =>
      ["popstate", "hyperapp-pushstate"].map((e) =>
        removeEventListener(e, popstate)
      );
  }
);

export const onUrlRequest = fx(
  ([action]) => ({ action }),
  (dispatch, { action }) => {
    const clicks = (event) => {
      if (
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey &&
        event.target.matches("a")
      ) {
        event.preventDefault();
        const href = event.target.getAttribute("href");
        dispatch(action, { pathname: href });
      }
    };
    addEventListener("click", clicks);
    return () => addEventListener("click", clicks);
  }
);

```

```
  subscriptions: state => [
    tick(...),
    foo(...),
  ],


// 指定した時間後に指定したActionを呼び出すEffect Runner
const delayRunner = (dispatch, { action, interval }) => {
  setTimeout(() => dispatch(action, "delay!"), interval);
};

// delayRunnerを実行するEffectを作成するEffect Constructor
const delay = (action, { interval }) => [delayRunner, { action, interval }];

// delayから呼び出されるAction （最終的にtextへ'delay!'が設定される）
const Delayed = (state, payload) => ({ ...state, text: payload });

// Effectのdelayを呼び出すAction （1000ms後にDelaydを呼び出す）
const DelayWithAction = (state) => [state, delay(Delayed, { interval: 1000 })];

```
