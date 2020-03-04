'use strict';
var MAX_PRICE = 1000000;
var TYPE_NUMBER = 4;
var MAX_ROOMS = 100;
var MAX_GUESTS = 100;
var CHECK_NUMBER = 3;
var FEATURES_NUMBER = 6;
var PHOTOS_NUMBER = 3;
var MAX_LOCATION_X = 1200;
var MAX_LOCATION_Y = 630;
var MIN_LOCATION_Y = 130;
var OFFERS_NUMBER = 8;
var DELTA_LOCATION_X = -25;
var DELTA_LOCATION_Y = 50;
var author = {};

var randomize = function (x) {
  return Math.ceil(Math.random() * x);
};

var createPrice = function () {
  var randomPrice = randomize(MAX_PRICE);
  author.offer.price = randomPrice;
};

var createType = function () {
  var randomType = randomize(TYPE_NUMBER);

  if (randomType === 1) {
    author.offer.type = 'palace';
  }
  if (randomType === 2) {
    author.offer.type = 'flat';
  }
  if (randomType === 3) {
    author.offer.type = 'house';
  }
  if (randomType === 4) {
    author.offer.type = 'bungalo';
  }
};

var createRooms = function () {
  var randomRooms = randomize(MAX_ROOMS);

  author.offer.rooms = randomRooms;
};

var createGuests = function () {
  var randomGuests = randomize(MAX_GUESTS);

  author.offer.guests = randomGuests;
};

var createCheck = function () {
  var randomCheck = randomize(CHECK_NUMBER);

  if (randomCheck === 1) {
    author.offer.checkin = '12:00';
  }
  if (randomCheck === 2) {
    author.offer.checkin = '13:00';
  }
  if (randomCheck === 3) {
    author.offer.checkin = '14:00';
  }

  randomCheck = randomize(CHECK_NUMBER);

  if (randomCheck === 1) {
    author.offer.checkout = '12:00';
  }
  if (randomCheck === 2) {
    author.offer.checkout = '13:00';
  }
  if (randomCheck === 3) {
    author.offer.checkout = '14:00';
  }
};

var createFeatures = function () {
  for (var i = 0; i < FEATURES_NUMBER; i++) {
    if (Math.random() < 0.5) {
      author.offer.features.splice(0, 1);
    }
  }
};

var createPhotos = function () {
  for (var i = 0; i < PHOTOS_NUMBER; i++) {
    if (Math.random() < 0.5) {
      author.offer.photos.splice(0, 1);
    }
  }
};

var createLocation = function () {
  author.location.x = randomize(MAX_LOCATION_X);
  author.location.y = randomize(MAX_LOCATION_Y - MIN_LOCATION_Y) + MIN_LOCATION_Y;
  author.offer.address = author.location.x + ', ' + author.location.y;
};

var createOffer = function () {
  author = {
    avatar: 'img/avatars/user{{xx}}.png',
    offer: {
      title: 'Заголовок предложения',
      address: '500, 500',
      price: 1000,
      type: 'palace',
      rooms: 4,
      guests: 10,
      checkin: '12:00',
      checkout: '13:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: 'Строка с описанием',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    location: {
      x: 1200,
      y: 630
    }
  };
  createPrice();
  createType();
  createRooms();
  createGuests();
  createCheck();
  createFeatures();
  createPhotos();
  createLocation();
  return author;
};

var createOfferList = function () {
  var localOffers = [];

  for (var i = 0; i < OFFERS_NUMBER; i++) {
    localOffers[i] = createOffer();
    localOffers[i].avatar = 'img/avatars/user0' + (i + 1) + '.png';
  }
  return localOffers;
};

var offerList = createOfferList();


var addPins = function () {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < OFFERS_NUMBER; i++) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.dataset.cardId = i;
    pinImage.src = offerList[i].avatar;
    pinImage.alt = offerList[i].offer.title;
    pin.style.left = offerList[i].location.x + DELTA_LOCATION_X + 'px';
    pin.style.top = offerList[i].location.y + DELTA_LOCATION_Y + 'px';
    fragment.appendChild(pin);
  }
  mapPins.appendChild(fragment);
};

