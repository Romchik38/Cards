'use strict';

const callbacks = Object.create(null);

callbacks.cardsAll = function(elem) {
  return elem;
};

callbacks.cardsByNumber = function(elem) {
  const number = elem.number;
  if (number === this.number) {
    return elem;
  }
};

callbacks.insert = function() {
  return this;
};

callbacks.update = function(elem) {
  const number = elem.number;
  if (number === this.number) {
    const name = this.name;
    return { number, name };
  }
};

callbacks.url = function(elem) {
  const url = elem.url;
  if (url === this.url) {
    return elem;
  }
};

module.exports = callbacks;
