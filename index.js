var moment = require('moment');
var table = require('text-table');

var Cal = function() {
  this.moment = moment();
  return this;
};

Cal.prototype.now = function() {
  return this.moment.toDate();
};

Cal.prototype.setMonth = function(month) {
  this.moment.set('month', month - 1);
};
Cal.prototype.setYear = function(year) {
  this.moment.set('year', year);
};

Cal.prototype.getYear = function() {
  return this.moment.year();
};
Cal.prototype.getMonth = function() {
  return this.moment.format('MMMM');
};

Cal.prototype.daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

Cal.prototype.getDaysOfWeekByMonth = function() {
  var days = [];

  for (var i = 0; i < this.getDaysThisMonth(); i++) {
    days.push(this.moment.startOf('month').add(i, 'days').format('dddd'));
  }
  return days;
};
Cal.prototype.getFirstDayOfMonth = function() {
  return this.getDaysOfWeekByMonth()[0];
};

Cal.prototype.getDaysThisMonth = function() {
  return this.moment.daysInMonth();
};

module.exports = Cal;