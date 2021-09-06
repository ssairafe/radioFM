function configureRadio(radioConfiguration) {
  const degreesForVolumeStepsVar = 360 / (radioConfiguration.audioConfiguration.max + 1);
  const degreesRangeForMuteVar = { negative: 360 - degreesForVolumeStepsVar / 2, positive: degreesForVolumeStepsVar / 2 };

  return {
    currentFrequency: radioConfiguration.frequencyConfiguration.defaultFrequency,

    currentVolume: radioConfiguration.audioConfiguration.defaultVolume,

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

    targetKnob: undefined,

    knob: undefined,

    mobileKnob: undefined,

    active: false,

    angle: 0,

    rotation: 0,

    startAngle: 0,

    center: {
      x: 0,
      y: 0
    },

    draggingItem: undefined,

    draggingItemContainer: undefined,

    dropContainer: undefined,

    dropContainerElement: undefined,

    handleSliderMouseDown: function(e) {
      let dragParent = e.target.closest('[draggable=true]');
      dragParent.setAttribute('draggable', false)
    },

    handleSliderMouseUp: function (e) {
      let dragParent = e.target.closest('[draggable=false]');
      dragParent.setAttribute('draggable', true)
    },

    dragStart: function(e) {
      this.draggingItem = e.target;
      this.draggingItemContainer = e.target.parentNode;
    },

    dragOver: function(e) {
      this.dropContainer = e.currentTarget;
      this.dropContainerElement = e.currentTarget.querySelector('div');
      e.preventDefault()
    },

    drop: function(e) {
      this.draggingItemContainer.innerHTML = ''
      this.dropContainer.innerHTML = ''
      this.draggingItemContainer.appendChild(this.dropContainerElement)
      this.dropContainer.appendChild(this.draggingItem)
    },

    init: function ($el, $refs, $dispatch, $watch) {
      if($refs) {
        this.knob = $refs.knobController;
        this.mobileKnob = $refs.knobControllerMobile;
        this.volumeDisplay = $refs.volumeDisplay;
        this.muteIcon = $refs.muteIcon;
      }
    },
    start: function (e) {
      this.targetKnob = e.currentTarget.classList.contains('knob-mobile') ? this.mobileKnob : this.knob;
      var height, left, top, width, x, y, _ref;
    _ref = this.targetKnob.getBoundingClientRect(),
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
          this.currentVolume = 0;
        } else {
          this.currentVolume = Math.ceil((this.rotationAngle - this.degreesRangeForMute.positive) / this.degreesForVolumeSteps);
        }

        this.volumeDisplay.style.webkitTransform = `translate(-50%, -50%) rotate(${0 - this.rotationAngle}deg)`;
        this.muteIcon.style.webkitTransform = `translate(-50%, -50%) rotate(${0 - this.rotationAngle}deg)`;

        return this.targetKnob.style.webkitTransform = 'rotate(' + this.rotationAngle + 'deg)';
      }
    },
    stop: function () {
      this.targetKnob.removeEventListener('mousemove', this.rotate, false);
      this.targetKnob.removeEventListener('touchmove', this.rotate, false);
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