var createCard = function (m) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = offerList[m].offer.title;
  card.querySelector('.popup__text--address').textContent = offerList[m].offer.address;
  card.querySelector('.popup__text--price').textContent = offerList[m].offer.price + '₽/ночь';

  var translations = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var translateType = function (offer) {
    return translations[offer.type];
  };

  card.querySelector('.popup__type').textContent = translateType(offerList[m].offer);
  card.querySelector('.popup__text--capacity').innerHTML = offerList[m].offer.rooms + ' комнаты для ' + offerList[0].offer.guests + ' гостей';
  card.querySelector('.popup__text--time').innerHTML = 'Заезд после' + offerList[m].offer.checkin + ', выезд до ' + offerList[0].offer.checkout;

  var featuresList = card.querySelectorAll('.popup__feature');
  for (var i = 0; i < featuresList.length; i++) {
    featuresList[i].classList.remove('popup__feature');
    featuresList[i].classList.add('hidden');
  }

  for (var j = 0; j < offerList[m].offer.features.length; j++) {
    if (offerList[m].offer.features[j] === 'wifi') {
      card.querySelector('.popup__feature--wifi').classList.add('popup__feature');
      card.querySelector('.popup__feature--wifi').classList.remove('hidden');
    }
    if (offerList[m].offer.features[j] === 'dishwasher') {
      card.querySelector('.popup__feature--dishwasher').classList.add('popup__feature');
      card.querySelector('.popup__feature--dishwasher').classList.remove('hidden');
    }
    if (offerList[m].offer.features[j] === 'parking') {
      card.querySelector('.popup__feature--parking').classList.add('popup__feature');
      card.querySelector('.popup__feature--parking').classList.remove('hidden');
    }
    if (offerList[m].offer.features[j] === 'washer') {
      card.querySelector('.popup__feature--washer').classList.add('popup__feature');
      card.querySelector('.popup__feature--washer').classList.remove('hidden');
    }
    if (offerList[m].offer.features[j] === 'elevator') {
      card.querySelector('.popup__feature--elevator').classList.add('popup__feature');
      card.querySelector('.popup__feature--elevator').classList.remove('hidden');
    }
    if (offerList[m].offer.features[j] === 'conditioner') {
      card.querySelector('.popup__feature--conditioner').classList.add('popup__feature');
      card.querySelector('.popup__feature--conditioner').classList.remove('hidden');
    }
  }

  card.querySelector('.popup__description').textContent = offerList[m].offer.description;

  var newPhoto = [];
  newPhoto[0] = card.querySelector('.popup__photo').cloneNode(true);
  if (offerList[m].offer.photos.length === 0) {
    card.querySelector('.popup__photo').style.display = 'none';
  } else {
    card.querySelector('.popup__photo:nth-child(1)').src = offerList[m].offer.photos[0];
    for (var k = 1; k < offerList[m].offer.photos.length; k++) {
      newPhoto[k] = card.querySelector('.popup__photo').cloneNode(true);
      card.querySelector('.popup__photos').appendChild(newPhoto[k]);
      newPhoto[k].src = offerList[m].offer.photos[k];
    }
  }

  card.querySelector('.popup__avatar').src = offerList[m].avatar;
  card.style.display = 'none';

  document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', card);
};

var PIN_MAIN_CENTER_X = 32;
var PIN_MAIN_CENTER_Y = 32;
var PIN_MAIN_BOTTOM_Y = 70;
var LEFT_MOUSE_BUTTON = 0;
var ENTER_BUTTON = 'Enter';
var ESCAPE_BUTTON = 'Escape';
var adFormFieldsets = document.querySelectorAll('.ad-form fieldset');
var mapFiltersSelects = document.querySelectorAll('.map__filters select');
var mapPinMain = document.querySelector('.map__pin--main');

var makeAvailable = function () {
  addPins();
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
  if (evt.button === LEFT_MOUSE_BUTTON && document.querySelector('.map--faded') !== null) {
    showAdress();
    makeAvailable();
    // showCards();
  }
});
mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_BUTTON && document.querySelector('.map--faded') !== null) {
    showAdress();
    makeAvailable();
    // showCards();
  }
});


var capacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');
var type = document.querySelector('#type');
var price = document.querySelector('#price');
var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');
var submitButton = document.querySelector('.ad-form__submit');

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
  if (evt.key === ENTER_BUTTON) {
    validateRoomAndCapacity();
    validateTypeAndPrice();
  }
});


var createCards = function () {
  var cards = [];
  for (var i = 0; i < OFFERS_NUMBER; i++) {
    cards [i] = createCard(i);
  }
};
createCards();
// var showCards = function () {
var mapCards = document.querySelectorAll('.map__card');
//   var mapPinCollection = document.querySelectorAll('.map__pin:not(.map__pin--main)');

var cardOpen = function (cardNumber) {
  for (var i = 0; i < mapCards.length; i++) {
    mapCards[i].style.display = 'none';
  }
  mapCards[cardNumber].style.display = 'block';
  var closeButton = mapCards[cardNumber].querySelector('.popup__close');
  closeButton.addEventListener('click', function () {
    mapCards[cardNumber].style.display = 'none';
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESCAPE_BUTTON) {
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
