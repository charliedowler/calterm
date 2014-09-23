var test = require('tap').test;
var Calterm = require('../index');
var exec = require('child_process').exec;
var table = require('text-table');

var cal = new Calterm();
cal.setYear(2014);
cal.setMonth(8);

test('cal', function (runner) {
  runner.equal(Object.prototype.toString.call(cal.now()), '[object Date]', 'cal.now() returns Date object');
  runner.equal(cal.getDaysThisMonth(), 31, 'cal.getDaysThisMonth() returns 31');
  runner.equal(cal.daysOfWeek[0], 'Sunday', 'cal.getDaysOfWeek()[0] returns Monday');
  runner.equal(cal.getDaysOfWeekByMonth()[0], 'Friday', 'cal.getDaysOfWeek()[0] returns Friday');
  runner.equal(cal.getYear(), 2014, 'cal.getYear() returns 2014');
  runner.equal(cal.getMonth(), 'August', 'cal.getMonth() returns August');
  cal.setMonth(9);
  runner.equal(cal.getMonth(), 'September', 'cal.setMonth(9) sets month to September');
  exec('node ./cli', function (err, stdout, stderr) {
    stdout = stdout.replace('September 2014\n', '');
    stdout = stdout.trim();
    runner.equal(stdout, table([
      [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ],
      [ ' ', 1, 2, 3, 4, 5, 6 ],
      [ 7, 8, 9, 10, 11, 12, 13 ],
      [ 14, 15, 16, 17, 18, 19, 20 ],
      [ 21, 22, 23, 24, 25, 26, 27 ],
      [ 28, 29, 30 ]
    ], { hsep: ' ', align: ['r', 'r', 'r', 'r', 'r', 'r', 'r'] }))
    runner.end();
  });
});