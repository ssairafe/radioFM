function configureRadio(radioConfiguration) {

  return {
    currentFrequency: radioConfiguration.frequencyConfiguration.defaultFrequency,
    maxFrequency: radioConfiguration.frequencyConfiguration.max,
    minFrequency: radioConfiguration.frequencyConfiguration.min,
    currentVolume: radioConfiguration.audioConfiguration.defaultVolume,
    maxVolume: radioConfiguration.audioConfiguration.max,
    minVolume: radioConfiguration.audioConfiguration.min,
    volumeStepSize: radioConfiguration.audioConfiguration.stepSize,
    savedStations: {},
    init: function ($el, $refs, $dispatch, $watch) {
      if($refs) {

        (function () {
          var R2D, active, angle, center, init, rotate, rotation, start, startAngle, stop;

          volumeDisplay = $refs.volumeDisplay;

          muteIcon = $refs.muteIcon;

          target = $refs.knobController;

          active = false;

          angle = 0;

          rotation = 0;

          startAngle = 0;

          center = {
            x: 0,
            y: 0
          };

          // document.ontouchmove = function (e) {
          //   return e.preventDefault();
          // };

          init = function () {
            target.addEventListener('mousedown', start, false);
            target.addEventListener('touchstart', start, { passive: true });

            return target.addEventListener('mouseup', stop, false) || target.addEventListener('touchend', stop, { passive: true });
          };

          R2D = 180 / Math.PI;

          start = function (e) {
            target.addEventListener('mousemove', rotate, false)
            target.addEventListener('touchmove', start, { passive: true });
            var height, left, top, width, x, y, _ref;
            //e.preventDefault();
            _ref = this.getBoundingClientRect(), top = _ref.top, left = _ref.left, height = _ref.height, width = _ref.width;
            center = {
              x: left + (width / 2),
              y: top + (height / 2)
            };
            x = e.clientX - center.x;
            y = e.clientY - center.y;
            startAngle = R2D * Math.atan2(y, x);
            return active = true;
          };

          rotate = function (e) {
            var d, x, y;
            e.preventDefault();
            x = e.clientX - center.x;
            y = e.clientY - center.y;
            d = R2D * Math.atan2(y, x);
            rotation = d - startAngle;

            if (active) {
              if ((rotation + angle) < 6 && (rotation + angle) > -6) {
                muteIcon.classList.remove('hidden')
                volumeDisplay.classList.add('hidden')
              } else {
                muteIcon.classList.add('hidden')
                volumeDisplay.classList.remove('hidden')
                if ((rotation + angle) > 6 && (rotation + angle) < 36) {
                  volumeDisplay.innerText = 1
                }
                if ((rotation + angle) > 36 && (rotation + angle) < 72) {
                  volumeDisplay.innerText = 2
                }
                if ((rotation + angle) > 72 && (rotation + angle) < 108) {
                  volumeDisplay.innerText = 3
                }
                if ((rotation + angle) > 108 && (rotation + angle) < 144) {
                  volumeDisplay.innerText = 4
                }
                if ((rotation + angle) > 144 && (rotation + angle) < 180) {
                  volumeDisplay.innerText = 5
                }
                if ((rotation + angle) > 180 && (rotation + angle) < 216) {
                  volumeDisplay.innerText = 6
                }
                if ((rotation + angle) > 216 && (rotation + angle) < 252) {
                  volumeDisplay.innerText = 7
                }
                if ((rotation + angle) > -90 && (rotation + angle) < -60) {
                  volumeDisplay.innerText = 8
                }
                if ((rotation + angle) > -60 && (rotation + angle) < -30) {
                  volumeDisplay.innerText = 9
                }
                if ((rotation + angle) > -30 && (rotation + angle) < -6) {
                  volumeDisplay.innerText = 10
                }
              }

              return this.style.webkitTransform = 'rotate(' + (angle + rotation) + 'deg)';
            }
          };

          stop = function () {
            target.removeEventListener('mousemove', rotate, false);
            target.removeEventListener('touchmove', rotate);
            angle += rotation;
            return active = false;
          };

          init();

        }).call(this);
      }

    }
  }
}
