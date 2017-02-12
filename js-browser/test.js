module.exports = module.import('../root.js').then(function () {
  return function (message) {
    for (var
      line = message.split(/\n/g),
      i = 0; i < line.length; i++
    ) {
      document.body.appendChild(
        document.createElement('p')
      ).textContent = line[i];
    }
  };
});