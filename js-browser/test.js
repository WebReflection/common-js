// exports can be either synchronous
module.exports = function (message) {
  message.split(/\n/g).forEach((text) => {
    document.body.appendChild(
      document.createElement('p')
    ).textContent = text;
  })
};

// or even asynchronous
/*
module.exports = new Promise(function (resolve) {
  setTimeout(
    resolve,
    1000,
    function (message) {
      alert(message + '\nfrom ' + module.filename);
    }
  );
});
*/
