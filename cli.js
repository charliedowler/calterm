var argv = require('minimist')(process.argv.slice(2));
var Cal = require('./');
var table = require('text-table');
var _ = require('underscore');
var cal = new Cal();

if (argv.m && typeof argv.m == 'number') {
  cal.setMonth(argv.m);
}

var days = cal.daysOfWeek.map(function(day) {
  return day.substring(0, 2);
});
var firstDay = cal.getFirstDayOfMonth().substring(0, 2);

var header = table([[' ', cal.getMonth() + ' ' + cal.getYear(), ' ']], { align: [ 'c' ] });
var c = function() {
  var startDay = 0;
  var arr = [];
  for (var day = 1; day <= cal.getDaysThisMonth(); day++) {
    arr.push(day);
  }
  _.filter(days, function(day, index) {
    if (day == firstDay) {
      startDay = index;
    }
  });
  for(var i =0;i<startDay;i++) {
    arr.unshift(' ');
  }
  var lists = _.groupBy(arr, function(element, index){
    return Math.floor(index/7);
  });
  return _.toArray(lists);
}();
var calendar = [days];
for (var i in c) {
  calendar.push(c[i]);
}
calendar = table(calendar, { align: [ 'c' ] });

console.log(header);
console.log(calendar)