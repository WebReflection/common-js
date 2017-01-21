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
  './converter',
  // looks automatically through unpkg.cdn directly
  // will be loaded remotely
  'classtrophobic'
].map(m => module.import(m)))
.then((modules) => {
  const [converter, Class] = modules;
  console.log(converter.sha256('yolo'));
  console.log(typeof Class === 'function');
});
