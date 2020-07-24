'use strict';

//объявление переменных
const formFieldsets = document.querySelectorAll('fieldset'),
      map = document.querySelector('.map');

//отключение по дефолту
if(map.classList.toString().includes('map--faded')){
formFieldsets.forEach(element => element.disabled = true);
};