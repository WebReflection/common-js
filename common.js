/*! (C) 2017 by Andrea Giammarchi */
if (typeof module === 'object') {
  module.constructor.prototype.import = function (path) {
    var self = this;
    return new Promise(function (resolve) {
      resolve(self.require(path));
    });
  };
} else {
  (function CommonJS(info, el) {
    var
      remotePath = /^[a-zA-Z_-]/,
      __filename = info._ || el.getAttribute('data-main').replace(remotePath, './$&'),
      normalize = function (url) {
        if (remotePath.test(url)) {
          i = url.indexOf('/');
          length = url.length;
          url = 'https://unpkg.com/' + url.slice(0, i < 0 ? length : i) +
                '@latest' + (i < 0 ? '' : url.slice(i));
        }
        for (var
          abs = /^(?:[a-z]+:)?\/\//.test(url),
          path = abs ? url : __filename.slice(0, __filename.lastIndexOf('/')),
          length = abs ? 0 : url.length,
          c, i = 0, p = 0; i < length; p = i + 1
        ) {
          i = url.indexOf('/', p);
          if (i < 0) {
            i = length;
            path += '/' + url.slice(p);
            if (!/\.js$/i.test(path)) path += '.js';
          } else if (i === 0) {
            path = '';
          } else {
            c = p; p = i;
            while (p && url.charAt(p - 1) === '.') --p;
            switch (i - p) {
              case 0: path += '/' + url.slice(c, i); break;
              case 1: break;
              case 2: path = path.slice(0, path.lastIndexOf('/')); break;
            }
          }
        }
        return path;
      },
      onload = function () {
        var
          path = this._,
          resolve = this.$,
          html = document.documentElement,
          script = document.createElement('script')
        ;
        script.setAttribute('nonce', window.module._nonce);
        script.textContent = 'module.$(function(){' +
          'var module=' + CommonJS + '(arguments[0]),' +
          '__filename=module.filename,' +
          '__dirname=__filename.slice(0,__filename.lastIndexOf("/")),' +
          'require=module.require,' +
          'exports=module.exports;(function(){"use strict";' +
            this.responseText +
          ';\n}.call(exports));return module.exports;'
        + '}(module));';
        window.module._ = path;
        window.module.$ = function (exports) {
          resolve(window.module._cache[path] = exports);
        };
        // cleanup after, no matter what
        setTimeout(function () { html.removeChild(script); },1);
        // execute the script (synchronously)
        html.appendChild(script);
      },
      load = function (path) {
        var xhr = new XMLHttpRequest(), module;
        xhr.open('GET', path, false);
        xhr._ = path;
        xhr.$ = function (exports) { module = exports; };
        xhr.send(null);
        onload.call(xhr);
        return module;
      },
      exports = {},
      module = {
        filename: __filename,
        exports: exports,
        require: function (url) {
          var path = normalize(url);
          return window.module._cache[path] || load(path);
        },
        import: function (url) {
          var path = normalize(url);
          return Promise.resolve(
            window.module._cache[path] ||
            (window.module._cache[path] = new Promise(
              function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', path, true);
                xhr._ = path;
                xhr.$ = resolve;
                xhr.onerror = reject;
                xhr.onload = onload;
                xhr.send(null);
              }
            ))
          );
        }
      }
    ;
    if (!window.module) {
      window.global = window;
      window.module = module;
      module._cache = Object.create(null);
      module._nonce = el.getAttribute('nonce');
      module.import('./' + __filename.split('/').pop());
    }
    return module;
  }({_:null}, document.getElementById('common-js')));
}