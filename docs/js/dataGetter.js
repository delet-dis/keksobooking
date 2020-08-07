'use strict';
(function () {

  //объявление тэмплэйтов
  const mapCardTemplate = document.querySelector('#map__card-template'),
    pinTemplate = mapCardTemplate.content.querySelector('.map__pin'),
    mapPins = document.querySelector('.map__pins'),
    mapFiltersContainer = document.querySelector('.map__filters-container');

  window.numberOfAds = 8;

  //функция создания ДОМ-пин элемента
  window.createPin = function (dataObj) {
    let pinElement = pinTemplate.cloneNode(true);
    let pinElementImg = pinElement.querySelector('img');
    pinElement.style.left = dataObj.location.x + 'px';
    pinElement.style.top = dataObj.location.y + 'px';
    pinElementImg.src = dataObj.author.avatar;
    pinElement.alt = dataObj.offer.title;
    mapPins.appendChild(pinElement);
  }

  //объект со значениями для перевода
  let typeTranslator = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  //функция преобразования features в блоки с классами
  let featuresAppender = function (arrayNonSorted) {
    let array = arrayNonSorted[0];

    let fragment = document.createDocumentFragment();

    array.forEach(function (elem) {
      let container = document.createElement('li');
      container.className = 'feature';
      container.classList.add('feature--' + elem);
      fragment.appendChild(container);
    });

    return fragment;
  };
  //функция преобразования images в блоки
  let imagesAppender = function (array) {

    let fragment = document.createDocumentFragment();

    array.forEach(function (elem) {
      let image = document.createElement('img');
      image.src = elem;
      fragment.appendChild(image);
    });

    return fragment;
  };
  //функция создания карточки объявления
  window.createCard = function (dataObj) {
    let mapCardAd = mapCardTemplate.content.querySelector('.map__card').cloneNode(true);

    mapCardAd.querySelector('.popup__title').textContent = dataObj.offer.title;
    mapCardAd.querySelector('.popup__text--address').textContent = dataObj.offer.address;
    mapCardAd.querySelector('.popup__text--price').textContent = dataObj.offer.price + '₽/ночь';
    mapCardAd.querySelector('.popup__type').textContent = typeTranslator[dataObj.offer.type];
    mapCardAd.querySelector('.popup__text--capacity').textContent = dataObj.offer.rooms + ' комнаты для ' + dataObj.offer.guests + ' гостей';
    mapCardAd.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataObj.offer.checkin + ', выезд до ' + dataObj.offer.checkout;
    mapCardAd.querySelector('.popup__features').innerHTML = '';
    mapCardAd.querySelector('.popup__features').appendChild(featuresAppender([dataObj.offer.features]));
    mapCardAd.querySelector('.popup__description').textContent = dataObj.offer.description;
    mapCardAd.querySelector('.popup__pictures').querySelector('li').innerHTML = '';
    mapCardAd.querySelector('.popup__pictures').querySelector('li').appendChild(imagesAppender(dataObj.offer.photos));
    mapCardAd.querySelector('.popup__avatar').src = dataObj.author.avatar;

    mapFiltersContainer.before(mapCardAd);
    mapCardAd.classList.add('hidden');
  }

  window.backend.load(function (ads) {

    window.dataResult = ads;

  });
})()