'use strict';

(() => {
  window.formReset = () => {
    // объявление формы и ее элементов
    const form = document.querySelector('.notice__form');
    const images = form.querySelectorAll('.ad-form__photo');
    const noticePreview = form.querySelector('.notice__preview img');

    // очистка изображений
    images.forEach((item) => {
      item.parentNode.removeChild(item);
    });

    // очистка аватарки
    noticePreview.src = 'img/muffin.png';

    // очистка формы
    form.reset();
  };
})();
