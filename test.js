require('./common');
var called = false;
console.log = function (message) {
  called = true;
  console.assert('Hello CommonJS!' === message, 'right message');
};
module.import('./js-node/main').then(function () {
  setTimeout(function() {
    console.assert(called, 'executed');
  }, 200);
});