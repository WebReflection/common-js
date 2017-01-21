const crypto = require('crypto');
module.exports = {
  sha256: (str, secret = '') =>
    crypto.createHmac('sha256', secret)
          .update(str)
          .digest('hex')
};
