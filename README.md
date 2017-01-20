# CommonJS + module.import()

This module aim is to bring both CommonJS like module behavior on Web browsers,
and a promise based `module.import(path)` to both browsers and NodeJS.

<sub>Yes, it resolves paths relatively to the current one!<sub>



### Browser Example
```html
<!doctype html>
<html>
  <script
    id="common-js"
    data-main="/js-browser/main.js"
    src="common.js"
  ></script>
</html>
```

Having a single top level script is all it takes to be able to load asynchronously any other file or module.

The main entry point `/js-browser/main.js` will resolve relative paths from `/js-browser/` folder.

Its loaded modules will resolve their own paths from where they've been loaded, and so on.
The same goes for NodeJS.

```js
// /js-browser/main.js loading /js-browser/test.js
module.import('./test').then(function (test) {
  test('Hello CommonJS!');
  // will output:
  // Hello CommonJS!
  // from /js-browser/test.js
});

// the /js-browser/test.js content
module.exports = function (message) {
  alert(message + '\nfrom ' + module.filename);
};
```



### Load multiple modules at once
```js
Promise.all([
  module.import('./a'),
  module.import('//cdn.something.com/cool.js'),
  module.import('../sw.js'),
  module.import('/root/too.js')
]).then(function (modules) {
  const [a, cool, sw, too] = modules;
});
```



### F.A.Q

  * **Does it load every time?**
    It uses a cache, like NodeJS does. If you load same module twice, even from different relative paths, it'll use the cached one.
  * **Why on the module?**
    There are scripts, script type module, `importScripts`, a [dynamic import proposal](https://github.com/tc39/proposal-dynamic-import#import), you name it ... this one actually works and it's backward compatible with modules that don't care about this solution existing.
  * **Why not ES2015 modules?**
    Because those, so far, never truly solved anything. Actually, ES6 modules created more problems due inability to require modules at runtime and/or on the browser.
  * **Is there a CDN I can use to test?**
    There is always one for npm modules. [https://unpkg.com/common-js@latest](https://unpkg.com/common-js@latest) would do.
  * **Is this using eval?**
    No, it's using `Function`, which is not the same, and it does exactly what a script loading your code would do. Actually, it does something more. It makes the module run on strict by default and it avoids global scope pollution, like a proper module system.



### License
Copyright (C) 2017 by Andrea Giammarchi - @WebReflection