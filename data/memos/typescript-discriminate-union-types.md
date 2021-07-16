### Discriminated Union

```typescript
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape = Square | Rectangle;

function area(s: Shape) {
  if (s.kind === "square") {
    // Now TypeScript *knows* that `s` must be a square ;)
    // So you can use its members safely :)
    return s.size * s.size;
  } else {
    // Wasn't a square? So TypeScript will figure out that it must be a Rectangle ;)
    // So you can use its members safely :)
    return s.width * s.height;
  }
}
```

### Exhaustive Checks

if added new type case ?

```typescript
function area(s: Shape) {
  if (s.kind === "square") {
    return s.size * s.size;
  } else if (s.kind === "rectangle") {
    return s.width * s.height;
  } else if (s.kind === "circle") {
    return Math.PI * s.radius ** 2;
  } else {
    const _exhaustiveCheck: never = s;
  }
}
```

use switch

```typescript
function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.width * s.height;
    case "circle":
      return Math.PI * s.radius * s.radius;
    default:
      const _exhaustiveCheck: never = s;
  }
}
```

### User definition Type Guard

cant use typeof / instanceof

```typescript
/**
 * Just some interfaces
 */
interface Foo {
  foo: number;
  common: string;
}

interface Bar {
  bar: number;
  common: string;
}

/**
 * User Defined Type Guard!
 */
function isFoo(arg: any): arg is Foo {
  return arg.foo !== undefined;
}

/**
 * Sample usage of the User Defined Type Guard
 */
function doStuff(arg: Foo | Bar) {
  if (isFoo(arg)) {
    console.log(arg.foo); // OK
    console.log(arg.bar); // Error!
  } else {
    console.log(arg.foo); // Error!
    console.log(arg.bar); // OK
  }
}

doStuff({ foo: 123, common: "123" });
doStuff({ bar: 123, common: "123" });
```

