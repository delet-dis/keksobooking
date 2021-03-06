'use strict';
(() => {
  // слушатель перетаскивания пина
  window.mapPinMain.addEventListener('mousedown', (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    // функция высчитывания координат
    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      const styleChange = {
        top: window.mapPinMain.offsetTop - shift.y,
        left: window.mapPinMain.offsetLeft - shift.x,
      };

      if (styleChange.left > 0 &&
        styleChange.left < 1200 &&
        styleChange.top > 110 &&
        styleChange.top < 660) {
        window.mapPinMain.style.top = styleChange.top + 'px';
        window.mapPinMain.style.left = styleChange.left + 'px';
      }
    };

    // функция отписки от обработчика события
    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
