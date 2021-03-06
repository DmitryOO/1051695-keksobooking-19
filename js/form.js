'use strict';

(function () {
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var submitButton = document.querySelector('.ad-form__submit');
  var form = document.querySelector('.ad-form');

  var validateRoomAndCapacity = function () {
    var roomNumberVal = parseInt(roomNumber.value, 10);
    var capacityVal = parseInt(capacity.value, 10);
    if (roomNumberVal < capacityVal || (roomNumberVal === 100 && capacityVal !== 0) || (roomNumberVal !== 100 && capacityVal === 0)) {
      capacity.setCustomValidity('Ошибка. Доступны варианты: 1 комната — «для 1 гостя», 2 комнаты — «для 2 гостей» или «для 1 гостя», 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя», 100 комнат — «не для гостей».');
    } else {
      capacity.setCustomValidity('');
    }
  };

  var validateTypeAndPrice = function () {
    if (type.value === 'bungalo' && parseInt(price.value, 10) < 0) {
      price.setCustomValidity('Неужели');
    } else
    if (type.value === 'flat' && parseInt(price.value, 10) < 1000) {
      price.setCustomValidity('Минимальная цена 1000');
    } else
    if (type.value === 'house' && parseInt(price.value, 10) < 5000) {
      price.setCustomValidity('Минимальная цена 5000');
    } else
    if (type.value === 'palace' && parseInt(price.value, 10) < 10000) {
      price.setCustomValidity('Минимальная цена 10000');
    } else {
      price.setCustomValidity('');
    }
  };

  var setPricePlaceholder = function () {
    if (type.value === 'bungalo') {
      price.setAttribute('placeholder', '0');
    }
    if (type.value === 'flat') {
      price.setAttribute('placeholder', '1000');
    }
    if (type.value === 'house') {
      price.setAttribute('placeholder', '5000');
    }
    if (type.value === 'palace') {
      price.setAttribute('placeholder', '10000');
    }
  };

  var validateTimeInAndOut = function () {
    timeout.value = timein.value;
  };

  var validateTimeOutAndIn = function () {
    timein.value = timeout.value;
  };
  timein.addEventListener('change', validateTimeInAndOut);
  timeout.addEventListener('change', validateTimeOutAndIn);
  type.addEventListener('change', setPricePlaceholder);

  submitButton.addEventListener('click', function () {
    validateRoomAndCapacity();
    validateTypeAndPrice();
  });
  submitButton.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ENTER_BUTTON) {
      validateRoomAndCapacity();
      validateTypeAndPrice();
    }
  });

  var resetMapAndForm = function () {
    var pins = document.querySelectorAll('.map__pin');
    var cards = document.querySelectorAll('.map__card');
    for (var i = 1; i < pins.length; i++) {
      pins[i].remove();
    }
    for (var j = 1; j < cards.length; j++) {
      cards[j].remove();
    }
    form.reset();
    form.classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
    window.map.mapPinMain.style.left = '570px';
    window.map.mapPinMain.style.top = '375px';
    window.pins = pins;
    window.map.showAdressMapFaded();
    window.map.disableElements();
  };

  var onSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);

    resetMapAndForm();
    document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', successMessage);
    var hideSuccessMessage = function () {
      successMessage.remove();
      document.removeEventListener('click', hideSuccessMessage);
      document.removeEventListener('keydown', hideSuccessMessageKeyDown);
    };
    var hideSuccessMessageKeyDown = function (evtKey) {
      if (evtKey.key === window.constants.ESCAPE_BUTTON) {
        hideSuccessMessage();
      }
    };
    document.addEventListener('click', hideSuccessMessage);
    document.addEventListener('keydown', hideSuccessMessageKeyDown);
  };

  var onError = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorTemplate.cloneNode(true);
    document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', errorMessage);
    var hideErrorMessage = function () {
      errorMessage.remove();
      document.removeEventListener('click', hideErrorMessage);
      document.removeEventListener('keydown', hideErrorMessageKeyDown);
    };
    var hideErrorMessageKeyDown = function (evtKey) {
      if (evtKey.key === window.constants.ESCAPE_BUTTON) {
        hideErrorMessage();
      }
    };

    document.addEventListener('click', hideErrorMessage);
    document.addEventListener('keydown', hideErrorMessageKeyDown);
  };

  var removeCards = function () {
    var cards = document.querySelectorAll('.map__card');
    for (var i = 0; i < cards.length; i++) {
      cards[i].remove();
    }
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    removeCards();
    window.upload(new FormData(form), onSuccess, onError);
  });
  document.querySelector('.ad-form__reset').addEventListener('click', function () {
    removeCards();
    resetMapAndForm();
  });
})();
