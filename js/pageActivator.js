'use strict';
(() => {
  // объявление переменных
  window.mapPinMain = document.querySelector('.map__pin--main');
  const formFieldsets = document.querySelectorAll('fieldset');
  const map = document.querySelector('.map');
  const addressForm = document.querySelector('input[name=address]');
  const filtersBlock = document.querySelector('.map__filters');
  const mapFilters = document.querySelectorAll('.map__filter');
  const selectFilters = filtersBlock.querySelectorAll('.map__filter');
  const inputFilters = filtersBlock.querySelectorAll('.map__filter-set input');
  // константы

  // функция получения координат элемента относительно документа
  const getCoords = (elem) => {
    const box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
    };
  };

  // функция высчитывания положения метки
  const getPinCoords = () => {
    const MAP_PIN_WIDTH = window.mapPinMain.offsetWidth;
    const MAP_PIN_HEIGHT = window.mapPinMain.offsetHeight + 12;

    const MAP_X_COORD = getCoords(map).left;
    const MAP_Y_COORD = getCoords(map).top;

    const PIN_X_COORD = getCoords(window.mapPinMain).left;
    const PIN_Y_COORD = getCoords(window.mapPinMain).top;

    return {
      pinX: Math.floor(PIN_X_COORD - MAP_X_COORD + MAP_PIN_WIDTH / 2),
      pinY: Math.floor(PIN_Y_COORD - MAP_Y_COORD + MAP_PIN_HEIGHT),
    };
  };

  // функция заполнения адреса в зависимости от положения метки
  const inputAddressFiller = () => {
    addressForm.value = getPinCoords().pinX.toString() +
      ', ' + getPinCoords().pinY.toString();
  };
  // функция создания пинов от переданных значений
  window.generatePins = (data) => {
    data.forEach((item) => {
      window.createCard(item);
      window.createPin(item);
    });
  };

  // функция отрисовки пинов
  window.displayPins = () => {
    let pins = document.querySelectorAll('.map__pin');
    let cards = document.querySelectorAll('.map__card');

    window.generatePins(window.updateOffers());

    pins = document.querySelectorAll('.map__pin');
    cards = document.querySelectorAll('.map__card');

    for (let i = 1; i < pins.length; i++) {
      pins[i].addEventListener('click', () => {
        cards.forEach((item) => {
          item.classList.add('hidden');
        });

        cards[i - 1].classList.remove('hidden');
      });
    }
    // функция закрытия модалок
    cards.forEach((item) => {
      item.addEventListener('click', (evt) => {
        const target = evt.target;

        if (target.closest('.popup__close')) {
          item.classList.add('hidden');
        }
      });
    });
  };

  // дефолтные действия
  formFieldsets.forEach((element) => element.disabled = true);
  inputAddressFiller();
  mapFilters.forEach((element) => element.disabled = true);


  // слушатель перемещения метки
  window.mapPinMain.addEventListener('mouseup', () => {
    map.classList.remove('map--faded');

    document.querySelector('.notice__form')
        .classList.remove('notice__form--disabled');
    formFieldsets.forEach((element) => element.disabled = false);
    mapFilters.forEach((element) => element.disabled = false);

    inputAddressFiller();
    window.displayPins();
  });

  // слушатель изменения координат в адресе
  addressForm.addEventListener('input', () => {
    const coords = {
      x: addressForm.value.split(', ')[0],
      y: addressForm.value.split(', ')[1],
    };

    window.mapPinMain.style.top = coords.x + 'px';
    window.mapPinMain.style.left = coords.y - 44 + 'px';
  });

  selectFilters.forEach((elem) => {
    elem.addEventListener('change', () => {
      window.displayPins();
    });
  });

  inputFilters.forEach((elem) => {
    elem.addEventListener('change', () => {
      window.displayPins();
    });
  });
})();
