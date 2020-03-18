'use strict';

(function () {
  var PIN_MAIN_CENTER_X = 32;
  var PIN_MAIN_CENTER_Y = 32;
  var PIN_MAIN_BOTTOM_Y = 70;
  var MAX_PINS_SHOWN = 5;
  var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
  var mapFiltersSelects = document.querySelectorAll('.map__filters select');
  var mapPinMain = document.querySelector('.map__pin--main');

  var makeAvailable = function () {
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
    document.querySelector('#address').value = (mapPinMain.offsetLeft + PIN_MAIN_CENTER_X) + ', '
  + (mapPinMain.offsetTop + PIN_MAIN_BOTTOM_Y);
  };
  var showAdressMapFaded = function () {
    document.querySelector('#address').value = (mapPinMain.offsetLeft + PIN_MAIN_CENTER_X) + ', '
  + (mapPinMain.offsetTop + PIN_MAIN_CENTER_Y);
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

  var init = function () {
    window.load(function () {
      window.addPins();
      var pins = Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)'));
      var selectHousingType = document.querySelector('#housing-type');
      var getVisiblePins = function () {
        var visiblePins = [];
        for (var i = 0; i < pins.length; i++) {
          if (pins[i].style.display !== 'none') {
            visiblePins.push(pins[i]);
          }
        }
        return visiblePins;
      };
      var reducePins = function () {
        var visiblePins = getVisiblePins();
        var len = Math.min(MAX_PINS_SHOWN, visiblePins.length);
        var i;
        for (i = 0; i < visiblePins.length; i++) {
          visiblePins[i].style.display = 'none';
        }
        for (i = 0; i < len; i++) {
          visiblePins[i].style.display = 'block';
        }
      };
      reducePins();
      selectHousingType.addEventListener('change', function () {
        pins.forEach(function (pin, i) {
          var type = window.offerList[i].offer.type;
          pin.style.display = 'none';
          if (selectHousingType.value === 'house' && type === 'house') {
            pin.style.display = 'block';
          }
          if (selectHousingType.value === 'flat' && type === 'flat') {
            pin.style.display = 'block';
          }
          if (selectHousingType.value === 'bungalo' && type === 'bungalo') {
            pin.style.display = 'block';
          }
          if (selectHousingType.value === 'palace' && type === 'palace') {
            pin.style.display = 'block';
          }
          if (selectHousingType.value === 'any') {
            pin.style.display = 'block';
          }
          reducePins();
          document.querySelectorAll('.map__card').forEach(function (card) {
            card.style.display = 'none';
          });
        });
      });
    });
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.constants.LEFT_MOUSE_BUTTON && document.querySelector('.map--faded') !== null) {
      showAdress();
      makeAvailable();
      init();
    }
  });
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ENTER_BUTTON && document.querySelector('.map--faded') !== null) {
      showAdress();
      makeAvailable();
      init();
    }
  });
  var createCards = function () {
    var cards = [];
    for (var i = 0; i < window.offerList.length; i++) {
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
      if (evt.key === window.constants.ESCAPE_BUTTON) {
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
    showAdress: showAdress,
    disableElements: disableElements,
    showAdressMapFaded: showAdressMapFaded
  };
})();
