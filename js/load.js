'use strict';

(function () {
  var load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var offerList = xhr.response;
      window.offerList = offerList.filter(function (record) {
        return record.offer !== null;
      });
      window.offerList.length = offerList.length;
      onSuccess();
    });
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  window.load = load;
})();
