module.import('./test').then(function (test) {
  document.documentElement.style.fontFamily = 'sans-serif';
  test('Asynchronous CommonJS!\nfrom ' + __filename);
  require('./test')('... but Synchronous too ...');
});

// sync example
// require('./test')('Hello CommonJS!\nfrom ' + __filename);

// multiple imports
Promise.all([
  // local module
  module.import('./converter'),
  // looks automatically through unpkg.cdn directly
  // will be loaded remotely
  module.import('classtrophobic-es5')
])
.then(function (modules) {
  var
    converter = modules[0],
    Class = modules[1],
    result = [
      converter.sha256('yolo'),
      typeof Class === 'function'
    ].join('\n')
  ;
  if (typeof console !== 'undefined') console.log(result);
  else alert(result);
});
