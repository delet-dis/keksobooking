'use strict';

//объявление переменных
const mapPinMain = document.querySelector('.map__pin--main'),
  formFieldsets = document.querySelectorAll('fieldset'),
  map = document.querySelector('.map'),
  addressForm = document.querySelector('input[name=address]');

//константы

//функция получения координат элемента относительно документа
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

//функция высчитывания положения метки
function getPinCoords() {
  const MAP_PIN_WIDTH = mapPinMain.offsetWidth;
  const MAP_PIN_HEIGHT = mapPinMain.offsetHeight + 12;

  const MAP_X_COORD = getCoords(map).left;
  const MAP_Y_COORD = getCoords(map).top;

  const PIN_X_COORD = getCoords(mapPinMain).left;
  const PIN_Y_COORD = getCoords(mapPinMain).top;

  return {
    pinX: Math.floor(PIN_X_COORD - MAP_X_COORD + MAP_PIN_WIDTH / 2),
    pinY: Math.floor(PIN_Y_COORD - MAP_Y_COORD + MAP_PIN_HEIGHT)
  };
}

//функция заполнения адреса в зависимости от положения метки
function inputAddressFiller() {
  addressForm.value = getPinCoords().pinX.toString() + ', ' + getPinCoords().pinY.toString();
}

//функция отрисовки пинов
function displayPins() {
  for (let i = 0; i < numberOfAds; i++) {
    createPin(dataResult[i]);
  }
}

//дефолтные действия
formFieldsets.forEach(element => element.disabled = true);
inputAddressFiller();

//слушатель перемещения метки
mapPinMain.addEventListener('mouseup', function (evt) {
  map.classList.remove('map--faded');
  formFieldsets.forEach(element => element.disabled = false);
  inputAddressFiller();
  displayPins();
})