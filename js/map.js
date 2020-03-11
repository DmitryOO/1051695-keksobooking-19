'use strict';

(function () {
  var PIN_MAIN_CENTER_X = 32;
  var PIN_MAIN_CENTER_Y = 32;
  var PIN_MAIN_BOTTOM_Y = 70;
  var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
  var mapFiltersSelects = document.querySelectorAll('.map__filters select');
  var mapPinMain = document.querySelector('.map__pin--main');

  var makeAvailable = function () {
    window.addPins();
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].removeAttribute('disabled');
    }
    for (i = 0; i < mapFiltersSelects.length; i++) {
      mapFiltersSelects[i].removeAttribute('disabled');
    }
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  };
  var showAdress = function () {
    document.querySelector('#address').value = (mapPinMain.style.left.substring(0, mapPinMain.style.left.length - 2) / 1 + PIN_MAIN_CENTER_X) + ', '
  + (mapPinMain.style.top.substring(0, mapPinMain.style.left.length - 2) / 1 + PIN_MAIN_BOTTOM_Y);
  };
  var showAdressMapFaded = function () {
    document.querySelector('#address').value = (mapPinMain.style.left.substring(0, mapPinMain.style.left.length - 2) / 1 + PIN_MAIN_CENTER_X) + ', '
  + (mapPinMain.style.top.substring(0, mapPinMain.style.left.length - 2) / 1 + PIN_MAIN_CENTER_Y);
  };
  var disableElements = function () {
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].setAttribute('disabled', 'disabled');
    }
    for (i = 0; i < mapFiltersSelects.length; i++) {
      mapFiltersSelects[i].setAttribute('disabled', 'disabled');
    }
    document.querySelector('.map__filters fieldset').setAttribute('disabled', 'disabled');
  };


  disableElements();
  showAdressMapFaded();

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.LEFT_MOUSE_BUTTON && document.querySelector('.map--faded') !== null) {
      showAdress();
      makeAvailable();
    }
  });
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.ENTER_BUTTON && document.querySelector('.map--faded') !== null) {
      showAdress();
      makeAvailable();
    }
  });
  var createCards = function () {
    var cards = [];
    for (var i = 0; i < window.OFFERS_NUMBER; i++) {
      cards [i] = window.createCard(i);
    }
  };


  var cardOpen = function (cardNumber) {
    createCards();

    var mapCards = document.querySelectorAll('.map__card');
    for (var i = 0; i < mapCards.length; i++) {
      mapCards[i].style.display = 'none';
    }
    mapCards[cardNumber].style.display = 'block';
    var closeButton = mapCards[cardNumber].querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      mapCards[cardNumber].style.display = 'none';
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.ESCAPE_BUTTON) {
        mapCards[cardNumber].style.display = 'none';
      }
    });
  };


  var mapPins = document.querySelector('.map__pins');

  mapPins.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.type === 'button' || target.parentNode.type === 'button') {
      var button = target.type === 'button' ? target : target.parentNode;
      cardOpen(button.dataset.cardId);
    }
  });
  window.map = {
    mapPinMain: mapPinMain,
    showAdress: showAdress
  };
})();
