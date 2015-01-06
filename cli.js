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
var blank = [];
var header = cal.getMonth() + ' ' + cal.getYear();
for (var i = 0; i < (Math.floor((20 - header.length) / 2));i++) {
  blank.push(' ');
}
header = table([
  blank.concat([header])
], {hsep: '' });

var c = function () {
  try {
    var firstDay = cal.getFirstDayOfMonth().substring(0, 2);
  }
  catch (e) {
    console.error('Oops, that date is out of our range. Try again.'.red);
    process.exit(1)
  }
  var startDay = 0;
  var arr = [];

  var tmp = new Calterm();
  var title = tmp.getMonth() + ' ' + tmp.getYear();
  var today = tmp.moment.format('D');

  // Fill in the days
  for (var day = 1; day <= cal.getDaysThisMonth(); day++) {
    var item = day < 10 ? ' ' + day : day + '';
    if (RegExp(title).test(header) && day == today) {
      arr.push(item.inverse);
    }
    else {
      /**
       * Here we can scan a list of dates and highlight them in the calender
       * arr.push(item.green)
       */
      arr.push(item);
    }
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

calendar = table(calendar, { hsep: ' ', align: ['r', 'r', 'r', 'r', 'r', 'r', 'r'], stringLength: function(str) {
  var res = str.length;
  /**
   * Colors adds encoding to the string which screws up the table,
   * here we are checking if the day has encoding
   */
  if (res == 11 || res == 12) {
    res = 2;
  }
  return res;
}});
console.log(header.cyan);
console.log(calendar);