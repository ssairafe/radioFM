function configureRadio(radioConfiguration) {
  const degreesForVolumeStepsVar = 360 / (radioConfiguration.audioConfiguration.max + 1)
  const degreesRangeForMuteVar = { negative: 360 - degreesForVolumeStepsVar / 2, positive: degreesForVolumeStepsVar / 2 }

  return {
    currentFrequency: radioConfiguration.frequencyConfiguration.defaultFrequency,
    maxFrequency: radioConfiguration.frequencyConfiguration.max,
    minFrequency: radioConfiguration.frequencyConfiguration.min,
    currentVolume: radioConfiguration.audioConfiguration.defaultVolume,
    maxVolume: radioConfiguration.audioConfiguration.max,
    minVolume: radioConfiguration.audioConfiguration.min,
    volumeStepSize: radioConfiguration.audioConfiguration.stepSize,
    savedStations: {},
    R2D: 180 / Math.PI,

    rotationAngle: 0,

    degreesForVolumeSteps: degreesForVolumeStepsVar,

    degreesRangeForMute: degreesRangeForMuteVar,

    volumeDisplay: undefined,

    muteIcon: undefined,

    target: undefined,

    active: false,

    angle: 0,

    rotation: 0,

    startAngle: 0,

    center: {
      x: 0,
      y: 0
    },
    init: function ($el, $refs, $dispatch, $watch) {
      if($refs) {
        this.target = $refs.knobController
        this.volumeDisplay = $refs.volumeDisplay
        this.muteIcon = $refs.muteIcon


          // this.target.addEventListener('mousedown', this.start, false);
          // document.addEventListener('touchstart', (e) => {
          //   console.log(e.target)
          //   if (e.target === this.target) {
          //     console.log('touchstart')
          //     this.target.addEventListener('touchstart', this.start, false);
          //     return this.target.addEventListener('touchend', this.stop, false);
          //   }
          // });

          // return this.target.addEventListener('mouseup', this.stop, false);

        // (function () {
        //   var R2D, active, angle, center, init, rotate, rotation, start, startAngle, stop, rotationAngle;

        //   degreesForVolumeSteps = 360 / (this.maxVolume + 1);

        //   degreesRangeForMute = { negative: 360 - degreesForVolumeSteps / 2, positive: degreesForVolumeSteps / 2};

        //   volumeDisplay = $refs.volumeDisplay;

        //   muteIcon = $refs.muteIcon;

        //   target = $refs.knobController;

        //   active = false;

        //   angle = 0;

        //   rotation = 0;

        //   startAngle = 0;

        //   center = {
        //     x: 0,
        //     y: 0
        //   };

        //   // document.ontouchmove = function (e) {
        //   //   return e.preventDefault();
        //   // };

        //   init = function () {

        //     target.addEventListener('mousedown', start, false);
        //     document.addEventListener('touchstart', (e) => {
        //       console.log(e.target)
        //       if (e.target === target) {
        //         console.log('touchstart')
        //         target.addEventListener('touchstart', start, false);
        //         return target.addEventListener('touchend', stop, false);
        //       }
        //     });

        //     return target.addEventListener('mouseup', stop, false);
        //   };

        //   R2D = 180 / Math.PI;

        //   start = function (e) {
        //     if(e.type === "touchstart") {
        //       target.addEventListener('touchmove', rotate, false)
        //     }
        //     target.addEventListener('mousemove', rotate, false)

        //     var height, left, top, width, x, y, _ref;
        //     //e.preventDefault();
        //     _ref = this.getBoundingClientRect(), top = _ref.top, left = _ref.left, height = _ref.height, width = _ref.width;
        //     center = {
        //       x: left + (width / 2),
        //       y: top + (height / 2)
        //     };
        //     x = e.clientX - center.x;
        //     y = e.clientY - center.y;
        //     startAngle = R2D * Math.atan2(y, x);
        //     return active = true;
        //   };

        //   rotate = function (e) {
        //     var d, x, y;
        //     e.preventDefault();
        //     x = e.clientX - center.x;
        //     y = e.clientY - center.y;
        //     d = R2D * Math.atan2(y, x);
        //     rotation = d - startAngle;
        //     rotationAngle = (rotation + angle > 0) ? (rotation + angle) : ((rotation + angle) + 360);


        //     if (active) {

        //       if (rotationAngle > degreesRangeForMute.negative || rotationAngle < degreesRangeForMute.positive) {
        //         muteIcon.classList.remove('hidden')
        //         volumeDisplay.classList.add('hidden')
        //       } else {
        //         muteIcon.classList.add('hidden')
        //         volumeDisplay.classList.remove('hidden')

        //         volumeDisplay.innerText = Math.ceil((rotationAngle - degreesRangeForMute.positive) / degreesForVolumeSteps)

        //       }

        //       volumeDisplay.style.webkitTransform = `translate(-50%, -50%) rotate(${0 - rotationAngle}deg)`;
        //       muteIcon.style.webkitTransform = `translate(-50%, -50%) rotate(${0 - rotationAngle}deg)`;

        //       return this.style.webkitTransform = 'rotate(' + rotationAngle + 'deg)';
        //     }
        //   };

        //   stop = function () {
        //     target.removeEventListener('mousemove', rotate, false);
        //     target.removeEventListener('touchmove', rotate, false);
        //     angle += rotation;
        //     return active = false;
        //   };

        //   init();

        // }).call(this);
      }

    },
    start: function (e) {
      // console.log(e)
      // this.target = element
      // this.target.addEventListener('mousemove', this.rotate, false)

        var height, left, top, width, x, y, _ref;
        //e.preventDefault();
        _ref = this.target.getBoundingClientRect(), top = _ref.top, left = _ref.left, height = _ref.height, width = _ref.width;
        this.center = {
          x: left + (width / 2),
          y: top + (height / 2)
        };
        console.log('cx', this.center)
        x = e.clientX - this.center.x;
        y = e.clientY - this.center.y;
        this.startAngle = this.R2D * Math.atan2(y, x);
        return this.active = true;
    },
    rotate: function (e) {
      var d, x, y;
      //e.preventDefault();
      x = e.clientX - this.center.x;
      y = e.clientY - this.center.y;
      d = this.R2D * Math.atan2(y, x);
      this.rotation = d - this.startAngle;
      this.rotationAngle = (this.rotation + this.angle > 0) ? (this.rotation + this.angle) : ((this.rotation + this.angle) + 360);


      if (this.active) {

        if (this.rotationAngle > this.degreesRangeForMute.negative || this.rotationAngle < this.degreesRangeForMute.positive) {
          this.muteIcon.classList.remove('hidden')
          this.volumeDisplay.classList.add('hidden')
        } else {
          this.muteIcon.classList.add('hidden')
          this.volumeDisplay.classList.remove('hidden')
          console.log(this.degreesForVolumeSteps)
          this.volumeDisplay.innerText = Math.ceil((this.rotationAngle - this.degreesRangeForMute.positive) / this.degreesForVolumeSteps)

        }

        this.volumeDisplay.style.webkitTransform = `translate(-50%, -50%) rotate(${0 - this.rotationAngle}deg)`;
        this.muteIcon.style.webkitTransform = `translate(-50%, -50%) rotate(${0 - this.rotationAngle}deg)`;

        return this.target.style.webkitTransform = 'rotate(' + this.rotationAngle + 'deg)';
      }
    },
    stop: function () {

        this.target.removeEventListener('mousemove', this.rotate, false);
        this.target.removeEventListener('touchmove', this.rotate, false);
        this.angle += this.rotation;
        return this.active = false;
    }
  }
}
