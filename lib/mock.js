'use strict';

var UI      = require('./');
var through = require('through');

module.exports = MockUI;
function MockUI(options) {
  var processMock = options && options.process ?
    options.process :
    { title: process.title };

  UI.call(this, {
    process: processMock,
    inputStream: through(),
    outputStream: through(function(data) {
      if (options && options.outputStream) {
        options.outputStream.push(data);
      }
      this.output += data;
    }.bind(this)),
    errorStream: through(function(data) {
      this.errors += data;
    }.bind(this))
  });

  this.output = '';
  this.errors = '';
  this.errorLog = options && options.errorLog || [];
}

MockUI.prototype = Object.create(UI.prototype);
MockUI.prototype.constructor = MockUI;
MockUI.prototype.clear = function() {
  this.output = '';
  this.errors = '';
  this.errorLog = [];
};
