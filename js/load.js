'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var offerList = xhr.response;
    var OFFERS_NUMBER = offerList.length;
    window.offerList = offerList;
    window.OFFERS_NUMBER = OFFERS_NUMBER;
  });
  xhr.open('GEt', 'https://js.dump.academy/keksobooking/data');
  xhr.send();
})();
