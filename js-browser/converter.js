// asynchronous converter.js
module.exports = module.import('./crypto')
.then((crypto) => {
  // return the module to export
  return {
    sha256:(str, secret = '') =>
      crypto.createHmac('sha256', secret)
            .update(str)
            .digest('hex')
  };
});