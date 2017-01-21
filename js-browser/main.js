module.import('./test').then(function (test) {
  test('Hello CommonJS!\nfrom ' + __filename);
});

// sync example
// require('./test')('Hello CommonJS!\nfrom ' + __filename);