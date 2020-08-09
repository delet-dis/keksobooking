'use strict';

//функция фильтровки объявлений
(function(){
  const filtersContainer = document.querySelector('.map__filters-container'),
    housingFeatures = document.querySelector('.map__filter-set')
    housingType = filtersContainer.querySelector('#housing-type'),
    housingPrice = filtersContainer.querySelector('#housing-price'),
    housingRooms = filtersContainer.querySelector('#housing-rooms'),
    housingGuests = filtersContainer.querySelector('#housing-guests'),
    inputFilters = housingFeatures.querySelectorAll('.map__filter-set input');
})()