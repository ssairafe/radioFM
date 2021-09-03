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

    savedStations: [
      {
        saved: undefined,
        lastSaved: undefined,
        key: 1
      },
      {
        saved: undefined,
        lastSaved: undefined,
        key: 2
      },
      {
        saved: undefined,
        lastSaved: undefined,
        key: 3
      },
      {
        saved: undefined,
        lastSaved: undefined,
        key: 4
      },
      {
        saved: undefined,
        lastSaved: undefined,
        key: 5
      },
      {
        saved: undefined,
        lastSaved: undefined,
        key: 6
      }
    ],

    R2D: 180 / Math.PI,

    rotationAngle: 0,

    degreesForVolumeSteps: degreesForVolumeStepsVar,

    degreesRangeForMute: degreesRangeForMuteVar,

    volumeDisplay: undefined,

    muteIcon: undefined,

    knob: undefined,

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
        this.knob = $refs.knobController
        this.volumeDisplay = $refs.volumeDisplay
        this.muteIcon = $refs.muteIcon
      }
    },
    start: function (e) {
        var height, left, top, width, x, y, _ref;
        _ref = this.knob.getBoundingClientRect(),
        top = _ref.top, left = _ref.left, height = _ref.height, width = _ref.width;
        this.center = {
          x: left + (width / 2),
          y: top + (height / 2)
        };
        x = (e.clientX || e.touches[0].clientX) - this.center.x;
        y = (e.clientY || e.touches[0].clientY) - this.center.y;
        this.startAngle = this.R2D * Math.atan2(y, x);
        return this.active = true;
    },
    rotate: function (e) {
      var d, x, y;
      x = (e.clientX || e.touches[0].clientX) - this.center.x;
      y = (e.clientY || e.touches[0].clientY) - this.center.y;
      d = this.R2D * Math.atan2(y, x);
      this.rotation = d - this.startAngle;
      this.rotationAngle = (this.rotation + this.angle > 0) ? (this.rotation + this.angle) : ((this.rotation + this.angle) + 360);
      if (this.rotationAngle > 360) {
        this.rotationAngle = 0;
      }

      if (this.active) {
        if (this.rotationAngle > this.degreesRangeForMute.negative || this.rotationAngle < this.degreesRangeForMute.positive) {
          this.muteIcon.classList.remove('hidden')
          this.volumeDisplay.classList.add('hidden')
        } else {
          this.muteIcon.classList.add('hidden')
          this.volumeDisplay.classList.remove('hidden')
          this.volumeDisplay.innerText = Math.ceil((this.rotationAngle - this.degreesRangeForMute.positive) / this.degreesForVolumeSteps)

        }

        this.volumeDisplay.style.webkitTransform = `translate(-50%, -50%) rotate(${0 - this.rotationAngle}deg)`;
        this.muteIcon.style.webkitTransform = `translate(-50%, -50%) rotate(${0 - this.rotationAngle}deg)`;

        return this.knob.style.webkitTransform = 'rotate(' + this.rotationAngle + 'deg)';
      }
    },
    stop: function () {
        this.knob.removeEventListener('mousemove', this.rotate, false);
        this.knob.removeEventListener('touchmove', this.rotate, false);
        this.angle += this.rotation;
        return this.active = false;
    },
    saveStation: function(i) {
      if (!this.savedStations[i].saved) {
        this.savedStations[i].lastSaved = this.currentFrequency;
      }
      this.savedStations[i].lastSaved = this.savedStations[i].saved;
      this.savedStations[i].saved = this.currentFrequency;
    },
    goToStation: function(i) {
      if (this.savedStations[i].saved) {
        this.currentFrequency = this.savedStations[i].saved;
      }
    },
    revertStation: function(i) {
      if(this.savedStations[i].lastSaved) {
        let currentStation = this.savedStations[i].saved;
        this.savedStations[i].saved = this.savedStations[i].lastSaved;
        this.savedStations[i].lastSaved = currentStation;
      }
    }
  }
}
