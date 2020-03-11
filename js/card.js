'use strict';

(function () {
  var createCard = function (m) {
    var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = window.offerList[m].offer.title;
    card.querySelector('.popup__text--address').textContent = window.offerList[m].offer.address;
    card.querySelector('.popup__text--price').textContent = window.offerList[m].offer.price + '₽/ночь';

    var translations = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };

    var translateType = function (offer) {
      return translations[offer.type];
    };

    card.querySelector('.popup__type').textContent = translateType(window.offerList[m].offer);
    card.querySelector('.popup__text--capacity').innerHTML = window.offerList[m].offer.rooms + ' комнаты для ' + window.offerList[0].offer.guests + ' гостей';
    card.querySelector('.popup__text--time').innerHTML = 'Заезд после' + window.offerList[m].offer.checkin + ', выезд до ' + window.offerList[0].offer.checkout;

    var featuresList = card.querySelectorAll('.popup__feature');
    for (var i = 0; i < featuresList.length; i++) {
      featuresList[i].classList.remove('popup__feature');
      featuresList[i].classList.add('hidden');
    }

    for (var j = 0; j < window.offerList[m].offer.features.length; j++) {
      if (window.offerList[m].offer.features[j] === 'wifi') {
        card.querySelector('.popup__feature--wifi').classList.add('popup__feature');
        card.querySelector('.popup__feature--wifi').classList.remove('hidden');
      }
      if (window.offerList[m].offer.features[j] === 'dishwasher') {
        card.querySelector('.popup__feature--dishwasher').classList.add('popup__feature');
        card.querySelector('.popup__feature--dishwasher').classList.remove('hidden');
      }
      if (window.offerList[m].offer.features[j] === 'parking') {
        card.querySelector('.popup__feature--parking').classList.add('popup__feature');
        card.querySelector('.popup__feature--parking').classList.remove('hidden');
      }
      if (window.offerList[m].offer.features[j] === 'washer') {
        card.querySelector('.popup__feature--washer').classList.add('popup__feature');
        card.querySelector('.popup__feature--washer').classList.remove('hidden');
      }
      if (window.offerList[m].offer.features[j] === 'elevator') {
        card.querySelector('.popup__feature--elevator').classList.add('popup__feature');
        card.querySelector('.popup__feature--elevator').classList.remove('hidden');
      }
      if (window.offerList[m].offer.features[j] === 'conditioner') {
        card.querySelector('.popup__feature--conditioner').classList.add('popup__feature');
        card.querySelector('.popup__feature--conditioner').classList.remove('hidden');
      }
    }

    card.querySelector('.popup__description').textContent = window.offerList[m].offer.description;

    var newPhoto = [];
    newPhoto[0] = card.querySelector('.popup__photo').cloneNode(true);
    if (window.offerList[m].offer.photos.length === 0) {
      card.querySelector('.popup__photo').style.display = 'none';
    } else {
      card.querySelector('.popup__photo:nth-child(1)').src = window.offerList[m].offer.photos[0];
      for (var k = 1; k < window.offerList[m].offer.photos.length; k++) {
        newPhoto[k] = card.querySelector('.popup__photo').cloneNode(true);
        card.querySelector('.popup__photos').appendChild(newPhoto[k]);
        newPhoto[k].src = window.offerList[m].offer.photos[k];
      }
    }

    card.querySelector('.popup__avatar').src = window.offerList[m].author.avatar;
    card.style.display = 'none';

    document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', card);
  };
  window.createCard = createCard;
})();
