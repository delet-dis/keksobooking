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

  //слушатель изменения значения фильтров
  let filtersObject = {};
  filtersContainer.addEventListener('click', () => {
    selectFilters.forEach((item) => {
      item.addEventListener('change', (evt) => {
        let filterName = item.name;
        filtersObject.filterName = item.value;
      })
    })
    console.log(filtersObject);
  });

  //функция обновления фильтров и применения их к данным
  function updateFilters() {

  }
})()