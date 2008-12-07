require('core');

WatchNight.timerController = SC.Object.create({
  isRunning: NO,
  limitTime: 300 * 1000,
  elapsedTime: 0,

  remainingTime: function() {
    return [0, this.get('limitTime') - this.get('elapsedTime')].max();
  }.property('limitTime', 'elapsedTime'),

  progress: function() {
    return [1, this.get('elapsedTime') / this.get('limitTime')].min();
  }.property('limitTime', 'elapsedTime'),

  reset: function() {
    this.set('isRunning', NO);
    this.set('elapsedTime', 0);
  },

  showPreference: function() {
    SC.page.setPath('preference.isVisible', YES);
  },

  hidePreference: function() {
    SC.page.setPath('preference.isVisible', NO);
  },

  _timer: SC.Timer.schedule({
    target: 'WatchNight.timerController',
    action: '_tick',
    interval: 100,
    repeats: YES,
    isPaused: YES
  }),

  _tick: function() {
    if (this.get('remainingTime') == 0) {
      this.set('isRunning', NO);
    } else {
      this.set('elapsedTime', this.get('elapsedTime') + this.getPath('_timer.interval'));
    }
  },

  _isRunningObserver: function() {
    this.setPath('_timer.isPaused', !this.get('isRunning'));
  }.observes('isRunning')
});
