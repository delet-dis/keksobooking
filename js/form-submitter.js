'use strict';

(function () {
  //поиск формы
  const form = document.querySelector('.notice__form');

  //слушатель отправки формы
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      form.reset();
    }, window.backend.errorHandler);
    evt.preventDefault();
  });;
})()