require('core');

WatchNight.BellCountView = SC.LabelView.extend({
  valueBinding: 'WatchNight.timerController.progress',

  formatter: function(val, view) {
    return Math.floor(108 * val);
  }
});
