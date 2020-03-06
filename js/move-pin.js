'use strict';

(function () {
  var PIN_MAIN_HALF_WIDTH = 30;
  window.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      window.showAdress();
      window.mapPinMain.style.top = (window.mapPinMain.offsetTop - shift.y) + 'px';
      window.mapPinMain.style.left = (window.mapPinMain.offsetLeft - shift.x) + 'px';
      if (window.mapPinMain.offsetTop < window.MIN_LOCATION_Y && shift.y > 0) {
        window.mapPinMain.style.top = window.MIN_LOCATION_Y + 'px';
        document.removeEventListener('mousemove', onMouseMove);
      }
      if (window.mapPinMain.offsetTop > window.MAX_LOCATION_Y && shift.y < 0) {
        window.mapPinMain.style.top = window.MAX_LOCATION_Y + 'px';
        document.removeEventListener('mousemove', onMouseMove);
      }
      if ((window.mapPinMain.offsetLeft + PIN_MAIN_HALF_WIDTH) < 0 && shift.x > 0) {
        window.mapPinMain.style.left = -PIN_MAIN_HALF_WIDTH + 'px';
        document.removeEventListener('mousemove', onMouseMove);
      }
      if ((window.mapPinMain.offsetLeft + PIN_MAIN_HALF_WIDTH) > window.MAX_LOCATION_X && shift.x < 0) {
        window.mapPinMain.style.left = (window.MAX_LOCATION_X - PIN_MAIN_HALF_WIDTH) + 'px';
        document.removeEventListener('mousemove', onMouseMove);
      }
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
