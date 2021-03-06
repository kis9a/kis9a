### Class

```
class クラス名 {
    プロパティ名： プロパティのデータ型

    constructor(コンストラクタの引数: コンストラクタの引数のデータ型){
        ...
    }

    関数(引数: 引数のデータ型): 返り値のデータ型 {
        ...
    }

}
```

### アクセス修飾子

public：クラスの外からアクセス可（デフォルト）
protected：同じクラスのメンバー、派生クラス(継承先のクラス)のメンバーからのみアクセス可
private：同じクラスからのみアクセス可

### getter, setter

```
//getter
get プロパティ名(): 返り値のデータ型 {
    return this.プライベートプロパティ名
}
//setter
set プロパティ名(引数: プロパティのデータ型){
    this.プライベートプロパティ名 = 引数;
}
```

### static

static は
・インスタンスを生成しなくても静的メソッドを実行できる。
・親クラスから派生したインスタンスがプロパティを共有できる。

### 継承

```
class クラス名 extends 継承元クラス名 {
    ...
}
```
