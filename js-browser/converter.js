// asynchronous converter.js
module.exports = module.import('./crypto')
.then(function (crypto) {
  // return the module to export
  return {
    sha256: function (str, secret = '') {
      return crypto.createHmac('sha256', secret)
             .update(str)
             .digest('hex');
    }
  };
});