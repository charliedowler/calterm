var test = require('tap').test;
var Cal = require('../index');

var cal = new Cal();
cal.setYear(2014);
cal.setMonth(7);

test('cal', function(runner) {
  runner.equal(Object.prototype.toString.call(cal.now()), '[object Date]', 'cal.now() returns Date object');
  runner.equal(cal.getDaysThisMonth(), 31, 'cal.getDaysThisMonth() returns 31');
  runner.equal(cal.getDaysOfWeek()[0], 'Friday', 'cal.getDaysOfWeek()[0] returns Friday');
  runner.equal(cal.getYear(), 2014, 'cal.getYear() returns 2014');
  runner.equal(cal.getMonth(), 'August', 'cal.getMonth() returns August');
  cal.setMonth(8);
  runner.equal(cal.getMonth(), 'September', 'cal.setMonth(8) sets month to September');

  runner.end();
});