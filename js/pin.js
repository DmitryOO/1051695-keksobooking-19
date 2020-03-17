'use strict';

(function () {
  var addPins = function () {
    var DELTA_LOCATION_X = -25;
    var DELTA_LOCATION_Y = 50;
    var mapPins = document.querySelector('.map__pins');
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.offerList.length; i++) {
      var pin = pinTemplate.cloneNode(true);
      var pinImage = pin.querySelector('img');
      pin.dataset.pinType = window.offerList[i].offer.type;
      pin.dataset.cardId = i;
      pinImage.src = window.offerList[i].author.avatar;
      pinImage.alt = window.offerList[i].offer.title;
      pin.style.left = window.offerList[i].location.x + DELTA_LOCATION_X + 'px';
      pin.style.top = window.offerList[i].location.y + DELTA_LOCATION_Y + 'px';
      fragment.appendChild(pin);
    }
    mapPins.appendChild(fragment);
  };
  window.addPins = addPins;
})();
