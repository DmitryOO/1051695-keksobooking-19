'use strict';

(window.load = function () {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var offerList = xhr.response;
    window.offerList = offerList;
    window.offerList.length = offerList.length;
  });
  xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
  xhr.send();
})();
