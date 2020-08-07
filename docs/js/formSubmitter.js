'use strict';

(function () {
  //поиск формы
  const form = document.querySelector('.notice__form');

  //слушатель отправки формы
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {

      let node = document.createElement('div');
      node.classList.add('success-message');
      node.textContent = 'Данные успешно отправлены';
      document.body.insertAdjacentElement('afterbegin', node);

      setTimeout(() => {
        document.querySelector('.success-message').remove()
      }, 4000);

      form.reset();
    }, window.backend.errorHandler);

    evt.preventDefault();
  });
})()