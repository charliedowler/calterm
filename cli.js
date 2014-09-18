var Cal = require('./');
var table = require('text-table');
var cal = new Cal();

var days = cal.daysOfWeek.map(function(day) {
  return day.substring(0, 2);
}).join(' ');

var title = table([[' ', cal.getMonth() + ' ' + cal.getYear(), ' ']], { align: [ 'c' ] });
console.log(title);
console.log(days);