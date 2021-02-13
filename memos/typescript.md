- [なぜ enum の利用が推奨されないのか？](https://qiita.com/saba_can00/items/696baa5337eb10c37342)

1. 値に数値をマッピングした場合に意図しない数値でアクセスする記述ができてしまう
2. 利用していない enum の値があっても Tree-shaking がうまく働かずバンドルされてしまう
3. アンビエントコンテキストにおける const enum の使用はコンパイルエラーになることがある

- [TypeScript 2.1 の keyof とか Mapped types](https://qiita.com/Quramy/items/e27a7756170d06bef22a)
- [TypeScript tips zenn](https://zenn.dev/tak_iwamoto/articles/d367f989eb4a33)

- [TypeScript の static アクセス修飾子](https://qiita.com/M-ISO/items/7120db767cd539f1c58a)
- [TypeScript アクセス修飾子](https://qiita.com/a12345/items/384bff6aaeba288ad7f2)
  <!-- acesss {{{-->
  public クラス外からのアクセス可能。

private クラス内でのみアクセス可能。

protected 継承クラス内でのみアクセス可能。

static 静的なのでクラスで共有。

```ts
//スーパークラス定義
class Super {
  constructor() {
    this.public(); //true
    this.private(); //true
    this.protected(); //true
    this.static(); //コンパイルエラー
  }
  public public(): boolean {
    return true;
  }
  private private(): boolean {
    return true;
  }
  protected protected(): boolean {
    return true;
  }
  static static(): boolean {
    return true;
  }
}

//サブクラス定義
class Sub extends Super {
  constructor() {
    super();
    this.public(); //true
    this.private(); //コンパイルエラー
    this.protected(); //true
    this.static(); //コンパイルエラー
  }
}
```

//インスタンス
let test = new Sub();
test.public(); //true
test.private(); //コンパイルエラー
test.protected(); //コンパイルエラー
test.static(); //コンパイルエラー

//クラス静的メンバ
Sub.public(); //コンパイルエラー
Sub.private(); //コンパイルエラー
Sub.protected(); //コンパイルエラー
Sub.static(); //true

<!--}}}-->

- [TypeScript の union 型は or](https://qiita.com/uhyo/items/b1f806531895cb2e7d9a)
- [TypeScript の Interface と Type の比較](https://qiita.com/tkrkt/items/d01b96363e58a7df830e)

<!-- interface or type {{{-->

Interface Type
用途 クラスやオブジェクトの規格を定義 型や型の組み合わせに別名を付ける
継承 可能 交差型で同じことができる
同名要素の宣言 マージされる エラー
Class への implement 可能 可能
交差型、共用体型、タプル型 不可能 可能
Mapped Types 不可能 可能
規定しないプロパティの扱い 他にもプロパティが存在しうるものとして扱う 存在しないものとして扱う

<!--}}}-->

enum or union<!--{{{-->
union

const Commands = {
Add: "add new task",
Complete: "select completed",
Toggle: "toggle show completed",
Clean: "remove completed",
Quit: "quit interactive mode",
} as const

type typeCommands = typeof objCommands[keyof typeof objCommands]

<!--}}}-->

enum or union<!--{{{-->
// Disposable Mixin
class Disposable {
isDisposed: boolean;
dispose() {
this.isDisposed = true;
}

}

// Activatable Mixin
class Activatable {
isActive: boolean;
activate() {
this.isActive = true;
}
deactivate() {
this.isActive = false;
}
}

class SmartObject implements Disposable, Activatable {
constructor() {
setInterval(() => console.log(this.isActive + " : " + this.isDisposed), 500);
}

    interact() {
        this.activate();
    }

    // Disposable
    isDisposed: boolean = false;
    dispose: () => void;
    // Activatable
    isActive: boolean = false;
    activate: () => void;
    deactivate: () => void;

}
applyMixins(SmartObject, [Disposable, Activatable]);

let smartObj = new SmartObject();
setTimeout(() => smartObj.interact(), 1000);
function applyMixins(derivedCtor: any, baseCtors: any[]) {
baseCtors.forEach(baseCtor => {
Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
derivedCtor.prototype[name] = baseCtor.prototype[name];
});
});
}

<!--}}}-->

[ ./type-challenge.md ]
