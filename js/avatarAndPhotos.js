'use strict';

(() => {
  const adAvatarPicker = document.querySelector('#avatar');
  const preview = document.querySelector('.notice__preview img');

  const FILE_TYPES = ['gif', 'jpeg', 'png', 'jpg'];

  // слушатель изменения аватарки
  adAvatarPicker.addEventListener('change', () => {
    const file = adAvatarPicker.files[0];

    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  const adImgPicker = document.querySelector('#images');
  const adImgContainer = document.querySelector('.form__photo-container');

  adImgPicker.addEventListener('change', () => {
    const file = adImgPicker.files[0];

    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const node = document.createElement('img');
        node.classList.add('ad-form__photo');
        node.src = reader.result;
        adImgContainer.insertAdjacentElement('afterbegin', node);
      });

      reader.readAsDataURL(file);
    }
  });
})();
