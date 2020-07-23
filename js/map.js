'use strict';

//объявление тэмплэйтов
let mapCardTemplate = document.querySelector('#map__card-template');
let pinTemplate = mapCardTemplate.content.querySelector('.map__pin');
let mapPins = document.querySelector('.map__pins');
let mapFiltersContainer = document.querySelector('.map__filters-container');
//функция случайной перестановки элементов
let getRandomPermutation = (arr) => {
  let n = arr.length;
  for (let i = (n - 1); i > 0; i--) {
    let j = Math.floor(Math.random() * i);

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

//функция случайного пика значения
let arrayRandElement = arr => {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

//функция получения случайного числа в пределах min max
function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function avatarGenerator() {
  let avatarsArray = [];
  for (let i = 1; i <= 8; i++) {
    avatarsArray.push('img/avatars/user' + '0' + i + '.png')
  }

  return getRandomPermutation(avatarsArray);
}

function titleGenerator() {
  let titlesArray = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  return getRandomPermutation(titlesArray);
}

function addressGenerator() {
  let map = document.querySelector('.map__pinsoverlay');
  let mapWidth = map.offsetWidth;
  let addressArray = [];
  for (let i = 0; i < 8; i++) {
    addressArray.push(randomInteger(0, mapWidth).toString() + ', ' + randomInteger(130, 630).toString());
  }
  return addressArray;
}

function priceGenerator() {
  let pricesArray = [];
  for (let i = 0; i < 8; i++) {
    pricesArray.push(Math.round(randomInteger(1000, 20000) / 1000000 * 1000000));
  }
  return pricesArray;
}

function typeGenerator() {
  let typesArray = [];
  let types = ['palace', 'flat', 'house', 'bungalo'];
  for (let i = 0; i < 8; i++) {
    typesArray.push(arrayRandElement(types));
  }
  return typesArray;
}

function roomNumberGenerator() {
  let roomsNumbersArray = [];
  for (let i = 0; i < 8; i++) {
    roomsNumbersArray.push(randomInteger(2, 4));
  }
  return roomsNumbersArray;
}

function guestsNumberGenerator() {
  let guestNumbersArray = [];
  for (let i = 0; i < 8; i++) {
    guestNumbersArray.push(randomInteger(3, 15));
  }
  return guestNumbersArray;
}

function checkinTimeGenerator() {
  let checkinsArray = [];
  let checkins = ['12:00', '13:00', '14:00'];
  for (let i = 0; i < 8; i++) {
    checkinsArray.push(arrayRandElement(checkins));
  }
  return checkinsArray;
}

function checkoutTimeGenerator() {
  let checkoutsArray = [];
  let checkouts = ['12:00', '13:00', '14:00'];
  for (let i = 0; i < 8; i++) {
    checkoutsArray.push(arrayRandElement(checkouts));
  }
  return checkoutsArray;
}

function featuresGenerator() {
  let featuresArray = [];
  let features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  for (let i = 0; i < 8; i++) {
    featuresArray[i] = arrayRandElement(features);
  }
  return featuresArray;
}

function picturesGenerator() {
  let picturesArray = [];
  let pictures = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  for (let i = 0; i < 8; i++) {
    picturesArray.push(arrayRandElement(pictures));
  }
  return picturesArray;
}

//функция сборки всех сгенерированных данных в один массив
function dataBuilder() {
  let dataMassive = [];
  let avatarsArray = avatarGenerator();
  let titlesArray = titleGenerator();
  let addressesArray = addressGenerator();
  let pricesArray = priceGenerator();
  let typesArray = typeGenerator();
  let roomsArray = roomNumberGenerator();
  let guestsArray = guestsNumberGenerator();
  let checkinsArray = checkinTimeGenerator();
  let checkoutsArray = checkoutTimeGenerator();
  let featuresArray = featuresGenerator();
  let photosArray = picturesGenerator();
  for (let i = 0; i < 8; i++) {
    let dataObject = {
      author: {},
      offer: {},
      location: {}
    };
    dataObject.author.avatar = avatarsArray[i];
    dataObject.offer.title = titlesArray[i];
    dataObject.offer.address = addressesArray[i];
    dataObject.offer.price = pricesArray[i];
    dataObject.offer.type = typesArray[i];
    dataObject.offer.rooms = roomsArray[i];
    dataObject.offer.guests = guestsArray[i];
    dataObject.offer.checkin = checkinsArray[i];
    dataObject.offer.checkout = checkoutsArray[i];
    dataObject.offer.features = featuresArray[i];
    dataObject.offer.description = '';
    dataObject.offer.photos = photosArray[i];
    dataObject.location.x = addressesArray[i].toString().split(', ')[0];
    dataObject.location.y = addressesArray[i].toString().split(', ')[1];
    dataMassive.push(dataObject);
  }
  return dataMassive;
}
//занесение результатов в переменную
let dataResult = dataBuilder();

//временный костыль удаления класса
let map = document.querySelector('.map');
map.classList.remove('map--faded');

//функция создания ДОМ-пин элемента
function createPin(dataObj) {
  let pinElement = pinTemplate.cloneNode(true);
  let pinElementImg = pinElement.querySelector('img');
  pinElement.style.left = dataObj.location.x + 'px';
  pinElement.style.top = dataObj.location.y + 'px';
  pinElementImg.src = dataObj.author.avatar;
  pinElement.alt = dataObj.offer.title;
  mapPins.appendChild(pinElement);
}

//самовызывающаяся функция отрисовки пинов
(function displayPins() {

  for (let i = 0; i < 8; i++) {
    createPin(dataResult[i]);
  };
}());

//функция перевода значений массива в типы жилищ
function typeTranslator(obj) {
  switch (obj) {
    case 'flat':
      return 'Квартира'
      break
    case 'bungalo':
      return 'Бунгало'
      break
    case 'house':
      return 'Дом'
      break
    case 'palace':
      return 'Дворец'
      break
  }
}
//функция преобразования features в блоки с классами
let featuresAppender = function (array) {
  let fragment = document.createDocumentFragment();
  array.forEach(function (elem) {
    let container = document.createElement('li');
    container.className = 'feature';
    container.classList.add('feature--' + elem);
    fragment.appendChild(container);
  });
  return fragment;
};
//функция создания карточки объявления
function createCard(dataObj) {
  let mapCardAd = mapCardTemplate.content.querySelector('.map__card');
  mapCardAd.querySelector('.popup__title').textContent = dataObj.offer.title;
  mapCardAd.querySelector('.popup__text--address').textContent = dataObj.offer.address;
  mapCardAd.querySelector('.popup__text--price').textContent = dataObj.offer.price + '₽/ночь';
  mapCardAd.querySelector('.popup__type').textContent = typeTranslator(dataObj.offer.type);
  mapCardAd.querySelector('.popup__text--capacity').textContent = dataObj.offer.rooms + ' комнаты для ' + dataObj.offer.guests + ' гостей';
  mapCardAd.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataObj.offer.checkin + ', выезд до ' + dataObj.offer.checkout;
  mapCardAd.querySelector('.popup__features').innerHTML = '';
  mapCardAd.querySelector('.popup__features').appendChild(featuresAppender([dataObj.offer.features]));
  mapCardAd.querySelector('.popup__description').textContent = dataObj.offer.description;
  mapCardAd.querySelector('.popup__pictures').querySelector('img').src = dataObj.offer.photos;
  mapCardAd.querySelector('.popup__avatar').src = dataObj.author.avatar;

  mapFiltersContainer.before(mapCardAd);
}

createCard(dataResult[1]);