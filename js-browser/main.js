module.import('./test').then(function (test) {
  test('Asynchronous CommonJS!\nfrom ' + __filename);
  require('./test')('... but Synchronous too ...');
});

// sync example
// require('./test')('Hello CommonJS!\nfrom ' + __filename);
