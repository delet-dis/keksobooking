'use strict';

//функция фильтрации объявлений
(function () {
  //объявление элементов
  const filtersContainer = document.querySelector('.map__filters'),
    housingType = filtersContainer.querySelector('#housing-type'),
    housingPrice = filtersContainer.querySelector('#housing-price'),
    housingRooms = filtersContainer.querySelector('#housing-rooms'),
    housingGuests = filtersContainer.querySelector('#housing-guests'),
    inputFilters = filtersContainer.querySelectorAll('input');

  //проверка отмеченности инпута
  inputFilters.forEach((item) => {
    item.addEventListener('click', () => {
      console.log(item.checked);
    })
  })
})()