var Cal = require('./');
var table = require('text-table');
var _ = require('underscore');
var cal = new Cal();

cal.setMonth(9);

var days = cal.daysOfWeek.map(function(day) {
  return day.substring(0, 2);
});
var firstDay = cal.getFirstDayOfMonth().substring(0, 2);

var title = table([[' ', cal.getMonth() + ' ' + cal.getYear(), ' ']], { align: [ 'c' ] });
var s = function() {
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
var newArr = [days];
for (var i in s) {
  newArr.push(s[i]);
}
var d = table(newArr, { align: [ 'c' ] });

console.log(title);
console.log(d);