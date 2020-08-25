'use strict';
(() => {
  // объявление тэмплэйтов
  const mapCardTemplate = document.querySelector('#map__card-template');
  const pinTemplate = mapCardTemplate.content.querySelector('.map__pin');
  const mapPins = document.querySelector('.map__pins');
  const mapFiltersContainer = document.querySelector('.map__filters-container');

  window.numberOfAds = 8;

  // функция создания ДОМ-пин элемента
  window.createPin = (dataObj) => {
    const pinElement = pinTemplate.cloneNode(true);
    const pinElementImg = pinElement.querySelector('img');
    pinElement.style.left = dataObj.location.x + 'px';
    pinElement.style.top = dataObj.location.y + 'px';
    pinElementImg.src = dataObj.author.avatar;
    pinElement.alt = dataObj.offer.title;
    mapPins.appendChild(pinElement);
  };

  // объект со значениями для перевода
  const typeTranslator = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  // функция преобразования features в блоки с классами
  const featuresAppender = (arrayNonSorted) => {
    const array = arrayNonSorted[0];

    const fragment = document.createDocumentFragment();

    array.forEach((elem) => {
      const container = document.createElement('li');
      container.className = 'feature';
      container.classList.add('feature--' + elem);
      fragment.appendChild(container);
    });

    return fragment;
  };
  // функция преобразования images в блоки
  const imagesAppender = (array) => {
    const fragment = document.createDocumentFragment();

    array.forEach((elem) => {
      const image = document.createElement('img');
      image.src = elem;
      fragment.appendChild(image);
    });

    return fragment;
  };
  // функция создания карточки объявления
  window.createCard = (dataObj) => {
    const mapCardAd = mapCardTemplate.content
        .querySelector('.map__card').cloneNode(true);

    mapCardAd.querySelector('.popup__title')
        .textContent = dataObj.offer.title;
    mapCardAd.querySelector('.popup__text--address')
        .textContent = dataObj.offer.address;
    mapCardAd.querySelector('.popup__text--price')
        .textContent = dataObj.offer.price + '₽/ночь';
    mapCardAd.querySelector('.popup__type')
        .textContent = typeTranslator[dataObj.offer.type];
    mapCardAd.querySelector('.popup__text--capacity')
        .textContent = dataObj.offer.rooms +
         ' комнаты для ' + dataObj.offer.guests + ' гостей';
    mapCardAd.querySelector('.popup__text--time')
        .textContent = 'Заезд после ' + dataObj.offer.checkin +
         ', выезд до ' + dataObj.offer.checkout;
    mapCardAd.querySelector('.popup__features')
        .innerHTML = '';
    mapCardAd.querySelector('.popup__features')
        .appendChild(featuresAppender([dataObj.offer.features]));
    mapCardAd.querySelector('.popup__description')
        .textContent = dataObj.offer.description;
    mapCardAd.querySelector('.popup__pictures')
        .querySelector('li').innerHTML = '';
    mapCardAd.querySelector('.popup__pictures')
        .querySelector('li').appendChild(imagesAppender(dataObj.offer.photos));
    mapCardAd.querySelector('.popup__avatar')
        .src = dataObj.author.avatar;

    mapFiltersContainer.before(mapCardAd);
    mapCardAd.classList.add('hidden');
  };

  window.backend.load((ads) => {
    window.dataResult = ads;
  });
})();
