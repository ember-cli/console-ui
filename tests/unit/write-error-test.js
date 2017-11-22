'use strict';

var expect     = require('chai').expect;
var writeError = require('../../lib/write-error');
var MockUI     = require('../../lib/mock');
var BuildError = require('../helpers/build-error');
var EOL        = require('os').EOL;
var chalk      = require('chalk');

describe('writeError', function() {
  var ui;

  beforeEach(function() {
    ui = new MockUI();
  });

  it('no error', function() {
    writeError(ui);

    expect(ui.output).to.equal('');
    expect(ui.errors).to.equal('');
  });

  it('error with message', function() {
    writeError(ui, new BuildError({
      message: 'build error'
    }));

    expect(ui.output).to.equal('');
    expect(ui.errors).to.equal(chalk.red('build error') + EOL + EOL);
  });

  it('error with stack', function() {
    ui.setWriteLevel('DEBUG')
    writeError(ui, new BuildError({
      stack: 'the stack'
    }));

    expect(ui.output).to.equal(chalk.red('the stack') + EOL);
    ui.setWriteLevel('INFO');
  });

  it('error with file', function() {
    writeError(ui, new BuildError({
      file: 'the file'
    }));

    expect(ui.output).to.equal('');
    expect(ui.errors).to.equal(chalk.red('File: the file') + EOL + EOL + chalk.red('Error') + EOL + EOL);
  });

  it('error with filename (as from Uglify)', function() {
    writeError(ui, new BuildError({
      filename: 'the file'
    }));

    expect(ui.output).to.equal('');
    expect(ui.errors).to.equal(chalk.red('File: the file') + EOL + EOL + chalk.red('Error') + EOL + EOL);
  });

  it('error with file + line', function() {
    writeError(ui, new BuildError({
      file: 'the file',
      line: 'the line'
    }));

    expect(ui.output).to.equal('');
    expect(ui.errors).to.equal(chalk.red('File: the file:the line') + EOL + EOL + chalk.red('Error') + EOL + EOL);
  });

  it('error with file + col', function() {
    writeError(ui, new BuildError({
      file: 'the file',
      col: 'the col'
    }));

    expect(ui.output).to.equal('');
    expect(ui.errors).to.equal(chalk.red('File: the file') + EOL + EOL + chalk.red('Error') + EOL + EOL);
  });

  it('error with file + line + col', function() {
    writeError(ui, new BuildError({
      file: 'the file',
      line: 'the line',
      col:  'the col'
    }));

    expect(ui.output).to.equal('');
    expect(ui.errors).to.equal(chalk.red('File: the file:the line:the col') + EOL + EOL + chalk.red('Error') + EOL + EOL);
  });

  it('error title: file + line + column + errorType + nodeName', function() {
    writeError(ui, new BuildError({
      file: 'index.js',
      line: '10',
      col:  '15',
      broccoliPayload: {
        broccoliNode: {
          nodeName: 'Babel'
        },
        error: {
          errorType: 'Compile Error'
        }
      },
    }));

    expect(ui.output).to.equal('');
    expect(ui.errors).to.equal(chalk.red('Compile Error (Babel) in index.js:10:15') + EOL + EOL + chalk.red('Error') + EOL + EOL);
  });

  it('error title: errorType + nodeName', function() {
    writeError(ui, new BuildError({
      broccoliPayload: {
        broccoliNode: {
          nodeName: 'Babel'
        },
        error: {
          errorType: 'Compile Error'
        }
      },
    }));

    expect(ui.output).to.equal('');
    expect(ui.errors).to.equal(chalk.red('Compile Error (Babel)') + EOL + EOL + chalk.red('Error') + EOL + EOL);
  });

  it('error title: errorType', function() {
    writeError(ui, new BuildError({
      broccoliPayload: {
        error: {
          errorType: 'Compile Error'
        }
      },
    }));

    expect(ui.output).to.equal('');
    expect(ui.errors).to.equal(chalk.red('Compile Error') + EOL + EOL + chalk.red('Error') + EOL + EOL);
  });

  it('error codeFrame', function() {
    writeError(ui, new BuildError({
      broccoliPayload: {
        error: {
          errorType: 'Compile Error',
          codeFrame: 'codeFrame'
        }
      },
    }));

    expect(ui.output).to.equal('');
    expect(ui.errors).to.equal(
      chalk.red('Compile Error') + EOL + EOL +
      chalk.red('codeFrame') + EOL + EOL);
  });

  it('error codeFrame with same error message', function() {
    writeError(ui, new BuildError({
      broccoliPayload: {
        error: {
          errorType: 'Compile Error',
          codeFrame: 'codeFrame',
          message: 'codeFrame'
        }
      },
    }));

    expect(ui.output).to.equal('');
    expect(ui.errors).to.equal(
      chalk.red('Compile Error') + EOL + EOL +
      chalk.red('codeFrame') + EOL + EOL);
  });

  it('error codeFrame with different error message', function() {
    writeError(ui, new BuildError({
      broccoliPayload: {
        error: {
          errorType: 'Compile Error',
          codeFrame: 'codeFrame',
          message: 'broccoli error message'
        }
      },
    }));

    expect(ui.output).to.equal('');
    expect(ui.errors).to.equal(
      chalk.red('Compile Error') + EOL + EOL +
      chalk.red('broccoli error message') + EOL + EOL +
      chalk.red('codeFrame') + EOL + EOL);
  });
});
