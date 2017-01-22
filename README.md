# CommonJS + module.import() [![build status](https://secure.travis-ci.org/WebReflection/common-js.svg)](http://travis-ci.org/WebReflection/common-js)

This module aim is to bring both CommonJS like module behavior on Web browsers,
and a promise based `module.import(path)` to both browsers and NodeJS.

<sub>Yes, it resolves paths relatively to the current one!<sub>

<sub>Yes, it is secure too, check the [CSP enabled page](https://webreflection.github.io/common-js/csp.html)!<sub>

Don't miss [the introductory blog post](https://medium.com/@WebReflection/asynchronous-module-import-path-b9f56675e109#.8nsdv9571) about this idea!


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

Having a single script with `id="common-js"` is all it takes to be able to load asynchronously any other file or module.

The main entry point `/js-browser/main.js` will resolve relative paths from `/js-browser/` folder.

Its loaded modules will resolve their own imported paths from where they've been loaded, and so on.
The same goes for NodeJS, it's indeed same logic behind `require`.

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


### Exporting modules asynchronously
```js
// an async example of /js-browser/test.js content
// for the /js-browser/main.js file nothing changes
module.exports = new Promise(function (resolve) {
  setTimeout(
    resolve,
    1000,
    function (message) {
      alert(message + '\nfrom ' + module.filename);
    }
  );
});
```



### Compatibility
You can test your target directly through the [live test page](https://webreflection.github.io/common-js/).
What I could test was the following:

**Mobile** Android 2+, iOS5+, WP7+, BBOS7+, FFOS1+, WebOS2+, Kindle Paper & Fire

**Desktop** Chrome, FF, Safari, Opera, IE9+ (theoretically IE8 too but it needs few polyfills upfront)




### What else?
The synchronous `require` and both `__filename` and `__dirname` are also exposed, but nothing else from NodeJS core is available.
You are responsible for loading all the modules you need, possibly only when you need them.



### F.A.Q

  * **Does it load every time?**
    It uses a cache, like NodeJS does. If you load same module twice, even from different relative paths, it'll use the cached one.
  * **Why on the module?**
    There are scripts, script type module, `importScripts`, a [dynamic import proposal](https://github.com/tc39/proposal-dynamic-import#import), you name it ... this one actually works and it's backward compatible with modules that don't care about this solution existing.
  * **Why not ES2015 modules?**
    Because those, so far, never truly solved anything. Actually, ES6 modules created more problems due inability to require modules at runtime and/or on the browser.
  * **Is there a CDN I can use to test?**
    There is always one for npm modules. [https://unpkg.com/common-js@latest](https://unpkg.com/common-js@latest/common.min.js) should be already OK.
  * **Is this using eval?**
    No. It's using a technique that is even compatible with highest security standards such [Content Security Policy](https://w3c.github.io/webappsec-csp/)



### License
Copyright (C) 2017 by Andrea Giammarchi - @WebReflection