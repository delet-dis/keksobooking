'use strict';
//функция получения и передачи данных
(function () {
  let SERVER_URL = 'https://javascript.pages.academy/keksobooking';

  let setup = function (onLoad, onError) {

    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      };

    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`)
    });

    xhr.timeout = 5000;

    return xhr;
  };

  window.backend = {
    save: function (data, onLoad, onError) {
      let xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      let xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    errorHandler: function (errorMessage) {
      let node = document.createElement('div');
      node.classList.add('error-message');
      node.textContent = '';

      for (let i = 0; i < errorMessage.length; i++) {
        node.innerText += errorMessage[i].fieldName + ' ' + errorMessage[i].errorMessage + ', ';
      };

      node.textContent = node.textContent.replace(/^( *, *)+|(, *(?=,|$))+/g, '');

      if (!errorMessage) {
        node.textContent = 'Произошла ошибка';
      };

      setTimeout(() => {
        document.querySelector('.error-message').remove()
      }, 4000);

      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})()