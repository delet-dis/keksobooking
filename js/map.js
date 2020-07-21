'use strict';

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
    avatarsArray.push('0' + i)
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
    pricesArray.push(randomInteger(1000, 1000000000));
  }
  return pricesArray;
}

function typeGenerator() {
  let typesArray = [];
  let types = ['place', 'flat', 'house', 'bungalo'];
  for (let i = 0; i < 8; i++) {
    typesArray.push(arrayRandElement(types));
  }
  return typesArray;
}

function roomNumberGenerator() {
  let roomsNumbersArray = [];
  for (let i = 0; i < 8; i++) {
    roomsNumbersArray.push(randomInteger(1, 5));
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
    let dataObject = {};
    dataObject.avatar = avatarsArray[i];
    dataObject.title = titlesArray[i];
    dataObject.address = addressesArray[i];
    dataObject.price = pricesArray[i];
    dataObject.type = typesArray[i];
    dataObject.rooms = roomsArray[i];
    dataObject.guests = guestsArray[i];
    dataObject.checkins = checkinsArray[i];
    dataObject.checkouts = checkoutsArray[i];
    dataObject.features = featuresArray[i];
    dataObject.photos = photosArray[i];
    dataMassive.push(dataObject);
  }
  return dataMassive;
}

console.log(dataBuilder());