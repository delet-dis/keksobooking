'use strict';

(function () {
  const filePicker = document.querySelector('.upload input[type=file]'),
    preview = document.querySelector('.notice__preview img');

  const FILE_TYPES = ['gif', 'jpeg', 'png', 'jpg'];

  //слушатель изменения аватарки
  filePicker.addEventListener('change', () => {
    let file = filePicker.files[0];

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
})();