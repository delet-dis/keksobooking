'use strict';

(function () {
  const filtersBlock = document.querySelector('.map__filters'),
    filterType = filtersBlock.querySelector('#housing-type'),
    filterPrice = filtersBlock.querySelector('#housing-price'),
    filterRooms = filtersBlock.querySelector('#housing-rooms'),
    filterGuestsNumber = filtersBlock.querySelector('#housing-guests'),
    selectFilters = filtersBlock.querySelectorAll('.map__filter'),
    inputFilters = filtersBlock.querySelectorAll('.map__filter-set input');

  let any = 'any';
  let low = 'low';
  let high = 'high';
  let middle = 'middle';

  let getCurrentFilterValue = function (filter, value) {
    filter = value;
  };

  selectFilters.forEach(function (elem) {
    elem.addEventListener('change', function (evt) {
      getCurrentFilterValue(elem.value, evt.target.value);
    });
  });

  inputFilters.forEach(function (elem) {
    elem.addEventListener('change', function () {
      getCurrentFilterValue(elem, elem.checked);
    });
  });

  let filterAds = function (ad) {
    let adOffer = ad.offer;
    let adFeatures = adOffer.features;
    let adPrice = adOffer.price;

    for (let i = 0; i < selectFilters.length; i++) {
      if (selectFilters[i] === filterType) {
        if (selectFilters[i].value !== any && adOffer.type !== selectFilters[i].value) {
          return false;
        }
      }
      if (selectFilters[i] === filterPrice) {
        if (selectFilters[i].value !== any &&
          (selectFilters[i].value === low && adPrice >= window.utils.PRICE_LOW ||
            selectFilters[i].value === middle && (adPrice <= window.utils.PRICE_LOW || adPrice >= window.utils.PRICE_MIDDLE) ||
            selectFilters[i].value === high && adPrice <= window.utils.PRICE_MIDDLE)
        ) {
          return false;
        }
      }
      if (selectFilters[i] === filterRooms || selectFilters[i] === filterGuestsNumber) {
        if (selectFilters[i].value !== any && adOffer.guests !== selectFilters[i].value * 1) {
          return false;
        }
      }
    }

    for (let j = 0; j < inputFilters.length; j++) {
      if (inputFilters[j].checked === true && adFeatures.indexOf(inputFilters[j].value) === -1) {
        return false;
      }
    }

    return true;
  };

  window.updateOffers = function () {

    const pins = document.querySelectorAll('.map__pin');
    const cards = document.querySelectorAll('.map__card');

    for (let i = 1; i < pins.length; i++) {
      pins[i].parentNode.removeChild(pins[i]);
    }

    cards.forEach((item) => {
      item.parentNode.removeChild(item);
    });

    let filterData = window.dataResult;
    return filterData.filter(filterAds);
  };


})();