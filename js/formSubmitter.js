'use strict';

(() => {
  // поиск формы
  const form = document.querySelector('.notice__form');
  const formReset = document.querySelector('.form__reset');

  // слушатель отправки формы
  form.addEventListener('submit', (evt) => {
    window.backend.save(new FormData(form), () => {
      const node = document.createElement('div');
      node.classList.add('success-message');
      node.textContent = 'Данные успешно отправлены';
      document.body.insertAdjacentElement('afterbegin', node);

      setTimeout(() => {
        document.querySelector('.success-message').remove();
      }, 4000);

      window.formReset();
    }, window.backend.errorHandler);

    evt.preventDefault();
  });

  formReset.addEventListener('click', () => {
    window.formReset();
  });
})();
