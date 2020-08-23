'use strict';

( () => {
  //поиск формы
  const form = document.querySelector('.notice__form'),
    formReset = document.querySelector('.form__reset');

  //слушатель отправки формы
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form),  () => {

      let node = document.createElement('div');
      node.classList.add('success-message');
      node.textContent = 'Данные успешно отправлены';
      document.body.insertAdjacentElement('afterbegin', node);

      setTimeout(() => {
        document.querySelector('.success-message').remove()
      }, 4000);

      window.formReset();
    }, window.backend.errorHandler);

    evt.preventDefault();
  });

  formReset.addEventListener('click', () => {
    

    window.formReset();
  })
})()