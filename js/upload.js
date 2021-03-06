'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_STATUS = 200;
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
