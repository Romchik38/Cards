'use strict';

const callbacks = Object.create(null);

callbacks.url = function(elem) {
  const url = elem.url;
  if (url === this.url) {
    return elem;
  }
};

module.exports = callbacks;
