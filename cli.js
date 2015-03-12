#!/usr/bin/env node
require('colors');
var fs = require('fs');
var Calterm = require('./');
var _ = require('underscore');
var moment = require('moment');
var table = require('text-table');
var argv = require('minimist')(process.argv.slice(2));

var cal = new Calterm();

argv._.forEach(function (arg) {
  if (arg === 'next') {
    argv.m = cal.setMonth((+cal.moment.format('M')) + 1);
  }
  else if (arg == 'prev') {
    argv.m = cal.setMonth((+cal.moment.format('M')) - 1);
  }
  else if (/^[0-9]{1,2}$/.test(arg)) {
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
var header = header || cal.getMonth() + ' ' + cal.getYear();
for (var i = 0; i < (Math.floor((20 - header.length) / 2));i++) {
  blank.push(' ');
}
header = table([
  blank.concat([header])
], {hsep: '' });

try {
  var firstDay = cal.getFirstDayOfMonth().substring(0, 2);
}
catch (e) {
  console.error('Oops, that date is out of our range. Try again.'.red);
  process.exit(1);
}

var grid = [];
var startDay = 0;
var present = new Calterm();
var today = present.moment.format('D');
var title = present.getMonth() + ' ' + present.getYear();

// Fill in the days
for (var day = 1; day <= cal.getDaysThisMonth(); day++) {
  var item = day < 10 ? ' ' + day : day + '';
  if (new RegExp(title).test(header) && day == today) {
    grid.push(item.inverse);
  }
  else {
    grid.push(item);
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
  grid.unshift(' ');
}

// Group days by week
var weeks = _.chain(grid).groupBy(function (element, index) {
  return Math.floor(index / 7);
}).toArray().value();

var calendar = [days].concat(weeks);

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
