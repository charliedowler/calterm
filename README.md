## Calterm [![Build Status][travis-image]][travis-url]

> Print a calender in your terminal

## Getting Started
```shell
$ npm install -g calterm
```
### Demo
![demo](demo.gif)
### Usage

```js
$ calterm 9 2014
   September 2014
Su Mo Tu We Th Fr Sa
    1  2  3  4  5  6
 7  8  9 10 11 12 13
14 15 16 17 18 19 20
21 22 23 24 25 26 27
28 29 30

```

### Options

You can pass the month as year as as arguments or use flags to define them.

#### options.m
Type: `Number`

Set the month

#### options.y
Type: `Number`

#### options.next
Type: `String`

#### options.prev
Type: `String`

Set the year

## Release History
- 2015-01-09 v0.2.1 Fixed off center header
- 2014-11-17 v0.2.0 Smarter arguments
- 2014-09-23 v0.1.0 Initial release

[travis-url]: http://travis-ci.org/charliedowler/calterm
[travis-image]: https://secure.travis-ci.org/charliedowler/calterm.png?branch=master
