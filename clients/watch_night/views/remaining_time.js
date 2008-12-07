require('core');

WatchNight.RemainingTimeView = SC.LabelView.extend({
  valueBinding: 'WatchNight.timerController.remainingTime',

  formatter: function(val, view) {
    return new Date(Math.ceil(val / 1000) * 1000).format('mm:ss');
  }
});
