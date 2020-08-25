'use strict';

(() => {
  const filtersBlock = document.querySelector('.map__filters');
  const filterType = filtersBlock.querySelector('#housing-type');
  const filterPrice = filtersBlock.querySelector('#housing-price');
  const filterRooms = filtersBlock.querySelector('#housing-rooms');
  const filterGuestsNumber = filtersBlock.querySelector('#housing-guests');
  const selectFilters = filtersBlock.querySelectorAll('.map__filter');
  const inputFilters = filtersBlock.querySelectorAll('.map__filter-set input');

  const any = 'any';
  const low = 'low';
  const high = 'high';
  const middle = 'middle';

  const getCurrentFilterValue = (filter, value) => {
    filter = value;
  };

  selectFilters.forEach((elem) => {
    elem.addEventListener('change', (evt) => {
      getCurrentFilterValue(elem.value, evt.target.value);
    });
  });

  inputFilters.forEach((elem) => {
    elem.addEventListener('change', () => {
      getCurrentFilterValue(elem, elem.checked);
    });
  });

  const filterAds = (ad) => {
    const adOffer = ad.offer;
    const adFeatures = adOffer.features;
    const adPrice = adOffer.price;

    for (let i = 0; i < selectFilters.length; i++) {
      if (selectFilters[i] === filterType) {
        if (selectFilters[i].value !== any &&
           adOffer.type !== selectFilters[i].value) {
          return false;
        }
      }
      if (selectFilters[i] === filterPrice) {
        if (selectFilters[i].value !== any &&
          (selectFilters[i].value === low && adPrice >= 10000 ||
            selectFilters[i].value === middle &&
             (adPrice <= 10000 || adPrice >= 50000) ||
            selectFilters[i].value === high && adPrice <= 50000)
        ) {
          return false;
        }
      }
      if (selectFilters[i] === filterRooms ||
         selectFilters[i] === filterGuestsNumber) {
        if (selectFilters[i].value !== any &&
           adOffer.guests !== selectFilters[i].value * 1) {
          return false;
        }
      }
    }

    for (let j = 0; j < inputFilters.length; j++) {
      if (inputFilters[j].checked === true &&
         adFeatures.indexOf(inputFilters[j].value) === -1) {
        return false;
      }
    }

    return true;
  };

  window.updateOffers = () => {
    const pins = document.querySelectorAll('.map__pin');
    const cards = document.querySelectorAll('.map__card');

    for (let i = 1; i < pins.length; i++) {
      pins[i].parentNode.removeChild(pins[i]);
    }

    cards.forEach((item) => {
      item.parentNode.removeChild(item);
    });

    const filterData = window.dataResult;
    return filterData.filter(filterAds);
  };
})();
