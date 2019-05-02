'use strict';

module.exports = function wrapConsoleMethod(ui, console, name) {
  const original = console[name];

  console[name] = function(...args) {
    if (ui.progress) { ui.spinner.stop(); }
    try {
      original.apply(console, args);
    } finally {
      if (ui.progress) { ui.spinner.start(); }
    }
  }
};
