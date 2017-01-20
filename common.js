if (typeof module === 'object') {
  module.constructor.prototype.import = function (path) {
    var self = this;
    return new Promise(function (resolve) {
      resolve(self.require(path));
    });
  };
} else {
  (function CommonJS(filename) {
    var
      exports = {},
      module = {
        filename: filename,
        exports: exports,
        import: function (url) {
          for (var
            abs = /^(?:[a-z]+:)?\/\//.test(url),
            path = abs ? url : filename.slice(0, filename.lastIndexOf('/')),
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
          return window.module._cache[path] ||
            (window.module._cache[path] = new Promise(
            function (resolve, reject) {
              var xhr = new XMLHttpRequest();
              xhr.open('GET', path, true);
              xhr.onerror = reject;
              xhr.onload = function () {
                resolve(Function(
                  'var module=' + CommonJS + '(arguments[0]),' +
                  'exports=module.exports;(function(){"use strict";' +
                    xhr.responseText +
                  '}.call(exports));return module.exports;'
                )(path));
              };
              xhr.send(null);
            }))
        }
      }
    ;
    if (!window.module) {
      window.module = module;
      module._cache = Object.create(null);
      module.import(filename);
    }
    return module;
  }(document.getElementById('common-js').getAttribute('data-main')));
}