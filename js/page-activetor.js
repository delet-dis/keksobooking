'use strict';

//объявление переменных
const mapPinMain = document.querySelector('.map__pin--main'),
  formFieldsets = document.querySelectorAll('fieldset'),
  map = document.querySelector('.map'),
  addressForm = document.querySelector('input[name=address]');

//константы
const MAP_PIN_WIDTH = mapPinMain.offsetWidth;
const MAP_PIN_HEIGHT = mapPinMain.offsetHeight;

//дефолтные действия
formFieldsets.forEach(element => element.disabled = true);


//слушатель перемещения метки
mapPinMain.addEventListener('mouseup', function (evt) {
  map.classList.remove('map--faded');
  formFieldsets.forEach(element => element.disabled = false);
  console.log(mapPinMain.offsetParent);
})