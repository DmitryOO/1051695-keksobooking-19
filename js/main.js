'use strict';
var maxPrice = 1000000;
var typeNumber = 4;
var maxRooms = 100;
var maxGuests = 100;
var checkNumber = 3;
var featuresNumber = 6;
var photosNumber = 3;
var maxLocationX = 1200;
var maxLocationY = 630;
var minLocationY = 130;
var objectsNumber = 8;
var massive = [];
var author = {};

var randomize = function (x) {
  return Math.ceil(Math.random() * x);
};

var createPrice = function () {
  var randomPrice = randomize(maxPrice);
  author.offer.price = randomPrice;
};

var createType = function () {
  var randomType = randomize(typeNumber);

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
  var randomRooms = randomize(maxRooms);

  author.offer.rooms = randomRooms;
};

var createGuests = function () {
  var randomGuests = randomize(maxGuests);

  author.offer.guests = randomGuests;
};

var createCheck = function () {
  var randomCheck = randomize(checkNumber);

  if (randomCheck === 1) {
    author.offer.checkin = '12:00';
  }
  if (randomCheck === 2) {
    author.offer.checkin = '13:00';
  }
  if (randomCheck === 3) {
    author.offer.checkin = '14:00';
  }

  randomCheck = randomize(checkNumber);

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
  for (var i = 0; i < featuresNumber; i++) {
    if (Math.random() < 0.5) {
      author.offer.features.splice(0, 1);
    }
  }
};

var createPhotos = function () {
  for (var i = 0; i < photosNumber; i++) {
    if (Math.random() < 0.5) {
      author.offer.photos.splice(0, 1);
    }
  }
};

var createLocation = function () {
  author.location.x = randomize(maxLocationX);
  author.location.y = randomize(maxLocationY - minLocationY) + minLocationY;
  author.offer.address = (author.location.x).toString(10) + ', ' + (author.location.y).toString(10);
};

var createObject = function () {
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

var createMassive = function () {
  for (var i = 0; i < objectsNumber; i++) {
    massive[i] = createObject();
    author.avatar = 'img/avatars/user0' + (i + 1) + '.png';
  }
  return massive;
};

createMassive();


document.querySelector('.map--faded').classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();
for (var i = 0; i < objectsNumber; i++) {
  var pin = pinTemplate.cloneNode(true);
  var pinImage = pin.querySelector('img');
  pinImage.src = massive[i].avatar;
  pinImage.alt = massive[i].offer.title;
  pin.style.left = massive[i].location.x - 25 + 'px';
  pin.style.top = massive[i].location.y + 50 + 'px';
  fragment.appendChild(pin);
}
mapPins.appendChild(fragment);
// <template id="pin">
// <button type="button" class="map__pin" style="left: 200px; top: 400px;"><img src="img/avatars/user07.png" width="40" height="40" draggable="false" alt="Метка объявления"></button>
// </template>
