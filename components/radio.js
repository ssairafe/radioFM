function configureRadio(frequencyConfiguration, audioConfiguration) {
  return {
    currentFrequency: frequencyConfiguration.defaultFrequency,
    maxFrequency: frequencyConfiguration.max,
    minFrequency: frequencyConfiguration.min,
    currentVolume: audioConfiguration.defaultVolume,
    maxVolume: audioConfiguration.max,
    minVolume: audioConfiguration.min,
    volumeStepSize: audioConfiguration.stepSize,
    incrementVolume: function() {
      if ((this.currentVolume + this.volumeStepSize) <= this.maxVolume) {
        this.currentVolume += this.volumeStepSize
      }
    },
    decrementVolume: function() {
      if ((this.currentVolume - this.volumeStepSize) >= this.minVolume) {
        this.currentVolume -= this.volumeStepSize
      }
    },
    savedStations: {}
  }
}
