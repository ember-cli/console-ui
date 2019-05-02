'use strict';

const wrapConsoleMethod = require('../../lib/wrap-console-method');
const { expect } = require('chai');

describe('wrapConsoleMethod', function() {
  it('works', function() {
    let called = [];
    function foo(...args) {
      expect(this).to.eql(console);
      called.push(args)
    }
    const ui = { };
    const console = { foo };

    expect(console.foo).to.eql(foo);
    wrapConsoleMethod(ui, console, 'foo');

    expect(console.foo).to.not.eql(foo);
    console.foo(1,2,3,4);
    expect(called).to.eql([[1,2,3,4]])
    console.foo(2,3,4,5);
    expect(called).to.eql([
      [1,2,3,4],
      [2,3,4,5]
    ])
  })
});
