### Conditional types<!--{{{-->

```ts
T extends U ? X : Y
```

### Generics

```ts
interface Something<T> {
  id: number;
  flag: T;
}
```

Generics は型をプレースホルダのように扱う仕組みです。
<T> のように型エイリアスを指定します。
<!--}}}-->

### lib.es5.d.ts<!--{{{-->

```ts
interface ArrayLike<T> {
    readonly length: number;
    readonly [n: number]: T;
}

/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};

/**
 * Make all properties in T required
 */
type Required<T> = {
    [P in keyof T]-?: T[P];
};

/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
    [P in K]: T;
};

/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;

/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;

/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;

/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;

/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic;

/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic;


```

<!--}}}-->

## [TypeScript2.8 Conditional Types 活用事例 - Qiita](https://qiita.com/Takepepe/items/a8637d30375374fe8c57){{{

### Conditional Types

```ts
type A1<T> = T extends (a1: infer I, ...rest: any[]) => any ? I : never;
type A2<T> = T extends (a1: any, a2: infer I, ...rest: any[]) => any
  ? I
  : never;
type MT<T> = (state: A1<T>) => A1<T>;
type MTPL<T> = (state: A1<T>, payload: A2<T>) => A1<T>;
type CR<T> = () => { type: string };
type CRPL<T> = (payload: A2<T>) => { type: string; payload: A2<T> };
type Mutation<T> = MT<T> | MTPL<T>;
type Creator<T> = T extends MT<T> ? CR<T> : CRPL<T>;
```

<!--}}}-->

## [実務で使用することが多い TypeScript の型まとめ - Qiita](https://qiita.com/r_ueyama/items/bb693fb012fd3605cd00){{{

### Extract Union 型から特定の型を抽出する際

```ts
type Extract<T, U> = T extends U ? T : never;

type Color = "red" | "blue" | "yellow" | "black" | "white";
type ButtonColor = Extract<Color, "red" | "yellow">;
// type ButtonColor = 'red' | 'yellow'
```

### Exclude Union Types から特定の型を取り除く際

```ts
type Exclude<T, U> = T extends U ? never : T;

type Color = "red" | "blue" | "yellow" | "black" | "white";
type ButtonColor = Extract<Color, "red" | "yellow">;
// type ButtonColor = 'blue' | 'black' | 'white';
```

### keyof

```ts
type Person = {
  name: string;
  age: number;
  location: string;
};

type K1 = keyof Person;
// "name" | "age" | "location"
```

### React ComponentProps

### Mapped Types

```ts
{[P in K]: T}
ここで、P は識別子、K は文字列に代入可能でなければならない型です。
そして T は K に対する値の型になります。
Mapped Typesを使用することでスマートに型定義が可能になります。
```

<!--}}}-->

[公式ドキュメントを読んでもinferが理解できない人のためのinferの説明 - Qiita](https://qiita.com/ringtail003/items/733aff32ddad7d4fda90){{{
```ts
type Code<T> = T extends { code: infer U } ? U : never;

// <T> に Book,Ticket を付与した時に Code<T> が決定する
// Code<Book> = T extends { code: infer number } ? number : never --> number
// Code<Ticket> = T extends { code: infer string } ? string : never --> string

// ---> Code<T> は number | string と同じ
```
<!--}}}-->
