'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var offerList = xhr.response;
      window.offerList = offerList.filter(function (record) {
        return record.offer !== null;
      });
      onSuccess();
    });
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  window.load = load;
})();
