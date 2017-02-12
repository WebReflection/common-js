/*! (C) 2017 Andrea Giammarchi */
if (typeof module === 'object') {
  'import' in module || (module.constructor.prototype.import = function (path) {
    var self = this;
    return Promise.resolve().then(function () {
      return self.require(path);
    });
  });
} else {
  (function CommonJS(info, el) {
    var
      protoPath = /^(?:[a-z]+:)?\/\//,
      npmPath = /^[a-zA-Z_-]/,
      __filename = info._ || el.getAttribute('data-main').replace(npmPath, './$&'),
      normalize = function (url) {
        if (protoPath.test(url)) return url;
        if (npmPath.test(url)) return gModule._path(url);
        for (var
          path = __filename.slice(0, __filename.lastIndexOf('/')),
          length = url.length,
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
      onload = function (xhr, path, resolve) {
        var
          html = document.documentElement,
          script = document.createElement('script')
        ;
        script.setAttribute('nonce', gModule._nonce);
        script.textContent = 'module.$(function(){' +
          'var module=' + gModule._cjs + '(arguments[0]),' +
          '__filename=module.filename,' +
          '__dirname=__filename.slice(0,__filename.lastIndexOf("/")),' +
          'require=module.require,' +
          'exports=module.exports;(function(){"use strict";\n' +
            xhr.responseText +
          ';\n}.call(exports));return module.exports;' +
        '}(module));';
        gModule._ = path;
        gModule.$ = function (exports) {
          resolve(gModule._cache[path] = exports);
        };
        // cleanup after, no matter what
        setTimeout(function () { html.removeChild(script); },1);
        // execute the script (synchronously)
        html.appendChild(script);
      },
      error = function (path, xhr) {
        throw (gModule._cache[path] = new Error(xhr.statusText));
      },
      load = function (path) {
        var
          remote = path,
          m = /^((?:[a-z]+?:\/\/)?[^/]+)\/([^@]+)@latest(\/.*)?$/.exec(path),
          resolve = function (exports) { module = exports; },
          xhr = new XMLHttpRequest(),
          module
        ;
        if (m) {
          // hopefully soon ...
          // xhr.open('GET', 'https://registry.npmjs.org/' + m[2] + '/latest', false);
          // meanwhile ... 
          xhr.open('GET', 'http://www.3site.eu/latest/?@=' + m[2], false);
          xhr.send(null);
          if (xhr.status < 400) module = JSON.parse(xhr.responseText);
          else return error(path, xhr);
          remote = m[1] + '/' + m[2] + '@' + module.version + (m[3] || '');
        }
        xhr = new XMLHttpRequest();
        xhr.open('GET', remote, false);
        xhr.send(module = null);
        if (xhr.status < 400) onload(xhr, path, resolve);
        else error(path, xhr);
        return module;
      },
      exports = {},
      module = {
        filename: __filename,
        exports: exports,
        require: function (url) {
          var path = normalize(url);
          return gModule._cache[path] || load(path);
        },
        import: function (url) {
          var path = normalize(url);
          return Promise.resolve(
            gModule._cache[path] ||
            (gModule._cache[path] = new Promise(
              function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', path, true);
                xhr.onreadystatechange = function () {
                  if (xhr.readyState == 4) {
                    if (xhr.status < 400) onload(xhr, path, resolve);
                    else reject(new Error(xhr.statusText));
                  }
                };
                xhr.send(null);
              }
            ))
          );
        }
      },
      gModule = window.module || module
    ;
    if (gModule === module) {
      window.global = window;
      window.module = module;
      window.process = {browser: true};
      module._cache = Object.create(null);
      module._nonce = el.getAttribute('nonce');
      module._cjs = '' + CommonJS;
      module._path = function (url) {
        var i = url.indexOf('/'), length = url.length;
        return 'https://unpkg.com/' + url.slice(0, i < 0 ? length : i) +
               '@latest' + (i < 0 ? '' : url.slice(i));
      };
      module.import('./' + __filename.split('/').pop());
    }
    return module;
  }({_:''}, document.getElementById('common-js')));
}