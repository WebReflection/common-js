// exports can be either synchronous
module.exports = function (message) {
  for (var
    line = message.split(/\n/g),
    i = 0; i < line.length; i++
  ) {
    document.body.appendChild(
      document.createElement('p')
    ).textContent = line[i];
  }
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
