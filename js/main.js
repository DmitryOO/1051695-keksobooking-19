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

document.querySelector('.map--faded').classList.remove('map--faded');

var addPins = function () {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < OFFERS_NUMBER; i++) {
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


var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var card = cardTemplate.cloneNode(true);
card.querySelector('.popup__title').textContent = offerList[0].offer.title;
card.querySelector('.popup__text--address').textContent = offerList[0].offer.address;
card.querySelector('.popup__text--price').innerHTML = offerList[0].offer.price + '&#x20bd;<span>/ночь</span></p>';

var translateType = function () {
  var popupType = '';
  if (offerList[0].offer.type === 'flat') {
    popupType = 'Квартира';
  }
  if (offerList[0].offer.type === 'bungalo') {
    popupType = 'Бунгало';
  }
  if (offerList[0].offer.type === 'house') {
    popupType = 'Дом';
  }
  if (offerList[0].offer.type === 'palace') {
    popupType = 'Дворец';
  }
  return popupType;
};
card.querySelector('.popup__type').textContent = translateType();
card.querySelector('.popup__text--capacity').innerHTML = offerList[0].offer.rooms + ' комнаты для ' + offerList[0].offer.guests + ' гостей';
card.querySelector('.popup__text--time').innerHTML = 'Заезд после' + offerList[0].offer.checkin + ', выезд до ' + offerList[0].offer.checkout;

var featuresList = card.querySelectorAll('.popup__feature');
for (var i = 0; i < featuresList.length; i++) {
  featuresList[i].classList.remove('popup__feature');
}

for (var j = 0; j < offerList[0].offer.features.length; j++) {
  if (offerList[0].offer.features[j] === 'wifi') {
    card.querySelector('.popup__feature--wifi').classList.add('popup__feature');
  }
  if (offerList[0].offer.features[j] === 'dishwasher') {
    card.querySelector('.popup__feature--dishwasher').classList.add('popup__feature');
  }
  if (offerList[0].offer.features[j] === 'parking') {
    card.querySelector('.popup__feature--parking').classList.add('popup__feature');
  }
  if (offerList[0].offer.features[j] === 'washer') {
    card.querySelector('.popup__feature--washer').classList.add('popup__feature');
  }
  if (offerList[0].offer.features[j] === 'elevator') {
    card.querySelector('.popup__feature--elevator').classList.add('popup__feature');
  }
  if (offerList[0].offer.features[j] === 'conditioner') {
    card.querySelector('.popup__feature--conditioner').classList.add('popup__feature');
  }
}

card.querySelector('.popup__description').textContent = offerList[0].offer.description;

var newPhoto = card.querySelector('.popup__photo').cloneNode(true);
if (offerList[0].offer.photos.length === 0) {
  card.querySelector('.popup__photo').style.display = 'none';
} else {
  for (var k = 1; k <= offerList[0].offer.photos.length; k++) {
    card.querySelector('.popup__photo:nth-child(1)').src = offerList[0].offer.photos[0];
    if (k < offerList[0].offer.photos.length) {
      card.querySelector('.popup__photos').appendChild(newPhoto);
      newPhoto.src = offerList[0].offer.photos[k];
    }
  }
}

card.querySelector('.popup__avatar').src = offerList[0].avatar;
document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', card);

/* <template id="card">
<article class="map__card popup">
  <img src="img/avatars/user01.png" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
  <button type="button" class="popup__close">Закрыть</button>
  <h3 class="popup__title">Уютное гнездышко для молодоженов</h3>
  <p class="popup__text popup__text--address">102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3</p>
  <p class="popup__text popup__text--price">5200&#x20bd;<span>/ночь</span></p>
  <h4 class="popup__type">Квартира</h4>
  <p class="popup__text popup__text--capacity">2 комнаты для 3 гостей</p>
  <p class="popup__text popup__text--time">Заезд после 14:00, выезд до 10:00</p>
  <ul class="popup__features">
    <li class="popup__feature popup__feature--wifi"></li>
    <li class="popup__feature popup__feature--dishwasher"></li>
    <li class="popup__feature popup__feature--parking"></li>
    <li class="popup__feature popup__feature--washer"></li>
    <li class="popup__feature popup__feature--elevator"></li>
    <li class="popup__feature popup__feature--conditioner"></li>
  </ul>
  <p class="popup__description">Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.</p>
  <div class="popup__photos">
    <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
  </div>
</article>
</template>*/
