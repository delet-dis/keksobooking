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

  //проверка отмеченности инпута
  inputFilters.forEach((item) => {
    item.addEventListener('click', () => {
      console.log(item.checked);
    })
  });

  //слушатель изменения значения фильтров
  let filtersObject = {
    type: undefined,
    price: undefined,
    rooms: undefined,
    guests: undefined
  };
  filtersContainer.addEventListener('click', () => {
    housingType.addEventListener('change', () => {
      filtersObject.type = housingType.value;
    });
    housingPrice.addEventListener('change', () => {
      filtersObject.price = housingPrice.value;
    });
    housingRooms.addEventListener('change', () => {
      filtersObject.rooms = housingRooms.value;
    });
    housingGuests.addEventListener('change', () => {
      filtersObject.guests = housingGuests.value;
    });
  });

  //функция обновления фильтров и применения их к данным
  function updateFilters() {

  }
})()