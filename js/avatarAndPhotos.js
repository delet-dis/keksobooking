'use strict';

(function () {
  const adAvatarPicker = document.querySelector('#avatar'),
    preview = document.querySelector('.notice__preview img');

  const FILE_TYPES = ['gif', 'jpeg', 'png', 'jpg'];

  //слушатель изменения аватарки
  adAvatarPicker.addEventListener('change', () => {
    let file = adAvatarPicker.files[0];

    let fileName = file.name.toLowerCase();

    let matches = FILE_TYPES.some((item) => {
      return fileName.endsWith(item);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  const adImgPicker = document.querySelector('#images'),
    adImgContainer = document.querySelector('.form__photo-container');

  adImgPicker.addEventListener('change', () => {
    let file = adImgPicker.files[0];

    let fileName = file.name.toLowerCase();

    let matches = FILE_TYPES.some((item) => {
      return fileName.endsWith(item);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener('load', () => {
        let node = document.createElement('img');
        node.classList.add('ad-form__photo');
        node.src = reader.result;
        adImgContainer.insertAdjacentElement('afterbegin', node);
      });

      reader.readAsDataURL(file);
    }
  })

})();