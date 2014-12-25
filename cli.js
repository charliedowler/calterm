#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));
var Calterm = require('./');
var table = require('text-table');
var _ = require('underscore');
var cal = new Calterm();
var fs = require('fs');
var colors = require('colors');

argv._.forEach(function (arg) {
  if (/^[0-9]{1,2}$/.test(arg)) {
    argv.m = arg;
  }
  else if (/[0-9]{4}/.test(arg)) {
    argv.y = arg;
  }
});

if (argv.m && typeof argv.m == 'number') {
  cal.setMonth(argv.m);
}
if (argv.y && typeof argv.y == 'number') {
  cal.setYear(argv.y);
}

var days = cal.daysOfWeek.map(function (day) {
  return day.substring(0, 2);
});

var header = table([
  [ ' ', cal.getMonth() + ' ' + cal.getYear(), ' ']
], { align: [ 'c', 'c', 'c'] });

var c = function () {
  var firstDay = cal.getFirstDayOfMonth().substring(0, 2);
  var startDay = 0;
  var arr = [];

  // Fill in the days
  for (var day = 1; day <= cal.getDaysThisMonth(); day++) {
    arr.push(day);
  }

  // Find the first day of the month
  days.forEach(function(day, i) {
    if (day == firstDay) {
      startDay = i;
    }
  });

  // Prepend blank spaces to calendar until the first day of the month
  for (var i = 0; i < startDay; i++) {
    arr.unshift(' ');
  }

  // Group days by week
  return _.chain(arr).groupBy(function (element, index) {
    return Math.floor(index / 7);
  }).toArray().value();
}();
var calendar = [days].concat(c);
calendar = table(calendar, { hsep: ' ', align: ['r', 'r', 'r', 'r', 'r', 'r', 'r'] });

console.log(header);
console.log(calendar);