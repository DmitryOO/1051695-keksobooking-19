'use strict';

(function () {
  var PIN_MAIN_CENTER_X = 32;
  var PIN_MAIN_CENTER_Y = 32;
  var PIN_MAIN_BOTTOM_Y = 70;
  var MAX_PINS_SHOWN = 5;
  var TIME_OUT = 500;
  var AVERAGE_PRICE_MIN = 10000;
  var AVARAGE_PRICE_MAX = 50000;
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
    document.querySelector('#housing-features').removeAttribute('disabled');
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
      var selectionHousingType = document.querySelector('#housing-type');
      var selectionHousingPrice = document.querySelector('#housing-price');
      var selectionHousingRooms = document.querySelector('#housing-rooms');
      var selectionHousingGuests = document.querySelector('#housing-guests');
      var filterWifi = document.querySelector('#filter-wifi');
      var filterDishwasher = document.querySelector('#filter-dishwasher');
      var filterParking = document.querySelector('#filter-parking');
      var filterWasher = document.querySelector('#filter-washer');
      var filterConditioner = document.querySelector('#filter-conditioner');
      var filterElevator = document.querySelector('#filter-elevator');
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
      var changeFilter = function () {
        pins.forEach(function (pin, i) {
          var type = window.offerList[i].offer.type;
          var price = window.offerList[i].offer.price;
          var rooms = window.offerList[i].offer.rooms;
          var guests = window.offerList[i].offer.guests;
          var features = window.offerList[i].offer.features;
          pin.style.display = 'block';
          if (selectionHousingType.value !== type && selectionHousingType.value !== 'any') {
            pin.style.display = 'none';
          }
          if ((selectionHousingPrice.value === 'low' && price >= AVERAGE_PRICE_MIN)
          || (selectionHousingPrice.value === 'high' && price < AVARAGE_PRICE_MAX)
          || (selectionHousingPrice.value === 'middle' && (price >= AVARAGE_PRICE_MAX || price < AVERAGE_PRICE_MIN))) {
            pin.style.display = 'none';
          }
          if (selectionHousingRooms.value !== rooms.toString() && selectionHousingRooms.value !== 'any') {
            pin.style.display = 'none';
          }
          if (selectionHousingGuests.value !== guests.toString() && selectionHousingGuests.value !== 'any') {
            pin.style.display = 'none';
          }
          if (filterWifi.checked && !features.includes('wifi')) {
            pin.style.display = 'none';
          }
          if (filterDishwasher.checked && !features.includes('dishwasher')) {
            pin.style.display = 'none';
          }
          if (filterParking.checked && !features.includes('parking')) {
            pin.style.display = 'none';
          }
          if (filterWasher.checked && !features.includes('washer')) {
            pin.style.display = 'none';
          }
          if (filterElevator.checked && !features.includes('elevator')) {
            pin.style.display = 'none';
          }
          if (filterConditioner.checked && !features.includes('conditioner')) {
            pin.style.display = 'none';
          }
        });
        reducePins();
        document.querySelectorAll('.map__card').forEach(function (card) {
          card.style.display = 'none';
        });
      };
      var lastTimeOut;
      var onFilterChange = function () {
        if (lastTimeOut) {
          window.clearTimeout(lastTimeOut);
        }
        window.setTimeout(function () {
          changeFilter();
        }, TIME_OUT);
      };
      reducePins();
      selectionHousingType.addEventListener('change', onFilterChange);
      selectionHousingPrice.addEventListener('change', onFilterChange);
      selectionHousingRooms.addEventListener('change', onFilterChange);
      selectionHousingGuests.addEventListener('change', onFilterChange);
      filterWifi.addEventListener('change', onFilterChange);
      filterDishwasher.addEventListener('change', onFilterChange);
      filterParking.addEventListener('change', onFilterChange);
      filterWasher.addEventListener('change', onFilterChange);
      filterElevator.addEventListener('change', onFilterChange);
      filterConditioner.addEventListener('change', onFilterChange);
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
