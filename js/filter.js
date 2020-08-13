'use strict';

//функция фильтрации объявлений
(function () {
  //объявление элементов
  const filtersContainer = document.querySelector('.map__filters'),
    housingType = filtersContainer.querySelector('#housing-type'),
    housingPrice = filtersContainer.querySelector('#housing-price'),
    housingRooms = filtersContainer.querySelector('#housing-rooms'),
    housingGuests = filtersContainer.querySelector('#housing-guests'),
    inputFilters = filtersContainer.querySelectorAll('input'),
    selectFilters = filtersContainer.querySelectorAll('select');

  const getFilterValue = (filter, value) => filter = value;

  //слушатель изменения значения фильтров(select)
  selectFilters.forEach((item) => {
    item.addEventListener('change', (evt) => {
      getFilterValue(item.value, evt.target.value);
    });
  })
  //слушатель изменения значения фильтров(input)
  inputFilters.forEach((item) => {
    item.addEventListener('change', () => {
      getFilterValue(item, item.checked);
    })
  })
})()