- ES6 Modules
  ECMAScript (ES6) modules have been supported in Node.js since v8.5, with the --experimental-modules flag, and since at least Node.js v13.8.0 without the flag. To enable "ESM" (vs. Node.js's previous CommonJS-style module system ["CJS"]) you either use "type": "module" in package.json or give the files the extension .mjs. (Similarly, modules written with Node.js's previous CJS module can be named .cjs if your default is ESM.)

- ECMAScript modules in browsers
  Browsers have had support for loading ECMAScript modules directly (no tools like Webpack required) since Safari 10.1, Chrome 61, Firefox 60, and Edge 16. Check the current support at caniuse. There is no need to use Node.js' .mjs extension; browsers completely ignore file extensions on modules/scripts.

- Node.js require
  The older CJS module style, still widely used in Node.js, is the module.exports/require system.

- In node, you can load a module using node --experimental-modules file.mjs. Note that node requires the .mjs extension unless you have configured "type": "module" in your package.json file. You can use the out extension setting in esbuild to customize the output extension for the files esbuild generates. You can read more about using ECMAScript modules in node here.


```
const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

```
