'use strict';
// функция получения и передачи данных
(() => {
  const SERVER_URL = 'https://javascript.pages.academy/keksobooking';
  const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка соединения';

  const setup = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    xhr.addEventListener('error', () => {
      onError(DEFAULT_ERROR_MESSAGE);
    });

    xhr.addEventListener('timeout', () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = 5000;

    return xhr;
  };

  window.backend = {
    save: (data, onLoad, onError) => {
      const xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: (onLoad, onError) => {
      const xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    errorHandler: (errorMessage) => {
      const node = document.createElement('div');
      node.classList.add('error-message');

      if (errorMessage !== DEFAULT_ERROR_MESSAGE &&
        errorMessage[0].errorMessage.startsWith('Запрос') === false) {
        node.textContent = '';

        for (let i = 0; i < errorMessage.length; i++) {
          node.innerText += errorMessage[i].fieldName +
            ' ' +
            errorMessage[i].errorMessage + ', ';
        }

        node.textContent = node.textContent
            .replace(/^( *, *)+|(, *(?=,|$))+/g, '');
      } else {
        node.textContent = errorMessage;
      }

      setTimeout(() => {
        document.querySelector('.error-message').remove();
      }, 4000);

      document.body.insertAdjacentElement('afterbegin', node);
    },
  };
})();
