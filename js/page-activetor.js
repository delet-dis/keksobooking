'use strict';

//объявление переменных
const mapPinMain = document.querySelector('.map__pin--main'),
  formFieldsets = document.querySelectorAll('fieldset'),
  map = document.querySelector('.map');

//отключение форм по дефолту
formFieldsets.forEach(element => element.disabled = true);

//слушатель перемещения метки
mapPinMain.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  formFieldsets.forEach(element => element.disabled = false);
})