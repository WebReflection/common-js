// exports can be either synchronous
module.exports = function (message) {
  alert(message);
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
