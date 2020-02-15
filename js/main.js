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
var OBJECTS_NUMBER = 8;
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

  for (var i = 0; i < OBJECTS_NUMBER; i++) {
    localOffers[i] = createOffer();
    localOffers[i].avatar = 'img/avatars/user0' + (i + 1) + '.png';
  }
  return localOffers;
};

var offerList = createOfferList();

document.querySelector('.map--faded').classList.remove('map--faded');

var addPins = function () {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < OBJECTS_NUMBER; i++) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pinImage.src = offerList[i].avatar;
    pinImage.alt = offerList[i].offer.title;
    pin.style.left = offerList[i].location.x + DELTA_LOCATION_X + 'px';
    pin.style.top = offerList[i].location.y + DELTA_LOCATION_Y + 'px';
    fragment.appendChild(pin);
  }
  mapPins.appendChild(fragment);
};

addPins();
