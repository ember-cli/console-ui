'use strict';

var expect = require('chai').expect;
var MockUI = require('../../lib/mock');

describe('UI title', function() {
  var ui, processMock;

  beforeEach(function() {
    processMock = {
      title: "initial title"
    };

    ui = new MockUI({
      process: processMock
    });
  });

  it('sets process title', function() {
    ui.title = "test title";
    expect(processMock.title).to.equal('test title');
  });

  it('gets process title', function() {
    expect(ui.title).to.equal('initial title');

    ui.title = "test title";
    expect(ui.title).to.equal('test title');
  });
});

